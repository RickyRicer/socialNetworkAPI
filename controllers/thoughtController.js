const {
    Thought,
    User
} = require('../models');

module.exports = {
    createThought: async (req, res) => {
        const {
            thoughtText,
            username,
            userId
        } = req.body;
        try {
            const newThought = await Thought.create({
                    thoughtText,
                    username,
                    userId,
                })
                .then(({
                    _id
                }) => {
                    return User.findOneAndUpdate({
                        _id: userId
                    }, {
                        $push: {
                            thoughts: _id
                        }
                    }, {
                        new: true
                    });
                })
                .then((newThoughtData) => {
                    res.json(newThoughtData);
                });
        } catch (error) {
            console.log(error);
        }
    },

    getAllThoughts: async (req, res) => {
        try {
            const thoughts = await Thought.find().lean();
            res.json(thoughts);
        } catch (error) {
            res.json(error);
        }
    },

    getThoughtById: async (req, res) => {
        const {
            thoughtId
        } = req.params;
        try {
            const thought = await Thought.findById(thoughtId);
            res.json(thought)
        } catch (e) {
            res.json(e);
        }
    },

    updateThoughtById: async (req, res) => {
        const {
            thoughtId
        } = req.params;
        try {
            const updateThought = await Thought.findByIdAndUpdate(
                thoughtId, {
                    ...req.body
                }, {
                    new: true,
                    runValidators: true,
                }
            );
            res.json(updateThought);
        } catch (e) {
            res.json(e);
        }
    },

    deleteThoughtById: async (req, res) => {
        const {
            thoughtId
        } = req.params;
        try {
            const deleteThought = await Thought.findByIdAndDelete(thoughtId);
            res.json(deleteThought);
        } catch (e) {
            res.json(e);
        }
    },

    createReaction: async (req, res) => {
        const {
            thoughtId
        } = req.params;
        const {
            reactionBody,
            username
        } = req.body;
        try {
            const updateThought = await Thought.findByIdAndUpdate(thoughtId, {
                $push: {
                    reactions: {
                        reactionBody,
                        username
                    }
                },
            }, {
                new: true,
            });
            res.json(updateThought);
        } catch (e) {
            res.json(e);
        }
    },

    deleteReaction: async (req, res) => {
        const {
            thoughtId,
            reactionId
        } = req.params;
        try {
            const updateThought = await Thought.findByIdAndUpdate(
                thoughtId, {
                    $pull: {
                        reactions: {
                            reactionId,
                        },
                    },
                }, {
                    new: true,
                }
            );
            res.json(updateThought);
        } catch (e) {
            res.json(e);
        }
    },
};