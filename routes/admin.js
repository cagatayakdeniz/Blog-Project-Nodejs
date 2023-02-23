const express = require("express");
const router = express.Router();
const imageUpload = require("../helpers/image-upload");
const adminController = require("../controllers/admin");

const isAdmin = require("../middlewares/isAdmin");
const isAdminAndModerator = require("../middlewares/isAdminAndModerator");

const _csrf = require("../middlewares/csrf");

router.get("/blog/delete/:blogid", isAdminAndModerator, _csrf, adminController.get_blog_delete_blogid);

router.get("/category/delete/:categoryid", isAdmin, _csrf, adminController.get_category_delete_categoryid);

router.get("/blogs/:blogid", isAdminAndModerator, _csrf, adminController.get_blog_with_blogid);

router.get("/categories/:categoryid", isAdmin, _csrf, adminController.get_category_with_categoryid);

router.post("/categories/:categoryid", adminController.post_category_with_categoryid);

router.post("/blogs/:blogid", imageUpload.upload.single('yeniResim'),adminController.post_blog_with_blogid);

router.get("/category/create", isAdmin, _csrf, adminController.get_category_create);

router.post("/category/create",adminController.post_category_create);

router.get("/blog/create", isAdminAndModerator, _csrf, adminController.get_blog_create);

router.post("/blog/create", _csrf, imageUpload.upload.single('resim'),adminController.post_blog_create);

router.get('/blog-list', isAdminAndModerator, _csrf, adminController.get_blog_list);

router.get('/category-list', isAdmin, _csrf, adminController.get_category_list);

router.get('/roles/delete/user/:userid', isAdmin, _csrf, adminController.get_roles_delete_user_userid);

router.get('/roles/delete/:roleid', isAdmin, _csrf, adminController.get_roles_delete_roleid);

router.get('/roles/:roleid', isAdmin, _csrf, adminController.get_role_with_roleid);

router.post('/roles/:roleid', adminController.post_role_with_roleid);

router.get('/roles', isAdmin, _csrf, adminController.get_roles);

router.get('/users/:userid', isAdmin, _csrf, adminController.get_user_with_userid);

router.get('/users', isAdmin, _csrf, adminController.get_users);

module.exports = router;