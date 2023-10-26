const { subCategoryService } = require("../services");
const fs = require("fs");
const { s3Delete, s3PutObject } = require("../services/awsS3.service");
const { FILES_FOLDER } = require("../helpers/constant.helper");

/** create subCategory */
const createSubCategory = async (req, res) => {
  try {
    const reqBody = req.body;
    if (req.file) {
      reqBody.subCategory_image = req.file.filename;
    } else {
      throw new Error("subCategory_image please enter image!");
    }
    const subCategoryExists = await subCategoryService.getSubCategoryByName(
      reqBody.subCategory_name
    );
    if (subCategoryExists) {
      throw new Error("SubCategory already created by this name!");
    }
    const subCategory = await subCategoryService.createSubCategory(
      reqBody,
      req.file
    );
    if (!subCategory) {
      throw new Error("Something went wrong, please try again or later!");
    }
    res.status(200).json({
      success: true,
      message: "SubCategory create successfully!",
      subCategory,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/** Get subCategory list */
const getSubCategoryList = async (req, res) => {
  try {
    const { search, ...options } = req.query;
    let filter = {};

    if (search) {
      filter.$or = [
        { first_name: { $regex: search, $options: "i" } },
        { last_name: { $regex: search, $options: "i" } },
      ];
    }

    const subCategory = await subCategoryService.getSubCategoryList(
      filter,
      options
    );

    res.status(200).json([...subCategory]);
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/** Get subCategory details by id */
const getSubCategoryById = async (req, res) => {
  try {
    const subCategory = await subCategoryService.getSubCategoryById(
      req.params.subCategoryId
    );
    if (!getDetails) {
      throw new Error("SubCategory not found!");
    }

    res.status(200).json({
      success: true,
      message: "SubCategory details get successfully!",
      subCategory,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/** subCategory details update by id */
const updateSubCategory = async (req, res) => {
  try {
    const reqBody = req.body;
    const subCategoryId = req.params.subCategoryId;
    const subCategoryExists = await subCategoryService.getSubCategoryById(
      subCategoryId
    );
    if (!subCategoryExists) {
      throw new Error("SubCategory not found!");
    }
    if (req.file) {
      reqBody.subCategory_image = req.file.filename;
    }
    await subCategoryService.updateSubCategory(subCategoryId, req.body);

    await s3PutObject(
        `${FILES_FOLDER.subCategory_img}/${subCategoryExists.subCategory_image}`,
        req.file.buffer
    );
    const subCategory = await subCategoryService.getSubCategoryById(
      subCategoryId
    );

    res.status(200).json({
      success: true,
      message: "SubCategory details update successfully!",
      subCategory,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/** Delete subCategory */
const deleteSubCategory = async (req, res) => {
  try {
    const subCategoryId = req.params.subCategoryId;
    const subCategoryExists = await subCategoryService.getSubCategoryById(
      subCategoryId
    );
    if (!subCategoryExists) {
      throw new Error("SubCategory not found!");
    }

    const deletedSubCategory = await subCategoryService.deleteSubCategory(
      subCategoryId
    );
    await s3Delete(
      `${FILES_FOLDER.subCategory_img}/${subCategoryExists.subCategory_image}`
    );

    res.status(200).json({
      success: true,
      message: "SubCategory delete successfully!",
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = {
  createSubCategory,
  getSubCategoryList,
  getSubCategoryById,
  updateSubCategory,
  deleteSubCategory,
};
