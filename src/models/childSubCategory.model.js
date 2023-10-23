const mongoose = require("mongoose");
const config=require('../config/config')
const {FILES_FOLDER}=require('../helpers/constant.helper')
const { toJSON, paginate } = require('./plugins');


const childSubCategorySchema = new mongoose.Schema(
  {
    childSubCategory_name: {
      type: String,
      trim: true,
    },
    childSubCategory_heading: {
      type: String,
      trim: true,
    },
    childSubCategory_description: {
      type: String,
      trim: true,
    },
    childSubCategory_image: {
      type: String,
      trim: true,
    },
    subCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "subCategory",
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
        data.childSubCategory_image = data.childSubCategory_image
                    ? `${config.image_url}/${FILES_FOLDER.childSubCategory_img}/${data.childSubCategory_image}`
                    : `${config.base_url}/default/default-image.jpg`;
      },
    },
  }
);

// add plugin that converts mongoose to json
childSubCategorySchema.plugin(toJSON);

const childSubCategory = mongoose.model("childSubCategory", childSubCategorySchema);
module.exports = childSubCategory;
