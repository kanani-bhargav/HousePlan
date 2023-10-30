const mongoose = require("mongoose");
const config = require("../config/config");
const { FILES_FOLDER } = require("../helpers/constant.helper");
const { toJSON, paginate } = require("./plugins");

const productSchema = new mongoose.Schema(
  {
    plan: {
      type: String,
      trim: true,
    },
    plan_description: {
      type: String,
      trim: true,
    },
    basic_features: {
      bedrooms: { type: Number },
      baths: { type: Number },
      stories: { type: Number },
      garages: { type: Number },
    },
    dimension: {
      depth: { type: String, trim: true },
      height: { type: String, trim: true },
      width: { type: String, trim: true },
    },
    area: {
      total: { type: Number },
      decks: { type: Number },
      garage: { type: Number },
      lower_floor: { type: Number },
      main_floor: { type: Number },
      patios: { type: Number },
      upper_floor: { type: Number },
    },
    ceiling: {
      ceiling_details: { type: String, trim: true },
      main_ceiling: { type: String, trim: true },
      upper_ceiling: { type: String, trim: true },
      additional_ceiling: { type: String, trim: true },
    },
    roof: {
      primary_pitch: { type: String, trim: true },
      roof_framing: { type: String, trim: true },
      roof_load: { type: String, trim: true },
      roof_type: { type: String, trim: true },
    },
    exterior_wall_framing: {
      framing: { type: String, trim: true },
      insulation: { type: String, trim: true },
    },
    bedroom_features: {
      bedroom_feature_1: { type: String, trim: true },
      bedroom_feature_2: { type: String, trim: true },
      bedroom_feature_3: { type: String, trim: true },
      bedroom_feature_4: { type: String, trim: true },
    },
    kitchen_features: {
      kitchen_feature_1: { type: String, trim: true },
      kitchen_feature_2: { type: String, trim: true },
      kitchen_feature_3: { type: String, trim: true },
      kitchen_feature_4: { type: String, trim: true },
    },
    additional_room_features: {
      additional_room_feature_1: { type: String, trim: true },
      additional_room_feature_2: { type: String, trim: true },
      additional_room_feature_3: { type: String, trim: true },
      additional_room_feature_4: { type: String, trim: true },
    },
    garage_features: {
      garage_feature_1: { type: String, trim: true },
      garage_feature_2: { type: String, trim: true },
      garage_feature_3: { type: String, trim: true },
      garage_feature_4: { type: String, trim: true },
    },
    outdoor_spaces: {
      outdoor_space_1: { type: String, trim: true },
      outdoor_space_2: { type: String, trim: true },
      outdoor_space_3: { type: String, trim: true },
      outdoor_space_4: { type: String, trim: true },
    },
    more: {
      more_detail_1: { type: String, trim: true },
      more_detail_2: { type: String, trim: true },
    },
    plan_options:[{
      plan_set:{type:String,trim:true},
      plan_price:{type:Number,default:0},
      plan_description:{type:String,trim:true},
    }],
    foundation_options:[{
      plan_set:{type:String,trim:true},
      plan_price:{type:Number,default:0},
      plan_description:{type:String,trim:true},
    }],
    framing_options:[{
      plan_set:{type:String,trim:true},
      plan_price:{type:Number,default:0},
      plan_description:{type:String,trim:true},
    }],
    additional_options:[{
      plan_set:{type:String,trim:true},
      plan_price:{type:Number,default:0},
      plan_description:{type:String,trim:true},
    }],
    product_images: [
      {
        type: String,
        trim: true,
      },
    ],
    childSubCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "childSubCategory",
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
        if (data.product_images && data.product_images.length > 0) {
          data.product_images = data.product_images.map((image) => ({
            product_image: `${config.image_url}/${FILES_FOLDER.product_images}/${image}`,
          }));
        }
      },
    },
  }
);

// add plugin that converts mongoose to json
productSchema.plugin(toJSON);
// subCategorySchema.plugin(paginate);

const Product = mongoose.model("product", productSchema);
module.exports = Product;
