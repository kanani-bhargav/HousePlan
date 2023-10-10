const Joi = require("joi");

/** create childSubCategory */
const createChildSubCategory = {
  body: Joi.object().keys({
    childSubCategory_name: Joi.string().required().trim(),
    childSubCategory_heading: Joi.string().required().trim(),
    childSubCategory_description: Joi.string().required().trim(),
    childSubCategory_image: Joi.string().allow(),
    subCategory: Joi.string().required().trim(),
  }),
};

/** GEt childSubCategory list */
const getChildSubCategoryList = {
  query: Joi.object().keys({
    search: Joi.string().trim().allow(""),
    sortBy: Joi.string().trim().allow(""),
    limit: Joi.number().integer().allow("").default(10),
    page: Joi.number().integer().allow("").default(1),
  }),
};

/** Get childSubCategory details by id */
const getDetails = {
  params: Joi.object().keys({
    childSubCategoryId: Joi.string().required().trim(),
  }),
};

/** childSubCategory details update by id */
const updateChildSubCategory = {
  params: Joi.object().keys({
    childSubCategoryId: Joi.string().required().trim(),
  }),
  body: Joi.object().keys({
    childSubCategory_name: Joi.string().required().trim(),
    childSubCategory_heading: Joi.string().required().trim(),
    childSubCategory_description: Joi.string().required().trim(),
    childSubCategory_image: Joi.string().allow(),
    subCategory: Joi.string().required().trim(),
  }),
};


module.exports = {
  createChildSubCategory,
  getDetails,
  getChildSubCategoryList,
  updateChildSubCategory,
};