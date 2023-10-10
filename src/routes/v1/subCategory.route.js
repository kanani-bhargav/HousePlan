const express = require("express");
const { subCategoryValidation } = require("../../validations");
const { subCategoryController } = require("../../controllers");
const validate = require("../../middlewares/validate");

const router = express.Router();

/** create category */
router.post(
  "/create",
  validate(subCategoryValidation.createSubCategory),
  subCategoryController.createSubCategory
);

/** Get category list */
router.get(
  "/list",
  validate(subCategoryValidation.getSubCategoryList),
  subCategoryController.getSubCategoryList
);

/** Get category details by id */
router.get(
  "/get-details/:categoryId",
  validate(subCategoryValidation.getDetails),
  subCategoryController.getSubCategoryDetails
);

/** category details update by id */
router.put(
  "/update/:categoryId",
  validate(subCategoryValidation.updateSubCategoryDetails),
  subCategoryController.updateSubCategoryDetails
);

/** Delete category */
router.delete(
  "/delete/:categoryId",
  validate(subCategoryValidation.getDetails),
  subCategoryController.deleteSubCategory
);

module.exports = router;