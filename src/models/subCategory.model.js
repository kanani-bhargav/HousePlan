const mongoose = require("mongoose");
const config=require('../config/config')

const categorySchema = new mongoose.Schema(
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
        if (data?.subCategory_image) {
          data.subCategory_image = `${config.base_url}/subCategory_image/${data.subCategory_image}`;
        }
      },
    },
  }
);

const subCategory = mongoose.model("subCategory", categorySchema);
module.exports = subCategory;
