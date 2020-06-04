const express = require("express");
const authController = require("../controllers/authController");
const businessController = require("../controllers/businessController");

const router = express.Router();

const setUser = (req, res, next) => {
  req.body.user = req.user._id;
  next();
};

router.get(
  "/current-business",
  authController.protect,
  businessController.getCurrentUserBusiness
);

router.get(
  "/top-clients",
  authController.protect,
  businessController.getCurrentBusiness,
  businessController.getTopClients
);

router
  .route("/")
  .post(authController.protect, setUser, businessController.createBusiness);

router.route("/:id").get(businessController.getBusiness);

module.exports = router;
