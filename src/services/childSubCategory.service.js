const { image_url } = require("../config/config");
const { FILES_FOLDER } = require("../helpers/constant.helper");
const { ChildSubCategory } = require("../models");
const { s3Delete, s3Upload } = require("./awsS3.service");
const fileService = require("./files.service");

/**
 * Create childSubCategory
 * @param {object} reqBody
 * @returns {Promise<ChildSubCategory>}
 */
const createChildSubCategory = async (reqBody, fileData) => {
  const childSubCategory_image = fileService.getFileName(fileData);

  /** validate the uploaded files */
  fileService.validateImageFile({
    childSubCategory_image: childSubCategory_image,
  });

  /** Upload image on AWS S3 bucket */
  await s3Upload(
    `${FILES_FOLDER.childSubCategory_img}/${childSubCategory_image}`,
    fileData.buffer
  );

  const newChildSubCategory = await ChildSubCategory.create({
    ...reqBody,
    childSubCategory_image,
  });

  return newChildSubCategory;
  // return ChildSubCategory.create(reqBody);
};

/**
 * Get childSubCategory list
 * @param {object} filter
 * @param {object} options
 * @returns {Promise<ChildSubCategory>}
 */
const getChildSubCategoryList = async (filter, options) => {
  return ChildSubCategory.find().populate({
    path: "subCategory",
  });
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
const updateChildSubCategory = async (childSubCategoryId, updateBody) => {
  return ChildSubCategory.findByIdAndUpdate(childSubCategoryId, {
    $set: updateBody,
  });
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
