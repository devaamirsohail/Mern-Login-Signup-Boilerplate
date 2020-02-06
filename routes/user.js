const express = require("express");
const router = express.Router();

//import controller
const { getUser, updateUser } = require("../controllers/user");
//authentication
const { requireSignin } = require("../controllers/auth");
const { adminMiddleware } = require("../controllers/auth");
//get User by ID
//Private route
router.get("/:id", requireSignin, getUser);
//update user
//Private route
router.put("/update", requireSignin, updateUser);
//update user
//Admin route
router.put("/admin/update", requireSignin, adminMiddleware, updateUser);

module.exports = router;
