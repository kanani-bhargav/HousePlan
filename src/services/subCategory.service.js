const { SubCategory } = require("../models");

/**
 * Create subCategory
 * @param {object} reqBody
 * @returns {Promise<SubCategory>}
 */
const createSubCategory = async (reqBody) => {
  return SubCategory.create(reqBody);
};

/**
 * Get subCategory list
 * @param {object} filter
 * @param {object} options
 * @returns {Promise<SubCategory>}
 */
const getSubCategoryList = async (filter, options) => {
  return SubCategory.find().populate("category");
};

/**
 * Get subCategory details by id
 * @param {ObjectId} subCategoryId
 * @returns {Promise<SubCategory>}
 */
const getSubCategoryById = async (subCategoryId) => {
  return SubCategory.findById(subCategoryId);
};

/**
 * subCategory details update by id
 * @param {ObjectId} subCategoryId
 * @param {object} updateBody
 * @returns {Promise<SubCategory>}
 */
const updateSubCategory = async (subCategoryId, updateBody) => {
  return SubCategory.findByIdAndUpdate(subCategoryId, { $set: updateBody });
};

/**
 * Delete subCategory
 * @param {ObjectId} subCategoryId
 * @returns {Promise<SubCategory>}
 */
const deleteSubCategory = async (subCategoryId) => {
  return SubCategory.findByIdAndDelete(subCategoryId);
};

const getSubCategoryByName = async (reqBody) => {
  return SubCategory.findOne({ subCategory_name: reqBody });
};

module.exports = {
  createSubCategory,
  getSubCategoryList,
  getSubCategoryById,
  updateSubCategory,
  deleteSubCategory,
  getSubCategoryByName,
};
