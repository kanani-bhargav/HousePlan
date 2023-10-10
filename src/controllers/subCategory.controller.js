const { subCategoryService } = require("../services");

/** create subCategory */
const createSubCategory = async (req, res) => {
  try {
    const reqBody = req.body;

    const subCategoryExists = await subCategoryService.getSubCategoryByName(reqBody.subCategory_name);
    if (subCategoryExists) {
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

    const getList = await subCategoryService.getSubCategoryList(filter, options);

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
const getSubCategoryDetails = async (req, res) => {
  try {
    const getDetails = await subCategoryService.getSubCategoryById(req.params.subCategoryId);
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
const updateSubCategoryDetails = async (req, res) => {
  try {

    const reqBody = req.body;
    const subCategoryId = req.params.subCategoryId;
    const subCategoryExists = await subCategoryService.getSubCategoryById(subCategoryId);
    if (!subCategoryExists) {
      throw new Error("SubCategory not found!");
    }
    const subCategoryName = await subCategoryService.getSubCategoryByName(reqBody.subCategory_name);
    if (subCategoryName) {
      throw new Error("SubCategory already created by this name!");
    }

    await subCategoryService.updateSubCategoryDetails(subCategoryId, req.body);

    res
      .status(200)
      .json({ success: true, message: "SubCategory details update successfully!" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/** Delete subCategory */
const deleteSubCategory = async (req, res) => {
  try {
    const subCategoryId = req.params.subCategoryId;
    const subCategoryExists = await subCategoryService.getSubCategoryById(subCategoryId);
    if (!subCategoryExists) {
      throw new Error("SubCategory not found!");
    }

    await subCategoryService.deleteSubCategory(subCategoryId);

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
  getSubCategoryDetails,
  updateSubCategoryDetails,
  deleteSubCategory,
};