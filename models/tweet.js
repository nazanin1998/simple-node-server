import mongoose from "mongoose";
var Schema = mongoose.Schema;

var TweetSchema = new Schema({
  content: { type: String, required: true , maxlength : 100},
  // attachments: { type: Array },
  links: {type: Array},
  comments:  [{type: Schema.Types.ObjectId, ref: 'Comment'}],
  createdAt: {type: Date, default: Date.now},
  updatedAt: {type: Date, default: Date.now},
});

var Tweet = mongoose.model('Tweet', TweetSchema);

export default Tweet;