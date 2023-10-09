const express = require("express");
const { categoryValidation } = require("../../validations");
const { categoryController } = require("../../controllers");
const validate = require("../../middlewares/validate");

const router = express.Router();

/** create category */
router.post(
  "/create",
  validate(categoryValidation.createCategory),
  categoryController.createCategory
);

/** Get category list */
router.get(
  "/list",
  validate(categoryValidation.getCategoryList),
  categoryController.getCategoryList
);

/** Get category details by id */
router.get(
  "/get-details/:categoryId",
  validate(categoryValidation.getDetails),
  categoryController.getCategoryDetails
);

/** category details update by id */
router.put(
  "/update/:categoryId",
  validate(categoryValidation.updateCategoryDetails),
  categoryController.updateCategoryDetails
);

/** Delete category */
router.delete(
  "/delete/:categoryId",
  validate(categoryValidation.getDetails),
  categoryController.deleteCategory
);

module.exports = router;