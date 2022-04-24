const { User } = require('../models');
const { isEmail } = require('validator');


module.exports = {

    createUser: async (req, res) => {
        const { username, email } = req.body;
        if (!isEmail(email)) {
            return res.status(400).json({ error: 'You must provide a username, email, and password!' });
        }
        try {
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
};
