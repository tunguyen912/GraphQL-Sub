const { gql } = require('apollo-server');
const { signIn, signUp, signOut, getUserListController } = require('../../controllers/user/userControllers');
const authorizationMiddleware = require('../../middlewares/authorizationMiddleware');


const typeDefs = gql`
  extend type Query {
    getUserList: [UserResponse]
  }
  extend type Mutation {
    signIn(signInData: signInData): SignInResponse
    signUp(signUpData: signUpData): DefaultResponse
    signOut: DefaultResponse
  }

  #Data Type
  type UserResponse {
    userName: String!
    email: String!
  }
  type SignInResponse{
    isSuccess: Boolean!
    message: String
    jwt: String
  }
  type DefaultResponse{
    isSuccess: Boolean!
    message: String
  }
  
  #Input Data
  input signInData {
    userName: String!
    password: String!
  }
  input signUpData {
    email: String!
    password: String!
    userName: String!
  }
`;
const resolvers = {
    Query: {
        getUserList: async (_, __, context) => {
          let result = await authorizationMiddleware(context, getUserListController)
          return result
        },
    },
    Mutation: {
        signIn: async (obj, { signInData }, { req }) => {
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