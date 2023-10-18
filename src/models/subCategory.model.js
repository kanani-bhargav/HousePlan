const mongoose = require("mongoose");
const config=require('../config/config')
const {FILES_FOLDER}=require('../helpers/constant.helper')
const { toJSON, paginate } = require('./plugins');



const subCategorySchema = new mongoose.Schema(
  {
    subCategory_name: {
      type: String,
      trim: true,
    },
    subCategory_heading: {
      type: String,
      trim: true,
    },
    subCategory_description: {
      type: String,
      trim: true,
    },
    subCategory_image: {
      type: String,
      trim: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
    },
    is_active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      transform: function (doc, data) {
        data.category_image = data.category_image
                    ? `${config.image_url}${FILES_FOLDER.categoryImage}/${data.category_image}`
                    : `${config.base_url}/default/default-image.jpg`;
      },
    },
  }
);

// add plugin that converts mongoose to json
subCategorySchema.plugin(toJSON);
// subCategorySchema.plugin(paginate);

const subCategory = mongoose.model("subCategory", subCategorySchema);
module.exports = subCategory;
