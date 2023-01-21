const express = require("express");
const { createShop, getShopDetails } = require("../Controllers/shopController");
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");
const router = express.Router();

router.route("/shop/register").post(isAuthenticatedUser,authorizeRoles("admin"),createShop);

router.route("/shop").get(isAuthenticatedUser,getShopDetails);

module.exports = router;
