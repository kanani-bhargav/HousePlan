const { productImagesService } = require("../services");
const fs = require("fs");
const { s3Delete, s3PutObject ,s3Upload} = require("../services/awsS3.service");
const { FILES_FOLDER } = require("../helpers/constant.helper");
const { log } = require("console");

/** create productImages */
const createProductImages = async (req, res) => {
  try {
    const reqBody = req.body;
    const productImagesAll = req.files;

    if (!productImagesAll || productImagesAll.length <= 6) {
      throw new Error(" images are required. Please upload at all image.");
    }
    const productImages = await productImagesService.createProductImages(reqBody, productImagesAll);

    if (!productImages) {
      throw new Error("Something went wrong. Please try again later.");
    }

    res.status(200).json({
      success: true,
      message: "Subcategory created successfully!",
      productImages,
    });
  } catch (error) {
    console.log('File: productImages.controller.js', 'Line 29:', error);
    res.status(400).json({ success: false, message: error.message });
  }
};

/** Get productImages list */
const getProductImagesList = async (req, res) => {
  try {
    const { search, ...options } = req.query;
    let filter = {};

    if (search) {
      filter.$or = [
        { first_name: { $regex: search, $options: "i" } },
        { last_name: { $regex: search, $options: "i" } },
      ];
    }

    const productImages = await productImagesService.getProductImagesList(filter, options);

    res.status(200).json([...productImages]);
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/** Get productImages details by id */
const getProductImagesById = async (req, res) => {
  try {
    const productImages = await productImagesService.getProductImagesById(req.params.productImagesId);
    if (!getDetails) {
      throw new Error("ProductImages not found!");
    }

    res.status(200).json({
      success: true,
      message: "ProductImages details get successfully!",
      productImages,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/** productImages details update by id */
const updateProductImages = async (req, res) => {
  try {
    const reqBody = req.body;
    const productImagesId = req.params.productImagesId;
    const productImagesAll = req.files;

    if (!productImagesAll || productImagesAll.length <= 6) {
      throw new Error(" images are required. Please upload at all image.");
    }
    const productImagesExists = await productImagesService.getProductImagesById(productImagesId);
    if (!productImagesExists) {
      throw new Error("ProductImages not found!");
    }
    await productImagesService.updateProductImages(productImagesId, req.body);

    await s3PutObject(
      `${FILES_FOLDER.product_images}/${productImagesExists.product_image_1}`,
      productImagesAll.product_image_1[0].buffer
    );
    await s3PutObject(
      `${FILES_FOLDER.product_images}/${productImagesExists.product_image_2}`,
      productImagesAll.product_image_2[0].buffer
    );
    await s3PutObject(
      `${FILES_FOLDER.product_images}/${productImagesExists.product_image_3}`,
      productImagesAll.product_image_3[0].buffer
    );
    await s3PutObject(
      `${FILES_FOLDER.product_images}/${productImagesExists.product_image_4}`,
      productImagesAll.product_image_4[0].buffer
    );
    await s3PutObject(
      `${FILES_FOLDER.product_images}/${productImagesExists.floorPlan_1}`,
      productImagesAll.floorPlan_1[0].buffer
    );
    await s3PutObject(
      `${FILES_FOLDER.product_images}/${productImagesExists.floorPlan_2}`,
      productImagesAll.floorPlan_2[0].buffer
    );
    const productImagesUpdate = await productImagesService.getProductImagesById(productImagesId);

    res.status(200).json({
      success: true,
      message: "ProductImages details update successfully!",
      productImagesUpdate,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/** Delete productImages */
const deleteProductImages = async (req, res) => {
  try {
    const productImagesId = req.params.productImagesId;
    const productImagesExists = await productImagesService.getProductImagesById(productImagesId);
    if (!productImagesExists) {
      throw new Error("ProductImages not found!");
    }

    const deletedProductImages = await productImagesService.deleteProductImages(productImagesId);
    await s3Delete(
      `${FILES_FOLDER.product_images}/${productImagesExists.product_image_1}`
    );
    await s3Delete(
      `${FILES_FOLDER.product_images}/${productImagesExists.product_image_2}`
    );
    await s3Delete(
      `${FILES_FOLDER.product_images}/${productImagesExists.product_image_3}`
    );
    await s3Delete(
      `${FILES_FOLDER.product_images}/${productImagesExists.product_image_4}`
    );
    await s3Delete(
      `${FILES_FOLDER.product_images}/${productImagesExists.floorPlan_1}`
    );
    await s3Delete(
      `${FILES_FOLDER.product_images}/${productImagesExists.floorPlan_2}`
    );

    res.status(200).json({
      success: true,
      message: "ProductImages delete successfully!",
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = {
  createProductImages,
  getProductImagesList,
  getProductImagesById,
  updateProductImages,
  deleteProductImages,
};
