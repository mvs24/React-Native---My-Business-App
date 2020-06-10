const express = require("express");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get(
  "/current-user",
  authController.protect,
  authController.getCurrentUser
);
router
  .route("/has-business")
  .get(authController.protect, userController.hasBusiness);

router.route("/").get(userController.getAllUsers);

module.exports = router;
