import { Schema } from 'mongoose'

const VoteSchema = new Schema({
  from: String,
  to: String,
  vote: Number,
})

export default VoteSchema
