const { ChildSubCategory } = require("../models");

/**
 * Create childSubCategory
 * @param {object} reqBody
 * @returns {Promise<ChildSubCategory>}
 */
const createChildSubCategory = async (reqBody) => {
  return ChildSubCategory.create(reqBody);
};

/**
 * Get childSubCategory list
 * @param {object} filter
 * @param {object} options
 * @returns {Promise<ChildSubCategory>}
 */
const getChildSubCategoryList = async (filter, options) => {
  return ChildSubCategory.find().populate("category");
};

/**
 * Get childSubCategory details by id
 * @param {ObjectId} childSubCategoryId
 * @returns {Promise<ChildSubCategory>}
 */
const getChildSubCategoryById = async (childSubCategoryId) => {
  return ChildSubCategory.findById(childSubCategoryId);
};

/**
 * childSubCategory details update by id
 * @param {ObjectId} childSubCategoryId
 * @param {object} updateBody
 * @returns {Promise<ChildSubCategory>}
 */
const updateChildSubCategory= async (childSubCategoryId, updateBody) => {
  return ChildSubCategory.findByIdAndUpdate(childSubCategoryId, { $set: updateBody });
};

/**
 * Delete childSubCategory
 * @param {ObjectId} childSubCategoryId
 * @returns {Promise<ChildSubCategory>}
 */
const deleteChildSubCategory = async (childSubCategoryId) => {
  return ChildSubCategory.findByIdAndDelete(childSubCategoryId);
};

const getChildSubCategoryByName = async (reqBody) => {
  return ChildSubCategory.findOne({ childSubCategory_name: reqBody });
};

module.exports = {
  createChildSubCategory,
  getChildSubCategoryList,
  getChildSubCategoryById,
  updateChildSubCategory,
  deleteChildSubCategory,
  getChildSubCategoryByName,
};
