const { subCategoryService } = require("../services");
const fs = require("fs");
/** create subCategory */
const createSubCategory = async (req, res) => {
  try {
    const reqBody = req.body;
    if (req.file) {
      reqBody.subCategory_image = req.file.filename;
    } else {
      const filePath = `I:/houseplan/src/public/subCategory_image/${reqBody.subCategory_image}`; //note path should be absolute
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
      throw new Error("SubCategory already created by this name!");
    }

    const subCategoryExists = await subCategoryService.getSubCategoryByName(
      reqBody.subCategory_name
    );
    if (subCategoryExists) {
      const filePath = `I:/houseplan/src/public/subCategory_image/${reqBody.subCategory_image}`; //note path should be absolute
      console.log(filePath);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
      throw new Error("SubCategory already created by this name!");
    }
    const subCategory = await subCategoryService.createSubCategory(reqBody);
    if (!subCategory) {
      throw new Error("Something went wrong, please try again or later!");
    }

    res.status(200).json({
      success: true,
      message: "SubCategory create successfully!",
      data: { subCategory },
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

    const getList = await subCategoryService.getSubCategoryList(
      filter,
      options
    );

    res.status(200).json({
      success: true,
      message: "Get subCategory list successfully!",
      data: getList,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/** Get subCategory details by id */
const getSubCategoryById = async (req, res) => {
  try {
    const getDetails = await subCategoryService.getSubCategoryById(
      req.params.subCategoryId
    );
    if (!getDetails) {
      throw new Error("SubCategory not found!");
    }

    res.status(200).json({
      success: true,
      message: "SubCategory details get successfully!",
      data: getDetails,
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
    const subCategoryName = await subCategoryService.getSubCategoryByName(
      reqBody.subCategory_name
    );
    if (subCategoryName) {
      const filePath = `I:/houseplan/src/public/subCategory_image/${reqBody.subCategory_image}`;
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
      throw new Error("SubCategory already created by this name!");
    }

    if (req.file) {
      reqBody.subCategory_image = req.file.filename;
    }
    const updatedSubCategory = await subCategoryService.updateSubCategory(
      subCategoryId,
      req.body
    );

    res.status(200).json({
      success: true,
      message: "SubCategory details update successfully!",
      data: updatedSubCategory,
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
    if (deletedSubCategory) {
      const filePath = `I:/houseplan/src/public/subCategory_image/${subCategoryExists.subCategory_image}`; //note path should be absolute
      console.log(filePath);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    } else {
      throw new Error("Something went wrong, please try again or later!");
    }

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
