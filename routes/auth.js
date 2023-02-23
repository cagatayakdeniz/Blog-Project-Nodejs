const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth");

const _csrf = require("../middlewares/csrf");

router.get("/register", _csrf, authController.get_register);

router.post("/register", _csrf, authController.post_register);

router.get("/login", _csrf, authController.get_login);

router.post("/login", authController.post_login);

router.get("/logout", _csrf, authController.get_logout);

router.get("/reset-password", _csrf, authController.get_reset_password);

router.post("/reset-password", authController.post_reset_password);

router.get("/new-password/:token", _csrf, authController.get_new_password);

router.post("/new-password/:token", authController.post_new_password);

module.exports = router;