import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    id: { type: String },
    name: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, require: true }
});

const UserModel = mongoose.model('UserInfo', userSchema);

export default UserModel;

// 'UserInfo' <== this name save as collection inside MongoDB

// UserModel <== base on this model Object, create lots of instance of users..