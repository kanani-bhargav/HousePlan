const { productService } = require("../services");

/** create product */
const createProduct = async (req, res) => {
  try {
    const reqBody = req.body;

    const productExists = await productService.getProductByName(
      reqBody.plan
    );
    if (productExists) {
      throw new Error("Product already created by this plan name!");
    }
    const product = await productService.createProduct(
      reqBody
    );
    if (!product) {
      throw new Error("Something went wrong, please try again or later!");
    }
    res.status(200).json({
      success: true,
      message: "Product create successfully!",
      product,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/** Get product list */
const getProductList = async (req, res) => {
  try {
    const { search, ...options } = req.query;
    let filter = {};

    if (search) {
      filter.$or = [
        { first_name: { $regex: search, $options: "i" } },
        { last_name: { $regex: search, $options: "i" } },
      ];
    }

    const product = await productService.getProductList(
      filter,
      options
    );

    res.status(200).json([...product]);
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/** Get product details by id */
const getProductById = async (req, res) => {
  try {
    const product = await productService.getProductById(
      req.params.productId
    );
    if (!getDetails) {
      throw new Error("Product not found!");
    }

    res.status(200).json({
      success: true,
      message: "Product details get successfully!",
      product,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/** product details update by id */
const updateProduct = async (req, res) => {
  try {
    const reqBody = req.body;
    const productId = req.params.productId;
    const productExists = await productService.getProductById(
      productId
    );
    if (!productExists) {
      throw new Error("Product not found!");
    }
    await productService.updateProduct(productId, req.body);
    const product = await productService.getProductById(
      productId
    );
    res.status(200).json({
      success: true,
      message: "Product details update successfully!",
      product,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/** Delete product */
const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.productId;
    const productExists = await productService.getProductById(
      productId
    );
    if (!productExists) {
      throw new Error("Product not found!");
    }

    const deletedProduct = await productService.deleteProduct(
      productId
    );
    res.status(200).json({
      success: true,
      message: "Product delete successfully!",
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = {
  createProduct,
  getProductList,
  getProductById,
  updateProduct,
  deleteProduct,
};
