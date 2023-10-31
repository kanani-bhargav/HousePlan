const Joi = require("joi");

/** create cart */
const createCart = {
  body: Joi.object().keys({
    total: Joi.number().integer().required(),
    product:Joi.string().trim().required(),
  }),
};

/** GEt cart list */
const getCartList = {
  query: Joi.object().keys({
    search: Joi.string().trim().allow(""),
    sortBy: Joi.string().trim().allow(""),
    limit: Joi.number().integer().allow("").default(10),
    page: Joi.number().integer().allow("").default(1),
  }),
};

/** Get cart details by id */
const getDetails = {
  params: Joi.object().keys({
    cartId: Joi.string().required().trim(),
  }),
};

/** cart details update by id */
const updateCart = {
  params: Joi.object().keys({
    cartId: Joi.string().required().trim(),
  }),
  body: Joi.object().keys({
    total: Joi.number().integer().required(),
    product:Joi.string().trim().required(),
  }),
};


module.exports = {
  createCart,
  getDetails,
  getCartList,
  updateCart,
};