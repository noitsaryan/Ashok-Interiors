const {
  adminLogin,
  uploadImage,
  uploadProduct,
  fetchProductById,
  fetchProductByCategory,
  fetchAllProducts,
  updateStatus,
  getOrders,
  updateProduct,
  deleteProduct
} = require("../controllers/admin");

const {
  userLogin,
  userRegister,
  forgetPassword,
  validate,
  fetchUser,
  newOrder,
  updateUser,
  cartManagement,
  checkout,
  getCookie,
  clearCookie,
} = require("../controllers/user");

const multer = require("multer");
const router = require("express").Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
// Delete Requests
router.route('/delete/:sku').delete(deleteProduct)
// Put Requests
router.route('/status').put(updateStatus)
router.route('/user/:updateType').put(updateUser)
router.route('/cart/:type').put(cartManagement)
router.route('/product/update').put(updateProduct)
// Post Requests
router.route("/admin-login").post(adminLogin);
router.route("/uploadImage").post(upload.array("images", 10), uploadImage);
router.route("/uploadProduct").post(uploadProduct);
router.route("/login").post(userLogin);
router.route("/register").post(userRegister);
router.route("/forget").post(forgetPassword);
router.route("/validate").post(validate);
router.route('/newOrder').post(newOrder)
// Get Requests
router.route("/product/id/:productId").get(fetchProductById);
router.route("/product/category/:category").get(fetchProductByCategory);
router.route("/product/all").get(fetchAllProducts);
router.route("/user/:email").get(fetchUser)
router.route("/checkout/:amount").get(checkout)
router.route("/cookie").get(getCookie)
router.route("/clearCookie").get(clearCookie)
router.route("/orders").get(getOrders)


module.exports = router;