const { gql } = require('apollo-server');
// const { signIn, signUp, signOut } = require('../../controllers/user/userControllers');


const typeDefs = gql`
  extend type Query {

  }
  extend type Mutation {

  }

  #Data Type
  type Post{
    userName: String!
    postContent: String!
    likes: Number!
    createTime: String!
  }
  
  
  #Input Data
`;
const resolvers = {
    Query: {
        hello: (parent, { userName }) => {
            return `Hello ${userName}`;
        }
    },
    Mutation: {
        signIn: async (obj, { signInData }, { req }) => {
            // console.log(req.headers.authorization)
            return await signIn(signInData, req);
        },
        signUp: async (obj, { signUpData }) => {
            return await signUp(signUpData);
        },
        signOut: async (obj, args, { req }) => {
            return await signOut(req);
        },
        
    },
};
module.exports = { 
  userSchema: typeDefs, 
  userResolvers: resolvers 
}