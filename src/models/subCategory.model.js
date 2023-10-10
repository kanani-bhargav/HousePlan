const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    subCategory_name: {
      type: String,
      trim: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "categories",
    },
    is_active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const subCategory = mongoose.model("subcategories", categorySchema);
module.exports = subCategory;
