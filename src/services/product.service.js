const { FILES_FOLDER } = require("../helpers/constant.helper");
const { Product } = require("../models");
const { s3Delete, s3Upload } = require('./awsS3.service');
const  fileService  = require('./files.service');

/**
 * Create product
 * @param {object} reqBody
 * @returns {Promise<Product>}
 */
const createProduct = async (reqBody, fileDataArray) => {
  const productImages = [];

  for (const fileData of fileDataArray) {
    const productImage = fileService.getFileName(fileData);

    /** Upload each image on AWS S3 bucket */
    await s3Upload(`${FILES_FOLDER.product_images}/${productImage}`, fileData.buffer);

    productImages.push(productImage);
  }

  const newProduct = await Product.create({
    ...reqBody,
    product_images: productImages,
  });

  return newProduct;
};

/**
 * Get product list
 * @param {object} filter
 * @param {object} options
 * @returns {Promise<Product>}
 */
const getProductList = async (filter, options) => {
  return Product.find().populate({
    path: "category",
    select: ["category_name"],
  });
};

/**
 * Get product details by id
 * @param {ObjectId} productId
 * @returns {Promise<Product>}
 */
const getProductById = async (productId) => {
  return Product.findById(productId);
};

/**
 * product details update by id
 * @param {ObjectId} productId
 * @param {object} updateBody
 * @returns {Promise<Product>}
 */
const updateProduct = async (productId, updateBody) => {
  return Product.findByIdAndUpdate(productId, { $set: updateBody });
};

/**
 * Delete product
 * @param {ObjectId} productId
 * @returns {Promise<Product>}
 */
const deleteProduct = async (productId) => {
  return Product.findByIdAndDelete(productId);
};

const getProductByName = async (reqBody) => {
  return Product.findOne({ product_name: reqBody });
};

module.exports = {
  createProduct,
  getProductList,
  getProductById,
  updateProduct,
  deleteProduct,
  getProductByName,
};
