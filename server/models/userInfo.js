import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    id: { type: String },
    name: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, require: true }
});

const UserInfo = mongoose.model('UserInfo', userSchema);

export default UserInfo;