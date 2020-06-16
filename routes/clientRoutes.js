const express = require("express");
const clientController = require("../controllers/clientController");
const businessController = require("../controllers/businessController");
const authController = require("../controllers/authController");
// const AppError = require("../utils/AppError");

const router = express.Router();

router.use(
  authController.protect,
  businessController.getCurrentBusiness,
  businessController.setBusiness
);

router.route("/").post(clientController.createClient);

router.get(
  "/:businessId/search",
  authController.protect,
  clientController.searchClient
);

router.patch("/:clientId/give-reward", clientController.giveReward);
router.route("/:clientId").patch(clientController.updateClient);

module.exports = router;
