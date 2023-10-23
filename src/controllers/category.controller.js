const { categoryService } = require("../services");

/** create category */
const createCategory = async (req, res) => {
  try {
    const reqBody = req.body;
    const categoryExists = await categoryService.getCategoryByName(
      reqBody.category_name
    );
    if (categoryExists) {
      throw new Error("Category already created by this name!");
    }
    const category = await categoryService.createCategory(reqBody);
    if (!category) {
      throw new Error("Something went wrong, please try again or later!");
    }
    res.status(200).json({
      success: true,
      message: "Category create successfully!",
      category,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/** Get category list */
const getCategoryList = async (req, res) => {
  try {
    const { search, ...options } = req.query;
    let filter = {};

    if (search) {
      filter.$or = [
        { first_name: { $regex: search, $options: "i" } },
        { last_name: { $regex: search, $options: "i" } },
      ];
    }

    const category = await categoryService.getCategoryList(filter, options);

    res.status(200).json({
      success: true,
      message: "Get category list successfully!",
      category,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/** Get category details by id */
const getCategoryById = async (req, res) => {
  try {
    const category = await categoryService.getCategoryById(
      req.params.categoryId
    );
    if (!getDetails) {
      throw new Error("Category not found!");
    }

    res.status(200).json({
      success: true,
      message: "Category details get successfully!",
      category,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/** category details update by id */
const updateCategory = async (req, res) => {
  try {
    const reqBody = req.body;
    const categoryId = req.params.categoryId;
    const categoryExists = await categoryService.getCategoryById(categoryId);
    if (!categoryExists) {
      throw new Error("Category not found!");
    }

    const updatedCategory = await categoryService.updateCategory(
      categoryId,
      req.body
    );

    const category = await categoryService.getCategoryById(categoryId);
    res.status(200).json({
      success: true,
      message: "Category details update successfully!",
      category,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/** Delete category */
const deleteCategory = async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const categoryExists = await categoryService.getCategoryById(categoryId);
    if (!categoryExists) {
      throw new Error("Category not found!");
    }

    await categoryService.deleteCategory(categoryId);

    res.status(200).json({
      success: true,
      message: "Category delete successfully!",
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = {
  createCategory,
  getCategoryList,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
