const { gql, withFilter, PubSub } = require('apollo-server');
const { createPost, likePostController } = require('../../controllers/post/postController');
const { NEW_LIKE } = require('../../utils/constant/postConstant')


const typeDefs = gql`
  extend type Mutation {
    createPost(postData: postData!): PostResponse!
    likePost(postID: String!): Post!
  }
  extend type Subscription {
    likePost(owner: String!): Like!
    #likePost(postID: String!): Post!
  }
  

  #Data Type
  type Post{
    user: String!
    content: String!
    like: Int!
    time: String!
  }
  type PostResponse{
    isSuccess: Boolean!
    message: String
  }
  type Like {
    userLike: String!
    postID: String!
    owner: String!
  }
  #Input Data
  input postData{
      postContent: String!
  }
`;

const pubsub = new PubSub()
const resolvers = {
    Mutation: {
      createPost: async (obj, {postData}, {req} ) => {
        let result = await createPost(postData, req)
        return result
      },
      likePost: async (obj, {postID}, {req}) => {
        let result = await likePostController(postID, req)
        const payload = {
          likePost: {
            userLike: req.session.user.userName,
            postID: postID,
            owner: result.user
          }
        }
        pubsub.publish(NEW_LIKE, payload);
        return result
      }
    },
    Subscription: {
      likePost: {
        subscribe: withFilter(
          () => pubsub.asyncIterator(NEW_LIKE),
          (payload, variables) => {
            // return payload.likePost.postID === variables.postID
            return payload.likePost.owner === variables.owner
          }
        ) 
      } 
    }
};
module.exports = { 
  postSchema: typeDefs, 
  postResolvers: resolvers 
}