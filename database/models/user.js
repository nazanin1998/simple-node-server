import mongoose from "mongoose";
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  firstName: { type: String, required: {values: true, message:'firstName Is Required !'}, maxlength: 100 },
  lastName: { type: String, required: true, maxlength: 100 },
  username: { type: String, required: true, unique: [true, 'username Is unique !'], maxlength: 100 },
  password: { type: String, required: true },
  profileImage: { type: Array },
  gender: {
    type: String, enum: ['MALE', 'FEMALE'],
  },
  tweets: [{ type: Schema.Types.ObjectId, ref: 'Tweet' }],
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  registerationDate: { type: Date, default: Date.now },
  birthDate: Date,
}).on('error', function (error) {
  console.log('User error:', error);
});
var User = mongoose.model('User', UserSchema);

export default User;