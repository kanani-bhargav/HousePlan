const { FILES_FOLDER } = require("../helpers/constant.helper");
const { ProductImages } = require("../models");
const { s3Upload } = require("./awsS3.service");
const fileService = require("./files.service");

/**
 * Create productImages
 * @param {object} reqBody
 * @returns {Promise<ProductImages>}
 */
const createProductImages = async (reqBody, fileDataArray) => {
  const productImages = {};

  for (const fileData in fileDataArray) {
    const fileField = fileDataArray[fileData][0].fieldname;

    const fileImage = fileService.getFileName(fileDataArray[fileData][0]);

    await s3Upload(
      `${FILES_FOLDER.product_images}/${fileImage}`,
      fileDataArray[fileData][0].buffer
    );

    productImages[fileField] = fileImage;
  }

  const newProductImages = await ProductImages.create({
    ...reqBody,
    ...productImages,
  });

  return newProductImages;
};

/**
 * Get productImages list
 * @param {object} filter
 * @param {object} options
 * @returns {Promise<ProductImages>}
 */
const getProductImagesList = async (filter, options) => {
  return ProductImages.find();
};

/**
 * Get productImages details by id
 * @param {ObjectId} productImagesId
 * @returns {Promise<ProductImages>}
 */
const getProductImagesById = async (productImagesId) => {
  return ProductImages.findById(productImagesId);
};

/**
 * productImages details update by id
 * @param {ObjectId} productImagesId
 * @param {object} updateBody
 * @returns {Promise<ProductImages>}
 */
const updateProductImages = async (productImagesId, updateBody) => {
  return ProductImages.findByIdAndUpdate(productImagesId, { $set: updateBody });
};

/**
 * Delete productImages
 * @param {ObjectId} productImagesId
 * @returns {Promise<ProductImages>}
 */
const deleteProductImages = async (productImagesId) => {
  return ProductImages.findByIdAndDelete(productImagesId);
};

const getProductImagesByName = async (reqBody) => {
  return ProductImages.findOne({ productImages_name: reqBody });
};

module.exports = {
  createProductImages,
  getProductImagesList,
  getProductImagesById,
  updateProductImages,
  deleteProductImages,
  getProductImagesByName,
};
