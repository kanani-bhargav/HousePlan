const express = require("express");
const { upload } = require("../../middlewares/upload");
const { childSubCategoryValidation } = require("../../validations");
const { childSubCategoryController } = require("../../controllers");
const validate = require("../../middlewares/validate");

const router = express.Router();

/** create childSubCategory */
router.post(
  "/create",
  upload.single("childSubCategory_image"),
  validate(childSubCategoryValidation.createChildSubCategory),
  childSubCategoryController.createChildSubCategory
);

/** Get childSubCategory list */
router.get(
  "/list",
  validate(childSubCategoryValidation.getChildSubCategoryList),
  childSubCategoryController.getChildSubCategoryList
);

/** Get childSubCategory details by id */
router.get(
  "/get-details/:childSubCategoryId",
  validate(childSubCategoryValidation.getDetails),
  childSubCategoryController.getChildSubCategoryById
);

/** childSubCategory details update by id */
router.put(
  "/update/:childSubCategoryId",
  upload.single("childSubCategory_image"),
  validate(childSubCategoryValidation.updateChildSubCategory),
  childSubCategoryController.updateChildSubCategory
);

/** Delete childSubCategory */
router.delete(
  "/delete/:childSubCategoryId",
  validate(childSubCategoryValidation.getDetails),
  childSubCategoryController.deleteChildSubCategory
);

module.exports = router;