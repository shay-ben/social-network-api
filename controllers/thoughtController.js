const { Thought, User } = require("../models");

module.exports = {

    // GET all thoughts 
  getAllThoughts(req, res) {
    Thought.find().select("-__v")
      .then((dbthoughtData) => res.status(200).json(dbthoughtData))
      .catch((err) => {
        res.status(500).json(err);
      });
  },

  // GET single thought 
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select("-__v").then((thoughtData) => {
        if (!dbthoughtData) {
          return res
            .status(404)
            .json({ message: "NO THOUGHT FOUND" });
        }
        res.status(200).json(dbthoughtData);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },

  // create a thought 
  createThought(req, res) {
    Thought.create(req.body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then((dbuserData) => {
        if (!dbuserData) {
          return res
            .status(404)
            .json({ message: "NO USER FOUND" });
        }
        res.status(200).json(dbuserData);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },

  // update a thought 
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((dbthoughtData) => {
        if (!dbthoughtData) {
          return res
            .status(404)
            .json({ message: "NO THOUGHT FOUND!" });
        }
        res.status(200).json(dbthoughtData);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },

  //DELETE thought 
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((dbthoughtData) => {
        if (!dbthoughtData) {
          return res.status(404).json({ message: "NO THOUGHT FOUND!" });
        }

    // then update it 
    User.findOneAndUpdate(
        { thoughts: req.params.thoughtId },
        { $pull: { thoughts: req.params.thoughtId}},
        { new: true }
        )
        .then((dbuserData) => {
          if (!dbuserData) {
            return res
              .status(404)
              .json({ message: "NO USER FOUND!" });
          }
          res.status(200).json(dbthoughtData);
        });
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },

  addReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $push: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((dbthoughtData) => {
        if (!dbthoughtData) {
          return res
            .status(404)
            .json({ message: "NO USER FOUND!" });
        }
        res.status(200).json(dbthoughtData);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  deleteReaction(req, res) {
    Thought.findOneAndUpdate (
      { _id: req.params.thoughtId },
      { $pull: { reactions: { 
          reactionId: req.params.reactionId}} 
      },

      { runValidators: true, new: true }
    )
      .then((dbthoughtData) => {
        if (!dbthoughtData) {
          return res
            .status(404)
            .json({ message: "NO USER FOUND" });
        }
        res.status(200).json(dbthoughtData);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
};