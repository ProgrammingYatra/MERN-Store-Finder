const mongoose = require("mongoose");
const validator = require("../validation/validator");

const shopSchema = new mongoose.Schema({
  title: {
    type: String,
    minLength: 3,
    required: [true, "Please Provide a Title"],
    validate: [validator.isValid, "Please Provide a Valid Title"],
  },
  name: {
    type: String,
    required: [true, "Please Provide a Name"],
    validate: [validator.isValid, "Please Provide a Valid name"],
  },
  location: {
    type: {
      type: String,
      enum:["Point"],
      required: [true, "Please Provide a Location"],
      default: "Point",
    },
    coordinates: {
      type: [Number],
      required: [true, "Please Provide a Location"],
    },
  },
  shopType: {
    type: String,
    required: [true, "Please Provide a Shopping type"],
    validate: [validator.isValid, "Please Provide a Shopping Type"],
  },
  rating: {
    type: Number,
    trim: true,
    required: [true, "Please Provide a Rating"],
    default: 0,
  },
});

shopSchema.index({ location: "2dsphere" });
module.exports = mongoose.model("Store", shopSchema);
