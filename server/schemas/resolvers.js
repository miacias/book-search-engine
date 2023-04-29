const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    // gets database information
    Query: {
        // shows all users with attached books schema
        users: async () => {
            return User.find();
        },
        // shows specific user with attached books schema
        user: async (parent, { username }) => {
            return User.findOne({ username });
        }
    },
    // modify database information
    Mutation: {
        addUser: async (parent, { username, email, password }) => {
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
            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials. Please try again.');
            }
            const token = signToken(user);
            return { token, user };
        },
        addBook: async (parent, { authors, description, bookId, image, link, title }, context) => {
            if (context.user) {
                return User.findOneAndUpdate(
                    {_id: context.user._id},
                    {
                        $addToSet: {
                            savedBooks: { authors, description, bookId, image, link, title }
                        }
                    },
                    {
                      new: true,
                      runValidators: true,
                    }
                );
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        removeBook: async (parent, { userId, bookId }, context) => {
            if (context.user) {
                return User.findOneAndUpdate(
                    {_id: context.user._id},
                    {
                        $pull: {
                            savedBooks: {
                                _id: bookId
                            }
                        }
                    },
                    { new: true }
                );
            }
            throw new AuthenticationError('You need to be logged in!');
        }
    }
}

module.exports = resolvers;