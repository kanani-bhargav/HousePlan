const { Product } = require("../models");


/**
 * Create product
 * @param {object} reqBody
 * @returns {Promise<Product>}
 */
const createProduct = async (reqBody) => {
  const newProduct = await Product.create({
    ...reqBody,
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
  return Product.find().populate("subCategory").populate("childSubCategory").populate("productImages")
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
  return Product.findOne({ plan: reqBody });
};

module.exports = {
  createProduct,
  getProductList,
  getProductById,
  updateProduct,
  deleteProduct,
  getProductByName,
};
