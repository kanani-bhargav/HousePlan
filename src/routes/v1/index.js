const express = require("express");
const tokenRoutes = require("./token.route");
const userRoute = require("./user.route");
const productRoute = require("./product.route");
const categoryRoute = require("./category.route");
const subCategoryRoute = require("./subCategory.route");

const router = express.Router();

router.use("/token", tokenRoutes);
router.use("/user", userRoute);;
router.use("/product", productRoute);
router.use("/category", categoryRoute);
router.use("/subCategory", subCategoryRoute);

module.exports = router;