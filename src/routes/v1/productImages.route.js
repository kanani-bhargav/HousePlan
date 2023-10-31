const express = require("express");
const { upload } = require("../../middlewares/upload");
const { ProductImagesValidation } = require("../../validations");
const { productImagesController } = require("../../controllers");
const validate = require("../../middlewares/validate");

const router = express.Router();

/** create ProductImages */
router.post(
  "/create",
  upload.fields([
    { name: "product_image_1" },
    { name: "product_image_2" },
    { name: "product_image_3" },
    { name: "product_image_4" },
    { name: "floorPlan_1" },
    { name: "floorPlan_2" },
  ]),
  productImagesController.createProductImages
);

/** Get ProductImages list */
router.get(
  "/list",
productImagesController.getProductImagesList
);

/** Get ProductImages details by id */
router.get(
  "/get-details/:productImagesId",
productImagesController.getProductImagesById
);

/** ProductImages details update by id */
router.put(
  "/update/:productImagesId",
  upload.fields([
    { name: "product_image_1" },
    { name: "product_image_2" },
    { name: "product_image_3" },
    { name: "product_image_4" },
    { name: "floorPlan_1" },
    { name: "floorPlan_2" },
  ]),
productImagesController.updateProductImages
);

/** Delete ProductImages */
router.delete(
  "/delete/:productImagesId",
productImagesController.deleteProductImages
);

module.exports = router;