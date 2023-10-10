const express = require("express");
const { upload } = require("../../middlewares/upload");
const { subCategoryValidation } = require("../../validations");
const { subCategoryController } = require("../../controllers");
const validate = require("../../middlewares/validate");

const router = express.Router();

/** create subCategory */
router.post(
  "/create",
  upload.single("subCategory_image"),
  validate(subCategoryValidation.createSubCategory),
  subCategoryController.createSubCategory
);

/** Get subCategory list */
router.get(
  "/list",
  validate(subCategoryValidation.getSubCategoryList),
  subCategoryController.getSubCategoryList
);

/** Get subCategory details by id */
router.get(
  "/get-details/:subCategoryId",
  validate(subCategoryValidation.getDetails),
  subCategoryController.getSubCategoryById
);

/** subCategory details update by id */
router.put(
  "/update/:subCategoryId",
  upload.single("subCategory_image"),
  validate(subCategoryValidation.updateSubCategory),
  subCategoryController.updateSubCategory
);

/** Delete subCategory */
router.delete(
  "/delete/:subCategoryId",
  validate(subCategoryValidation.getDetails),
  subCategoryController.deleteSubCategory
);

module.exports = router;