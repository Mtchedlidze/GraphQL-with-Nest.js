import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { join } from 'path/posix'
import { UserModule } from './core/user/user.module'
import { MongooseModule } from '@nestjs/mongoose'
import { VoteModule } from './core/vote/vote.module'
import config from './config/config'
import { AwsSdkModule } from 'nest-aws-sdk'
import { SQS } from 'aws-sdk'

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
    }),

    AwsSdkModule.forRoot({
      defaultServiceOptions: config().aws,
      services: [SQS],
    }),
    MongooseModule.forRoot(config().database.uri),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      context: ({ req, res }) => ({ req, res }),
    }),
    VoteModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
