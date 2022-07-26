const { User, Thought } = require("../models");

module.exports = {

    // GET all users 
    getAllUsers(req, res) {
        User.find().select("-__v")
          .then((dbuserData) => res.json(dbuserData))
          .catch((err) => {
            res.status(500).json(err);
          });
    },

    // GET signle user 
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId }).select("-__v")
          .populate({
            path: "Friends",
          })
          .populate({
            path: "Thoughts",
          })
          .then((dbuserData) => {
            if (!dbuserData) {
              return res
                .status(404) .json({ message: "NO USER FOUND" });
            }
            res.json(dbuserData);
          })
          .catch((err) => {
             res.status(500).json(err);
        });
      },

      // create a new user 
      createUser(req, res) {
        User.create(req.body)
          .then((dbuserData) => res.json(dbuserData))
          .catch((err) => res.status(500).json(err));
      },

      // update a user 
      updateUser(req, res) {
        User.findOneAndUpdate(
          { _id: req.params.userId },
          { $set: req.body },
          { runValidators: true, new: true }
        )
          .then((dbuserData) => {
            if (!dbuserData) {
              return res
                .status(404)
                .json({ message: "NO USER FOUND" });
            }
            res.status(200).json(userData);
          })
          .catch((err) => {
            res.status(500).json(err);
          });

          // delete a user 
      },
      deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
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

          // add a friend (user)
      },
      addFriend(req, res) {
        User.findOneAndUpdate(
          { _id: req.params.userId },
          { $addToSet: { friends: req.body } },
          { runValidators: true, new: true }
        )
          .then((dbuserData) => {
            if (!dbuserData) {
              return res
                .status(404)
                .json({ message: "No user found with this id!" });
            }
            res.status(200).json(dbuserData);
          })
          .catch((err) => res.status(500).json(err));
      },

      // delete a friend (user)
      deleteFriend(req, res) {
        User.findOneAndUpdate(
          { _id: req.params.userId },
          { $pull: { friends: req.params.friendId } },
          { new: true }
        )

          .then((dbuserData) => {
            if (!dbuserData) {
              return res
                .status(404)
                .json({ message: "No user found with this id!" });
            }
            res.status(200).json(dbuserData);
          })
          .catch((err) => res.status(500).json(err));
      },
    };
 