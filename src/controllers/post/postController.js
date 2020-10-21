const { PostModel } = require('../../models/post/postModel');
const { defaultResponse } = require('../../utils/utils');
const { ERROR } = require('../../utils/constant/errorConstant');
const { mongo } = require('mongoose')

const createPost = async (postData, req) => {
    let { postContent } = postData;
    let { userName } = req.session.user;
    let newPostData = new PostModel({
        user: userName,
        content: postContent,
    })
    let result = await newPostData.save();
    if (result) return defaultResponse( true )
    throw new Error(ERROR);
}

const likePostController = async (postID, req) => {
    const _postID = mongo.ObjectId(postID)
    
    let result = await PostModel.findOneAndUpdate(
        { _id: _postID }, 
        { 
            $inc: { like: 1 } , 
            $push: {listOfLike : req.session.user.userName},
        }
    );
    if(result) return result
    throw new Error(ERROR);    
}
module.exports = { createPost, likePostController }