
const catchAsyncError = require("../middlewares/catchAsyncError");
const Store = require("../Models/shopModel");
const ErrorHandler = require("../utils/errorHandler");

exports.createShop = catchAsyncError(async (req, res, next) => {
  const store = new Store({
    title: req.body.title,
    name: req.body.name,
    shopType: req.body.shopType,
    rating: req.body.rating,
    location: {
      coordinates: [req.body.longitude, req.body.latitude],
    },
  });

  const storeData = await store.save();
  return res.status(200).json({
    success: true,
    data: storeData,
  });
});

exports.getShopDetails = catchAsyncError(async (req, res, next) => {
  const { latitude, longitude, distance } = req.body;
  if (longitude && latitude) {
    if (!longitude && !latitude) {
      return next(
        new ErrorHandler("Please Provide a Longitude and latitude", 400)
      );
    }
  }

  if (distance) {
    if (!distance) {
      return next(new ErrorHandler("Please Provide a Distance", 400));
    }
  }

  const getDetails = await Store.aggregate([
    {
      $geoNear: {
        near: {
          type: "Point",
          coordinates: [parseFloat(longitude), parseFloat(latitude)],
        },
        distanceField: "dist.calculated",
        spherical: true,
        maxDistance: parseFloat(distance) * 1609 || parseFloat(1000) * 1609,
      },
    },
  ]);

  res.status(200).json({
    status: true,
    count: getDetails.length,
    data: getDetails,
  });
});
