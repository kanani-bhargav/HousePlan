const express = require("express");
const { upload } = require("../../middlewares/upload");
// const { productValidation } = require("../../validations");
const { productController } = require("../../controllers");
const validate = require("../../middlewares/validate");

const router = express.Router();

/** create product */
router.post(
  "/create",
  upload.array("product_images", 4), // You can change "2" to the desired maximum number of images
  // validate(productValidation.createProduct),
  productController.createProduct
);


/** Get product list */
router.get(
  "/list",
  // validate(productValidation.getProductList),
  productController.getProductList
);

/** Get product details by id */
router.get(
  "/get-details/:productId",
  // validate(productValidation.getDetails),
  productController.getProductById
);

/** product details update by id */
router.put(
  "/update/:productId",
  upload.single("product_image"),
  // validate(productValidation.updateProduct),
  productController.updateProduct
);

/** Delete product */
router.delete(
  "/delete/:productId",
  // validate(productValidation.getDetails),
  productController.deleteProduct
);

module.exports = router;