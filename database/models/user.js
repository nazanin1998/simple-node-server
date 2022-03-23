import mongoose from "mongoose";
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  firstName: {
    type: String,
    required: { values: true, message: 'firstName Is Required !' },
    maxlength: [80, 'firstName should be 80 charachter at most'],
    minlength: [1, 'firstName should be 1 charachter at least'],
  },
  lastName: {
    type: String,
    required: { values: true, message: 'lastname Is Required !' },
    maxlength: [80, 'lastName should be 80 charachter at most'],
    minlength: [1, 'lastName should be 1 charachter at least'],
  },
  username: {
    type: String,
    required: { values: true, message: 'username Is Required !' },
    unique: true,
    maxlength: [40, 'username should be 40 charachter at most'],
    minlength: [8, 'username should be 8 charachter at least'],
  },
  password: {
    type: String,
    required: { values: true, message: 'password Is Required !' },
    maxlength: [40, 'password should be 40 charachter at most'],
    minlength: [8, 'password should be 8 charachter at least'],
  },
  profileImage: { type: Array },
  gender: {
    type: String,
    enum: { values: ['MALE', 'FEMALE'], message: "gender could be 'MALE' or 'FEMALE'" },
  },
  tweets: [{ type: Schema.Types.ObjectId, ref: 'Tweet' }],
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});
var User = mongoose.model('User', UserSchema);

User.Helpers = {
  isAdminAccessLevel: (adminAccess) => {
    return (adminAccess == ADMIN_ACCESS_ADMIN);
  },
  deleteFieldsOnInsert: (user) => {
    delete (user._id);
    delete (user.createdAt);
    delete (user.updatedAt);
    delete (user.comments);
    delete (user.tweets);
     return user;
  },
  deleteFieldsOnEdit: (user) => {
    user = User.Helpers.deleteFieldsOnInsert(user)
    delete (user.password);
    return user;
  },
}

export default User;