const { childSubCategoryService } = require("../services");
const fs = require("fs");
const { s3Delete, s3PutObject } = require("../services/awsS3.service");
const { FILES_FOLDER } = require("../helpers/constant.helper");

/** create childSubCategory */
const createChildSubCategory = async (req, res) => {
  try {
    const reqBody = req.body;
    if (req.file) {
      reqBody.childSubCategory_image = req.file.filename;
    } else {
      throw new Error("childSubCategory_image please enter image!");
    }
    const childSubCategoryExists = await childSubCategoryService.getChildSubCategoryByName(
      reqBody.childSubCategory_name
    );
    if (childSubCategoryExists) {
      throw new Error("ChildSubCategory already created by this name!");
    }
    const childSubCategory = await childSubCategoryService.createChildSubCategory(
      reqBody,
      req.file
    );
    if (!childSubCategory) {
      throw new Error("Something went wrong, please try again or later!");
    }
    res.status(200).json({
      success: true,
      message: "ChildSubCategory create successfully!",
      childSubCategory,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/** Get childSubCategory list */
const getChildSubCategoryList = async (req, res) => {
  try {
    const { search, ...options } = req.query;
    let filter = {};

    if (search) {
      filter.$or = [
        { first_name: { $regex: search, $options: "i" } },
        { last_name: { $regex: search, $options: "i" } },
      ];
    }

    const childSubCategory = await childSubCategoryService.getChildSubCategoryList(
      filter,
      options
    );

    res.status(200).json({
      success: true,
      message: "Get childSubCategory list successfully!",
      childSubCategory,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/** Get childSubCategory details by id */
const getChildSubCategoryById = async (req, res) => {
  try {
    const childSubCategory = await childSubCategoryService.getChildSubCategoryById(
      req.params.childSubCategoryId
    );
    if (!getDetails) {
      throw new Error("ChildSubCategory not found!");
    }

    res.status(200).json({
      success: true,
      message: "ChildSubCategory details get successfully!",
      childSubCategory,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/** childSubCategory details update by id */
const updateChildSubCategory = async (req, res) => {
  try {
    const reqBody = req.body;
    const childSubCategoryId = req.params.childSubCategoryId;
    const childSubCategoryExists = await childSubCategoryService.getChildSubCategoryById(
      childSubCategoryId
    );
    if (!childSubCategoryExists) {
      throw new Error("ChildSubCategory not found!");
    }
    if (req.file) {
      reqBody.childSubCategory_image = req.file.filename;
    }
    await childSubCategoryService.updateChildSubCategory(childSubCategoryId, req.body);

    await s3PutObject(
        `${FILES_FOLDER.childSubCategory_img}/${childSubCategoryExists.childSubCategory_image}`,
        req.file.buffer
    );
    const childSubCategory = await childSubCategoryService.getChildSubCategoryById(
      childSubCategoryId
    );

    res.status(200).json({
      success: true,
      message: "ChildSubCategory details update successfully!",
      childSubCategory,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/** Delete childSubCategory */
const deleteChildSubCategory = async (req, res) => {
  try {
    const childSubCategoryId = req.params.childSubCategoryId;
    const childSubCategoryExists = await childSubCategoryService.getChildSubCategoryById(
      childSubCategoryId
    );
    if (!childSubCategoryExists) {
      throw new Error("ChildSubCategory not found!");
    }

    const deletedChildSubCategory = await childSubCategoryService.deleteChildSubCategory(
      childSubCategoryId
    );
    await s3Delete(
      `${FILES_FOLDER.childSubCategory_img}/${childSubCategoryExists.childSubCategory_image}`
    );

    res.status(200).json({
      success: true,
      message: "ChildSubCategory delete successfully!",
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = {
  createChildSubCategory,
  getChildSubCategoryList,
  getChildSubCategoryById,
  updateChildSubCategory,
  deleteChildSubCategory,
};
