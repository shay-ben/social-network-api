const router = require('express').Router();
const {
  createUser,
  getSingleUser,
  getAllUsers,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,

} = require("../../controllers/userController");

// ROUTE for /api/users
router.route("/").get(getAllUsers).post(createUser);

router.route("/:userId").get(getSingleUser).put(updateUser).delete(deleteUser);

router.route("/:userId/friends").post(addFriend);

router.route("/:userId/friends/:friendId").delete(deleteFriend);

module.exports = router;