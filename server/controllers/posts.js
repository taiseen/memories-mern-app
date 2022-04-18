import PostModel from '../models/postModel.js';
import mongoose from 'mongoose';


// get only single post by (id) when user click on specific post...
export const getPost = async (req, res) => {

    const { id } = req.params;

    try {
        const post = await PostModel.findById(id);
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json(error);
    }
}


export const getPosts = async (req, res) => {

    const { pageNumber } = req.query;

    try {
        const LIMIT = 4;
        //get the starting index of every page...
        const startIndex = (Number(pageNumber) - 1) * LIMIT;
        const total = await PostModel.countDocuments({});

        const posts = await PostModel.find()
            .sort({ _id: -1 })
            .limit(LIMIT)
            .skip(startIndex);

        res.status(200).json(
            {
                data: posts,
                currentPage: Number(pageNumber),
                numberOfPages: Math.ceil(total / LIMIT)
            }
        );

    } catch (error) {
        res.status(404).json(error);
    }
}


// params vs query 
// params ==>  /:id   ==> (id) is a [variable + Placeholder] for value || use at get some specific resource 
// query  ==> ?page=1 ==> (page) is a [variable] & [value] is (1)  || use at Search case 
// ###### its also called when user click a specific post...
// ###### because by (tags) show user ==> also you like these post...
export const getPostsBySearch = async (req, res) => {

    const { searchQuery, tags } = req.query;

    try {
        const title = new RegExp(searchQuery, 'i');
        const searchingPost = await PostModel.find(
            {
                $or: [
                    { title },
                    {
                        tags:
                            { $in: tags.split(',') }
                    }
                ]
            }
        );
        res.status(200).json(searchingPost);
    } catch (error) {
        res.status(404).json(error);
    }
}



export const createPost = async (req, res) => {

    // How we get users input data from FrontEnd, at this file inside this function ?
    // ans ==> when ever you have a [post] request... form FrontEnd...
    // you get all the user input data through ==> req.body

    const post = req.body;

    // creator: req.userId <=== set the creator of this post 
    // req.userId <=== come from FrontEnd (header) file & process by BackEnd [auth middleware]
    const newPost = new PostModel({ ...post, creator: req.userId, createdAt: new Date().toISOString() });

    try {
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json(error);
    }
}



export const updatePost = async (req, res) => {

    const { id } = req.params;
    const post = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with this id');

    try {
        const updatePost = await PostModel.findByIdAndUpdate(id, post, { new: true });
        res.json(updatePost);
    } catch (error) {
        res.json(error);
    }
}



export const deletePost = async (req, res) => {

    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with this id');

    try {
        await PostModel.findByIdAndRemove(id);
        res.json({ message: 'Post Deleted Successfully' });
    } catch (error) {
        res.json(error);
    }
}



/**
export const likePost = async (req, res) => {

    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with this id');

    try {
        const post = await PostModel.findById(id);
        const updatePost = await PostModel.findByIdAndUpdate(
            id, { likeCount: post.likeCount + 1 }, { new: true }
        );
        res.json(updatePost);
    } catch (error) {
        res.json(error);
    }
}
 */



export const likePost = async (req, res) => {
    const { id } = req.params;

    // (req.userId) <=== this is come from [auth middleware] 
    // (req.userId) <=== we create this custom property at [auth middleware] for
    // save / store / tracking user id, that come from FrontEnd... 

    // if user-id/token not found...
    if (!req.userId) return res.json({ message: "Unauthenticated" });

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    // 🟩 find post by id, which post user want to like...
    const post = await PostModel.findById(id);

    // 🟩 find by index position of user id... that user id already in Like array or Not...
    const index = post.likes.findIndex(id => id === String(req.userId));

    // 🟩 if user index is -1, thats mean user is not present in likes array
    if (index === -1) {
        // add user id at likes array ==> by the help of auth middleware (req.userId)
        post.likes.push(req.userId);
    } else {
        // remove user id form likes array & keep all other users in like array...
        post.likes = post.likes.filter(id => id !== String(req.userId));
    }

    // 🟩 update the post again for likes section...
    const updatedPost = await PostModel.findByIdAndUpdate(id, post, { new: true });

    // 🟩 send back the updated post to client
    res.status(200).json(updatedPost);
}



export const commentPost = async (req, res) => {

    const { id } = req.params;
    const { userComment } = req.body;

    try {

        // 🟩 1st ==> find-out the post, where user are going to comment...
        const post = await PostModel.findById(id);

        // 🟩 2nd ==> after finding that existing post, push this user comment inside that post document
        post.comments.push(userComment);

        // 🟩 3rd ==> after pushing the comment into targeted post, again update that post...
        const updatedPost = await PostModel.findByIdAndUpdate(id, post, { new: true });

        // send this data to frontEnd...
        res.status(200).json(updatedPost);

    } catch (error) {
        res.status(409).json(error);
    }
}