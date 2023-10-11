const mongoose = require("mongoose");
const config=require('../config/config')

const categorySchema = new mongoose.Schema(
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
        if (data?.childSubCategory_image) {
          data.childSubCategory_image = `${config.base_url}/childSubCategory_image/${data.childSubCategory_image}`;
        }
      },
    },
  }
);

const childSubCategory = mongoose.model("childSubCategory", categorySchema);
module.exports = childSubCategory;
