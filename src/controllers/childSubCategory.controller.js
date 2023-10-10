const { childSubCategoryService } = require("../services");
const fs = require("fs");
/** create childSubCategory */
const createChildSubCategory = async (req, res) => {
  try {
    const reqBody = req.body;
    if (req.file) {
      reqBody.childSubCategory_image = req.file.filename;
    } else {
      const filePath = `I:/houseplan/src/public/childSubCategory_image/${reqBody.childSubCategory_image}`; //note path should be absolute
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
      throw new Error("ChildSubCategory already created by this name!");
    }

    const childSubCategoryExists =
      await childSubCategoryService.getChildSubCategoryByName(
        reqBody.childSubCategory_name
      );
    if (childSubCategoryExists) {
      const filePath = `I:/houseplan/src/public/childSubCategory_image/${reqBody.childSubCategory_image}`; //note path should be absolute
      console.log(filePath);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
      throw new Error("ChildSubCategory already created by this name!");
    }
    const childSubCategory =
      await childSubCategoryService.createChildSubCategory(reqBody);
    if (!childSubCategory) {
      throw new Error("Something went wrong, please try again or later!");
    }

    res.status(200).json({
      success: true,
      message: "ChildSubCategory create successfully!",
      data: { childSubCategory },
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

    const getList = await childSubCategoryService.getChildSubCategoryList(
      filter,
      options
    );

    res.status(200).json({
      success: true,
      message: "Get childSubCategory list successfully!",
      data: getList,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/** Get childSubCategory details by id */
const getChildSubCategoryById = async (req, res) => {
  try {
    const getDetails = await childSubCategoryService.getChildSubCategoryById(
      req.params.childSubCategoryId
    );
    if (!getDetails) {
      throw new Error("ChildSubCategory not found!");
    }

    res.status(200).json({
      success: true,
      message: "ChildSubCategory details get successfully!",
      data: getDetails,
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
    const childSubCategoryExists =
      await childSubCategoryService.getChildSubCategoryById(childSubCategoryId);
    if (!childSubCategoryExists) {
      throw new Error("ChildSubCategory not found!");
    }
    const childSubCategoryName =
      await childSubCategoryService.getChildSubCategoryByName(
        reqBody.childSubCategory_name
      );
    if (childSubCategoryName) {
      const filePath = `I:/houseplan/src/public/childSubCategory_image/${reqBody.childSubCategory_image}`;
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
      throw new Error("ChildSubCategory already created by this name!");
    }

    if (req.file) {
      reqBody.childSubCategory_image = req.file.filename;
    }
    const updatedChildSubCategory =
      await childSubCategoryService.updateChildSubCategory(
        childSubCategoryId,
        req.body
      );

    res.status(200).json({
      success: true,
      message: "ChildSubCategory details update successfully!",
      data: updatedChildSubCategory,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/** Delete childSubCategory */
const deleteChildSubCategory = async (req, res) => {
  try {
    const childSubCategoryId = req.params.childSubCategoryId;
    const childSubCategoryExists =
      await childSubCategoryService.getChildSubCategoryById(childSubCategoryId);
    if (!childSubCategoryExists) {
      throw new Error("ChildSubCategory not found!");
    }

    const deletedChildSubCategory =
      await childSubCategoryService.deleteChildSubCategory(childSubCategoryId);
    if (deletedChildSubCategory) {
      const filePath = `I:/houseplan/src/public/childSubCategory_image/${childSubCategoryExists.childSubCategory_image}`; //note path should be absolute
      console.log(filePath);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    } else {
      throw new Error("Something went wrong, please try again or later!");
    }

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
