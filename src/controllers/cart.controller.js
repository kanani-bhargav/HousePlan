const { cartService } = require("../services");

/** create cart */
const createCart = async (req, res) => {
  try {
    const reqBody = req.body;
    const cart = await cartService.createCart(reqBody);
    if (!cart) {
      throw new Error("Something went wrong, please try again or later!");
    }
    res.status(200).json({
      success: true,
      message: "Cart create successfully!",
      cart,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/** Get cart list */
const getCartList = async (req, res) => {
  try {
    const { search, ...options } = req.query;
    let filter = {};

    if (search) {
      filter.$or = [
        { first_name: { $regex: search, $options: "i" } },
        { last_name: { $regex: search, $options: "i" } },
      ];
    }

    const cart = await cartService.getCartList(filter, options);

    res.status(200).json([...cart]);
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/** Get cart details by id */
const getCartById = async (req, res) => {
  try {
    const cart = await cartService.getCartById(
      req.params.cartId
    );
    if (!getDetails) {
      throw new Error("Cart not found!");
    }

    res.status(200).json({
      success: true,
      message: "Cart details get successfully!",
      cart,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/** cart details update by id */
const updateCart = async (req, res) => {
  try {
    const cartId = req.params.cartId;
    const cartExists = await cartService.getCartById(cartId);
    if (!cartExists) {
      throw new Error("Cart not found!");
    }

    const updatedCart = await cartService.updateCart(
      cartId,
      req.body
    );

    const cart = await cartService.getCartById(cartId);
    res.status(200).json({
      success: true,
      message: "Cart details update successfully!",
      cart,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/** Delete cart */
const deleteCart = async (req, res) => {
  try {
    const cartId = req.params.cartId;
    const cartExists = await cartService.getCartById(cartId);
    if (!cartExists) {
      throw new Error("Cart not found!");
    }

    await cartService.deleteCart(cartId);

    res.status(200).json({
      success: true,
      message: "Cart delete successfully!",
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = {
  createCart,
  getCartList,
  getCartById,
  updateCart,
  deleteCart,
};
