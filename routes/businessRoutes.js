const express = require("express");

const businessController = require("../controllers/businessController");

const router = express.Router();

router.route("/").post(businessController.createBusiness);

router.route("/:id").get(businessController.getBusiness);

module.exports = router;
