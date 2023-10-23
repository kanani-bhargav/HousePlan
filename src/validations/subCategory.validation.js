const Joi = require("joi");

/** create SubCategory */
const createSubCategory = {
  body: Joi.object().keys({
    subCategory_name: Joi.string().required().trim(),
    subCategory_heading: Joi.string().required().trim(),
    subCategory_description: Joi.string().required().trim(),
    subCategory_image: Joi.string().allow(),
    category: Joi.string().required().trim(),
  }),
};

/** GEt SubCategory list */
const getSubCategoryList = {
  query: Joi.object().keys({
    search: Joi.string().trim().allow(""),
    sortBy: Joi.string().trim().allow(""),
    limit: Joi.number().integer().allow("").default(10),
    page: Joi.number().integer().allow("").default(1),
  }),
};

/** Get SubCategory details by id */
const getDetails = {
  params: Joi.object().keys({
    subCategoryId: Joi.string().required().trim(),
  }),
};

/** SubCategory details update by id */
const updateSubCategory = {
  params: Joi.object().keys({
    subCategoryId: Joi.string().required().trim(),
  }),
  body: Joi.object().keys({
    subCategory_heading: Joi.string().trim(),
    subCategory_description: Joi.string().trim(),
    subCategory_image: Joi.string().allow(),
    is_active: Joi.string().allow(),
  }),
};


module.exports = {
  createSubCategory,
  getDetails,
  getSubCategoryList,
  updateSubCategory,
};