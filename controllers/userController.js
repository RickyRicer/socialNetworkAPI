const { User } = require('../models');
const { isEmail } = require('validator');


module.exports = {

    createUser: async (req, res) => {
        const { username, email } = req.body;
        if (!isEmail(email)) {
            return res.status(400).json({ error: 'You must provide a username, email, and password!' });
        }
        try {
            console.log('Create user');
            const newUser = await User.create({
                username, 
                email, 
            });
            res.json(newUser);
        } catch (e) {
            res.json(e);
        }
    },

    getAllUsers: async (req, res) => {
        try {
            const users = await User.find();
            res.json(users);
        } catch (e) {
            res.json(e);
        }
    },

    getUserById: async (req, res) => {
        const { userId } = req.params;
        try {
            const user = await User.findById(userId);
            res.json(user);
        } catch (e) {
            res.json(e);
        }
    },

    updateUserById: async (req, res) => {
        const { userId } = req.params;
        try {
            const updateUser = await User.findOneAndUpdate(
                userId,
                {...req.body},
                {
                    new: true,
                    runValidators: true,
                }
            );
            res.json(updateUser);
        } catch (e) {
            res.json(e);
        }
    },

    deleteUserById: async (req, res) => {
        const { userId } = req.params;
        try {
            const deleteUser = await User.findByIdAndDelete(userId);
            res.json(deleteUser);
        } catch (e) {
            res.json(e);
        }
    },

    addFriendById: async (req, res) => {
        const { userId, friendId } = req.params;
        try {
            const updateUser = await User.findByIdAndUpdate(userId,
                {
                    $push: {
                        friends: friendId,
                    },
                },
                {
                    new: true,
                }
            );
            res.json(updateUser);
        } catch (e) {
            res.json(e);
        }
    },

    deleteFriendToUser: async (req, res) => {
        const { userId, friendId } = req.params;
        try {
            const updateUser = User.findByIdAndUpdate(userId, 
            {
                $pull: {
                    friends: friendId,
                },
            },
            {
                new: true,
            }
            );
            res.json(updateUser);
        } catch (e) {
            res.json(e);
        }
    },
};
