const { Thought } = require('../models');

module.exports = {
    createThought: async (req, res) => {
        const { thought, username } = req.body;
        try {
            const newThought = await Thought.create({ thought, username, });
            res.json(newThought);
        } catch (e) {
            res.json(e);
        }
    },

};