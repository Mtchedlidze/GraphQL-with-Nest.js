import { IvoteResponse } from '../models/IvoteResponse'

export class VoteException {
  response: IvoteResponse
  constructor(response: IvoteResponse) {
    this.response = response
  }
  public generate(): IvoteResponse {
    return this.response
  }
}
