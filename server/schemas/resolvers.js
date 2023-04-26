const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    // gets database information
    Query: {
        // shows all users with attached books schema
        users: async () => {
            return User.find()/*.populate('books');*/
        },
        // shows specific user with attached books schema
        user: async (parent, { username }) => {
            return User.findOne({ username })/*.populate('books');*/
        }
    },
    // modify database information
    Mutation: {
        addUser: async (parent, {username, email, password}) => {
            const newUser = await User.create({username, email, password});
            const token = signToken(newUser);
            return { token, newUser };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne( { email });
            // verifies user with this email address exists
            if (!user) {
                throw new AuthenticationError('No user found with these credentials. Please try again')
            }
            const correctPw = await user.isCorrectPassword(password);
        }
    }
}