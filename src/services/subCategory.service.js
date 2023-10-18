const { SubCategory } = require("../models");
const { s3Delete, s3Upload } = require('./awsS3.service');
const  fileService  = require('./files.service');




/**
 * Create subCategory
 * @param {object} reqBody
 * @returns {Promise<SubCategory>}
 */
const createSubCategory = async (reqBody,fileData) => {
  const subCategory_image = fileService.getFileName(fileData);

    /** validate the uploaded files */
    fileService.validateImageFile({
        subCategory_image: subCategory_image,
    });

    /** Upload image on AWS S3 bucket */
    await s3Upload(`${FILES_FOLDER.subCategory_img}/${subCategory_image}`, fileData.buffer);

    const newSubCategory = await SubCategory.create({
        ...reqBody,
        subCategory_image,
    });

    return newSubCategory;
  // return SubCategory.create(reqBody);
};

/**
 * Get subCategory list
 * @param {object} filter
 * @param {object} options
 * @returns {Promise<SubCategory>}
 */
const getSubCategoryList = async (filter, options) => {
  return SubCategory.find().populate({
    path: "category",
    select: ["category_name"],
  });
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
