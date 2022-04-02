import mongoose from 'mongoose';
import PostMessage from '../models/postMessage.js';

export const getPost = async (req, res) => {

    try {
        const postMessage = await PostMessage.find();
        res.status(200).json(postMessage);
    } catch (error) {
        res.status(404).json(error);
    }
}


export const createPost = async (req, res) => {

    const post = req.body;
    const newPost = new PostMessage(post);

    try {
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json(error);
    }
}


export const updatePost = async (req, res) => {

    const { id: _id } = req.params;
    const post = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with this id');

    try {
        const updatePost = await PostMessage.findByIdAndUpdate(_id, { ...post, _id }, { new: true });
        res.json(updatePost);
    } catch (error) {
        res.json(error);
    }
}


export const deletePost = async (req, res) => {

    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with this id');

    try {
        await PostMessage.findByIdAndRemove(id);
        res.json({ message: 'Post Deleted Successfully' });
    } catch (error) {
        res.json(error);
    }
}


export const likePost = async (req, res) => {

    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with this id');

    try {
        const post = await PostMessage.findById(id);
        const updatePost = await PostMessage.findByIdAndUpdate(id, { likeCount: post.likeCount + 1 }, { new: true });
        res.json(updatePost);
    } catch (error) {
        res.json(error);
    }
}