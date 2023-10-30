const Joi = require("joi");
const optionSchema = Joi.object({
  plan_set: Joi.string().trim().required(),
  plan_price: Joi.number().default(0),
  plan_description: Joi.string().trim().required(),
});

/** Create product */
const createProduct = {
  body: Joi.object({
    plan: Joi.string().trim().required(),
    plan_description: Joi.string().trim().required(),
    basic_features: Joi.object({
      bedrooms: Joi.number().integer().min(0).required(),
      baths: Joi.number().min(0).required(),
      stories: Joi.number().integer().min(0).required(),
      garages: Joi.number().integer().min(0).required(),
    }),
    dimension: Joi.object({
      depth: Joi.string().trim().required(),
      height: Joi.string().trim().required(),
      width: Joi.string().trim().required(),
    }),
    area: Joi.object({
      total: Joi.number().required(),
      decks: Joi.number().required(),
      garage: Joi.number().required(),
      lower_floor: Joi.number().required(),
      main_floor: Joi.number().required(),
      patios: Joi.number().required(),
      upper_floor: Joi.number().required(),
    }),
    ceiling: Joi.object({
      ceiling_details: Joi.string().trim().required(),
      main_ceiling: Joi.string().trim().required(),
      upper_ceiling: Joi.string().trim().required(),
      additional_ceiling: Joi.string().trim().required(),
    }),
    roof: Joi.object({
      primary_pitch: Joi.string().trim().required(),
      roof_framing: Joi.string().trim().required(),
      roof_load: Joi.string().trim().required(),
      roof_type: Joi.string().trim().required(),
    }),
    exterior_wall_framing: Joi.object({
      framing: Joi.string().trim().required(),
      insulation: Joi.string().trim().required(),
    }),
    bedroom_features: Joi.object({
      bedroom_feature_1: Joi.string().trim().required(),
      bedroom_feature_2: Joi.string().trim().allow(),
      bedroom_feature_3: Joi.string().trim().allow(),
      bedroom_feature_4: Joi.string().trim().allow(),
    }),
    kitchen_features: Joi.object({
      kitchen_feature_1: Joi.string().trim().required(),
      kitchen_feature_2: Joi.string().trim().allow(),
      kitchen_feature_3: Joi.string().trim().allow(),
      kitchen_feature_4: Joi.string().trim().allow(),
    }),
    additional_room_features: Joi.object({
      additional_room_feature_1: Joi.string().trim().required(),
      additional_room_feature_2: Joi.string().trim().allow(),
      additional_room_feature_3: Joi.string().trim().allow(),
      additional_room_feature_4: Joi.string().trim().allow(),
    }),
    garage_features: Joi.object({
      garage_feature_1: Joi.string().trim().required(),
      garage_feature_2: Joi.string().trim().allow(),
      garage_feature_3: Joi.string().trim().allow(),
      garage_feature_4: Joi.string().trim().allow(),
    }),
    outdoor_spaces: Joi.object({
      outdoor_space_1: Joi.string().trim().required(),
      outdoor_space_2: Joi.string().trim().allow(),
      outdoor_space_3: Joi.string().trim().allow(),
      outdoor_space_4: Joi.string().trim().allow(),
    }),
    more: Joi.object({
      more_detail_1: Joi.string().trim().allow(),
      more_detail_2: Joi.string().trim().allow(),
    }),
    plan_options: Joi.array().items(optionSchema),
    foundation_options: Joi.array().items(optionSchema),
    framing_options: Joi.array().items(optionSchema),
    additional_options: Joi.array().items(optionSchema),
    childSubCategory: Joi.string().trim().required(),
    subCategory: Joi.string().trim().required(),
    productImages: Joi.string().trim().required(),
  }),
};

/** Get product details */
const getDetails = {
  params: Joi.object({
    productId: Joi.string().required().trim(),
  }),
};

/** Get production list */
const getList = {
  query: Joi.object({
    search: Joi.string().trim().allow(""),
    sortBy: Joi.string().trim().allow(""),
    limit: Joi.number().integer().allow("").default(10),
    page: Joi.number().integer().allow("").default(1),
  }),
};

/** Update product details */
const updateProduct = {
  params: Joi.object({
    productId: Joi.string().required().trim(),
  }),
  body: Joi.object({
    plan: Joi.string().trim().required(),
    plan_description: Joi.string().trim().required(),
    basic_features: Joi.object({
      bedrooms: Joi.number().integer().min(0).required(),
      baths: Joi.number().min(0).required(),
      stories: Joi.number().integer().min(0).required(),
      garages: Joi.number().integer().min(0).required(),
    }),
    dimension: Joi.object({
      depth: Joi.string().trim().required(),
      height: Joi.string().trim().required(),
      width: Joi.string().trim().required(),
    }),
    area: Joi.object({
      total: Joi.number().required(),
      decks: Joi.number().required(),
      garage: Joi.number().required(),
      lower_floor: Joi.number().required(),
      main_floor: Joi.number().required(),
      patios: Joi.number().required(),
      upper_floor: Joi.number().required(),
    }),
    ceiling: Joi.object({
      ceiling_details: Joi.string().trim().required(),
      main_ceiling: Joi.string().trim().required(),
      upper_ceiling: Joi.string().trim().required(),
      additional_ceiling: Joi.string().trim().required(),
    }),
    roof: Joi.object({
      primary_pitch: Joi.string().trim().required(),
      roof_framing: Joi.string().trim().required(),
      roof_load: Joi.string().trim().required(),
      roof_type: Joi.string().trim().required(),
    }),
    exterior_wall_framing: Joi.object({
      framing: Joi.string().trim().required(),
      insulation: Joi.string().trim().required(),
    }),
    bedroom_features: Joi.object({
      bedroom_feature_1: Joi.string().trim().required(),
      bedroom_feature_2: Joi.string().trim().allow(),
      bedroom_feature_3: Joi.string().trim().allow(),
      bedroom_feature_4: Joi.string().trim().allow(),
    }),
    kitchen_features: Joi.object({
      kitchen_feature_1: Joi.string().trim().required(),
      kitchen_feature_2: Joi.string().trim().allow(),
      kitchen_feature_3: Joi.string().trim().allow(),
      kitchen_feature_4: Joi.string().trim().allow(),
    }),
    additional_room_features: Joi.object({
      additional_room_feature_1: Joi.string().trim().required(),
      additional_room_feature_2: Joi.string().trim().allow(),
      additional_room_feature_3: Joi.string().trim().allow(),
      additional_room_feature_4: Joi.string().trim().allow(),
    }),
    garage_features: Joi.object({
      garage_feature_1: Joi.string().trim().required(),
      garage_feature_2: Joi.string().trim().allow(),
      garage_feature_3: Joi.string().trim().allow(),
      garage_feature_4: Joi.string().trim().allow(),
    }),
    outdoor_spaces: Joi.object({
      outdoor_space_1: Joi.string().trim().required(),
      outdoor_space_2: Joi.string().trim().allow(),
      outdoor_space_3: Joi.string().trim().allow(),
      outdoor_space_4: Joi.string().trim().allow(),
    }),
    more: Joi.object({
      more_detail_1: Joi.string().trim().allow(),
      more_detail_2: Joi.string().trim().allow(),
    }),
    plan_options: Joi.array().items(optionSchema),
    foundation_options: Joi.array().items(optionSchema),
    framing_options: Joi.array().items(optionSchema),
    additional_options: Joi.array().items(optionSchema),
    childSubCategory: Joi.string().trim().required(),
    subCategory: Joi.string().trim().required(),
    productImages: Joi.string().trim().required(),
  }),
};

module.exports = {
  createProduct,
  getDetails,
  getList,
  updateProduct,
};