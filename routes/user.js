const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const isAuth = require("../middlewares/routeProtection");

router.get("/blogs/category/:categoryid", isAuth, userController.get_blogs_with_categoryid)

router.get("/blogs/:blogid", isAuth, userController.get_blogs_with_blogid)

router.get("/blogs", isAuth, userController.get_blogs)

router.get('/', isAuth, userController.get_index)

module.exports = router;