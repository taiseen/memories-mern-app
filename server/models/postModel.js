import mongoose from 'mongoose';

// 1) MongoDB --> document must have follow this document architecture/schema
const postSchema = mongoose.Schema({
    title: String,
    message: String,
    creator: String,
    name: String,
    tags: [String],
    imgUrl: String,
    imgDeleteUrl: String,
    comments: {
        type: [String],
        default: [],
    },
    likes: {
        type: [String],
        default: [],
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
});

// 2) convert schema into MongoDB model...
const PostModel = mongoose.model('PostMessage', postSchema);

// PostModel ==> is now a mongoose model...
// controller use this model object, for calling method's related to MongoDB crud operation
// 'PostMessage' <== this name save as collection inside MongoDB Cloud

export default PostModel;

