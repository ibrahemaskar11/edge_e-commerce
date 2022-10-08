const express = require("express");
const router = express.Router();
const { MongoClient, ServerApiVersion } = require("mongodb");
const ErrorResponse = require("../utlis/errorResponse");
const Product = require("../models/Product");
const ObjectId = require("mongodb").ObjectId;
router.route("/").get(async (req, res, next) => {
    // const client = await MongoClient.connect(process.env.MONGO_URI);
    // const db = client.db();

    // const itemsCollection = db.collection("items");
    // const items = await itemsCollection.find().toArray();
    // client.close();
  const items = await Product.find({});
  res.status(200).json({
    success: true,
    items,
  });
});
router.route("/data").post(async (req, res, next) => {
  const { items } = req.body;
  try {
    items.forEach((item) => {
      item.itemName = item.itemName.toLowerCase();
    });
    await Product.deleteMany({});
    await Product.insertMany(items);
    console.log("Data import success");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
});
router.route("/:itemId").get(async (req, res, next) => {
  const { itemId } = req.params;
  try {
    const item = await Product.findOne({ _id: ObjectId(itemId) });
    res.status(201).json({
      success: true,
      item,
    });
  } catch (error) {
    return next(new ErrorResponse(error, 404));
  }
});
module.exports = router;
