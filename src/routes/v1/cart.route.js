const express = require("express");
const { cartValidation } = require("../../validations");
const { cartController } = require("../../controllers");
const validate = require("../../middlewares/validate");

const router = express.Router();

/** create cart */
router.post(
  "/create",
  validate(cartValidation.createCart),
  cartController.createCart
);

/** Get cart list */
router.get(
  "/list",
  validate(cartValidation.getCartList),
  cartController.getCartList
);

/** Get cart details by id */
router.get(
  "/get-details/:cartId",
  validate(cartValidation.getDetails),
  cartController.getCartById
);

/** cart details update by id */
router.put(
  "/update/:cartId",
  validate(cartValidation.updateCart),
  cartController.updateCart
);

/** Delete cart */
router.delete(
  "/delete/:cartId",
  validate(cartValidation.getDetails),
  cartController.deleteCart
);

module.exports = router;