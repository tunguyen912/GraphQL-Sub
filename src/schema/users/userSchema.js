const { gql } = require('apollo-server');
const { signIn, signUp, signOut } = require('../../controllers/user/userControllers');


const typeDefs = gql`
  extend type Query {
    hello(userName: String!): String!
  }
  extend type Mutation {
    signIn(signInData: signInData): SignInResponse
    signUp(signUpData: signUpData): DefaultResponse
    signOut: DefaultResponse
  }

  #Data Type
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
        hello: (parent, { userName }) => {
            return `Hello ${userName}`;
        }
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