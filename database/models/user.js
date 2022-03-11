import mongoose from "mongoose";
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  firstName: {
    type: String,
    required: { values: true, message: 'firstName Is Required !' },
    maxlength: 100
  },
  lastName: {
    type: String,
    required: {
      values: true,
      message: 'lastname Is Required !'
    },
    maxlength: 100
  },
  username: {
    type: String,
    required: { values: true, message: 'username Is Required !' },
    unique: true,
    maxlength: 100
  },
  password: {
    type: String,
    required: { values: true, message: 'password Is Required !' }
  },
  profileImage: { type: Array },
  gender: {
    type: String,
    enum: { values: ['MALE', 'FEMALE'], message: "gender could be 'MALE' or 'FEMALE'" },
  },
  tweets: [{ type: Schema.Types.ObjectId, ref: 'Tweet' }],
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  registerationDate: { type: Date, default: Date.now },
  birthDate: Date,
});
var User = mongoose.model('User', UserSchema);

export default User;