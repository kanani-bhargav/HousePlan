const { productService } = require("../services");
const fs = require("fs");
const { s3Delete, s3PutObject } = require("../services/awsS3.service");
const { FILES_FOLDER } = require("../helpers/constant.helper");

/** create product */
const createProduct = async (req, res) => {
  try {
    const reqBody = req.body;
    const productImages = req.files;

    if (!productImages || productImages.length === 0) {
      throw new Error("Product images are required. Please upload at least one image.");
    }

    // Map the file names from the uploaded images
    // const productImageNames = productImages.map(file => file.filename);

    // const productExists = await productService.getProductByName(reqBody.product_name);
    // if (productExists) {
    //   throw new Error("Product with this name already exists.");
    // }

    const product = await productService.createProduct(reqBody, productImages);

    if (!product) {
      throw new Error("Something went wrong. Please try again later.");
    }

    res.status(200).json({
      success: true,
      message: "Product created successfully!",
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
    if (req.file) {
      reqBody.product_image = req.file.filename;
    }
    await productService.updateProduct(productId, req.body);

    await s3PutObject(
        `${FILES_FOLDER.product_img}/${productExists.product_image}`,
        req.file.buffer
    );
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
    await s3Delete(
      `${FILES_FOLDER.product_img}/${productExists.product_image}`
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
