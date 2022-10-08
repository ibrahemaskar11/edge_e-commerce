const express = require("express");
const router = express.Router();

const Order = require("../models/Order");
router.route("/").post(async (req, res, next) => {
  const { ownerId, items, totalAmount, totalItems, userData } = req.body;
  const date = new Date().toLocaleDateString()
  try {
    const order = await Order.create({
      ownerId,
      items,
      totalAmount,
      totalItems,
      userData,
      date
    });
    res.status(201).json({
      success: true,
      order,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      error,
    });
  }
});
router.route("/:ownerId").get(async (req, res, next) => {
  const { ownerId } = req.params;
  try {
    const userOrders = await Order.find({ ownerId }).sort({"_id": -1});
    if (!userOrders) {
      const emptyOrderList = [];
      res.status(201).json({
        success: true,
        emptyOrderList,
      });
      return;
    }
    res.status(201).json({ success: true, userOrders });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      error,
    });
  }
});
module.exports = router;
