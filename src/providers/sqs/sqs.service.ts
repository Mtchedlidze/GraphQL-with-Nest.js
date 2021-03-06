import { OnModuleInit } from '@nestjs/common'
import { SQS } from 'aws-sdk'
import { InjectAwsService } from 'nest-aws-sdk'
import { UserService } from 'src/core/user/user.service'

export class SqsService implements OnModuleInit {
  constructor(
    @InjectAwsService(SQS) private readonly sqs: SQS,
    private readonly userService: UserService,
  ) {}

  async messageHandler(): Promise<void> {
    const response = await this.sqs
      .receiveMessage({
        MaxNumberOfMessages: 10,
        VisibilityTimeout: 10,
        WaitTimeSeconds: 5,
        QueueUrl: process.env.SQS_URL,
      })
      .promise()
    if (response.Messages) {
      response.Messages.map(async (message) => {
        const body = JSON.parse(message.Body)
        const { key } = body.Records[0].s3.object

        const avatar = process.env.BUCKET_URL + key

        await this.userService.addAvatar(key, avatar)
        await this.sqs
          .deleteMessage({
            QueueUrl: process.env.SQS_URL,
            ReceiptHandle: message.ReceiptHandle,
          })
          .promise()
      })
    }
  }
  onModuleInit() {
    setInterval(() => {
      this.messageHandler()
    }, 5000)
  }
}
