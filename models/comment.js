import mongoose from "mongoose";
var Schema = mongoose.Schema;

var CommentSchema = new Schema({
  content: { type: String, required: true , maxlength : 100},
  tweetId: {type: Schema.Types.ObjectId, ref: 'Tweet'},
  replies:  [{type: Schema.Types.ObjectId, ref: 'Comment'}],
  links: {type: Array},
  createdAt: {type: Date, default: Date.now},
  updatedAt: {type: Date, default: Date.now},
});

var Comment = mongoose.model('Comment', CommentSchema);

export default Comment;