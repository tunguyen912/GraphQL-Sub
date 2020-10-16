const { User, Message } = require('./model');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/graphql', {
    useNewUrlParser: true,
    useUnifiedTopology: true 
});

const resolvers = {
    Query: {
        async getUser(parent, args, context, info) {
            return await User.findOne({ userName: args.userName });
        },
        async Users() {
            return await User.find({})
        },
        hello: (parent, { userName }) => {
            return `Hello ${userName}`;
        }
    },
    Mutation: {
        async addUser(parent, args, {pubsub}, info) {
            const user = new User({
                userName: args.userName,
                email: args.email
            })
            await user.save()
            pubsub.publish('New User added', {
                newUser: user
            });
            return user
        },
        async updateEmail(parent, args) {
            return await User.findOneAndUpdate({ userName: args.userName }, { email: args.email }, { new: true })
        },
        async deleteUser(parent, args) {
            await User.findOneAndDelete({ userName: args.userName })
            return 'Delete Success'
        },
        async addMessage(parent, args, {pubsub}) {
            const message = new Message({
                messageFrom: await User.findOne({ userName: args.from }),
                messageTo: await User.findOne({ userName: args.to }),
                message: args.message
            })
            await message.save()
            pubsub.publish('New Message added', {
                newMessage: message
            });
            console.log(message)
            return message
        },
    },
    Subscription: {
        newMessage: {
            subscribe: (_, __, { pubsub }) => pubsub.asyncIterator('New Message added')
        },
        newUser: {
            subscribe: (_, __, { pubsub }) => pubsub.asyncIterator('New User added')
        }
    },
};

module.exports = resolvers;