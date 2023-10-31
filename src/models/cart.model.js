const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    total: {
      type: String,
      trim: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
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

const Cart = mongoose.model("cart", cartSchema);
module.exports = Cart;
