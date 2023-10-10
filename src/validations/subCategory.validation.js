const Joi = require("joi");

/** create category */
const createSubCategory = {
  body: Joi.object().keys({
    subCategory_name: Joi.string().required().trim(),
    category: Joi.string().required().trim(),
  }),
};

/** GEt category list */
const getSubCategoryList = {
  query: Joi.object().keys({
    search: Joi.string().trim().allow(""),
    sortBy: Joi.string().trim().allow(""),
    limit: Joi.number().integer().allow("").default(10),
    page: Joi.number().integer().allow("").default(1),
  }),
};

/** Get category details by id */
const getDetails = {
  params: Joi.object().keys({
    categoryId: Joi.string().required().trim(),
  }),
};

/** category details update by id */
const updateSubCategoryDetails = {
  params: Joi.object().keys({
    categoryId: Joi.string().required().trim(),
  }),
  body: Joi.object().keys({
    subCategory_name: Joi.string().required().trim(),
    category: Joi.string().required().trim(),
  }),
};


module.exports = {
  createSubCategory,
  getDetails,
  getSubCategoryList,
  updateSubCategoryDetails,
};