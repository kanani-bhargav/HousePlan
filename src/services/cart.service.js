const { Cart } = require("../models");

/**
 * Create cart
 * @param {object} reqBody
 * @returns {Promise<Cart>}
 */
const createCart = async (reqBody) => {
  return Cart.create(reqBody);
};

/**
 * Get cart list
 * @param {object} filter
 * @param {object} options
 * @returns {Promise<Cart>}
 */
const getCartList = async (filter, options) => {
  return Cart.find().populate("product");
};

/**
 * Get cart details by id
 * @param {ObjectId} cartId
 * @returns {Promise<Cart>}
 */
const getCartById = async (cartId) => {
  return Cart.findById(cartId);
};

/**
 * cart details update by id
 * @param {ObjectId} cartId
 * @param {object} updateBody
 * @returns {Promise<Cart>}
 */
const updateCart = async (cartId, updateBody) => {
  return Cart.findByIdAndUpdate(cartId, { $set: updateBody });
};

/**
 * Delete cart
 * @param {ObjectId} cartId
 * @returns {Promise<Cart>}
 */
const deleteCart = async (cartId) => {
  return Cart.findByIdAndDelete(cartId);
};

const getCartByName = async (reqBody) => {
  return Cart.findOne({ cart_name: reqBody });
};

module.exports = {
  createCart,
  getCartList,
  getCartById,
  updateCart,
  deleteCart,
  getCartByName,
};
