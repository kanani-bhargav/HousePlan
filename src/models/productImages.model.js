const mongoose = require("mongoose");
const config = require("../config/config");
const { FILES_FOLDER } = require("../helpers/constant.helper");
const { toJSON, paginate } = require("./plugins");

const productImagesSchema = new mongoose.Schema(
  {
    product_image_1: {
      type: String,
      trim: true,
    },
    product_image_2: {
      type: String,
      trim: true,
    },
    product_image_3: {
      type: String,
      trim: true,
    },
    product_image_4: {
      type: String,
      trim: true,
    },
    floorPlan_1: {
      type: String,
      trim: true,
    },
    floorPlan_2: {
      type: String,
      trim: true,
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
        data.product_image_1 = data.product_image_1
          ? `${config.image_url}/${FILES_FOLDER.product_images}/${data.product_image_1}`
          : `${config.base_url}/default/default-image.jpg`;
        data.product_image_2 = data.product_image_2
          ? `${config.image_url}/${FILES_FOLDER.product_images}/${data.product_image_2}`
          : `${config.base_url}/default/default-image.jpg`;
        data.product_image_3 = data.product_image_3
          ? `${config.image_url}/${FILES_FOLDER.product_images}/${data.product_image_3}`
          : `${config.base_url}/default/default-image.jpg`;
        data.product_image_4 = data.product_image_4
          ? `${config.image_url}/${FILES_FOLDER.product_images}/${data.product_image_4}`
          : `${config.base_url}/default/default-image.jpg`;
        data.floorPlan_1 = data.floorPlan_1
          ? `${config.image_url}/${FILES_FOLDER.product_images}/${data.floorPlan_1}`
          : `${config.base_url}/default/default-floor-plan.jpg`;
        data.floorPlan_2 = data.floorPlan_2
          ? `${config.image_url}/${FILES_FOLDER.product_images}/${data.floorPlan_2}`
          : `${config.base_url}/default/default-floor-plan.jpg`;
      },
    },
  }
);

// add plugin that converts mongoose to json
productImagesSchema.plugin(toJSON);
// subCategorySchema.plugin(paginate);

const productImages = mongoose.model("productImages", productImagesSchema);
module.exports = productImages;
