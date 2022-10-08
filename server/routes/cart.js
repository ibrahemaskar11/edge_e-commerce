const express = require("express");
const Cart = require("../models/Cart");
const router = express.Router();
const ErrorResponse = require("../utlis/errorResponse");
router.route("/").post(async (req, res, next) => {
  const { ownerId, items, totalAmount, totalItems } = req.body;
  try {
    const existingCart = await Cart.findOne({ ownerId });
    if (!existingCart) {
      const newCart = await Cart.create({
        ownerId,
        items,
        totalAmount,
        totalItems,
      });
      const cart = await Cart.findOne({ ownerId });
      console.log(cart);
      res.status(201).json({
        success: true,
        cart,
      });
    } else {
      const newCart = await Cart.replaceOne(
        { ownerId },
        { ownerId, items, totalAmount, totalItems }
      );
      const cart = await Cart.findOne({ ownerId });
      res.status(201).json({
        success: true,
        cart,
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      error,
    });
  }
  next();
});
router.route("/:ownerId").get(async (req, res, next) => {
  const { ownerId } = req.params;
  try {
    const cart = await Cart.findOne({ ownerId });
    if (!cart) {
      const emptyCart = await Cart.create({
        ownerId,
        items: [],
        totalAmount: 0,
        totalItems: 0,
      });
      res.status(201).json({
        success: true,
        cart: emptyCart,
      });
      return;
    }
    res.status(201).json({
      success: true,
      cart,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error,
    });
  }
});
module.exports = router;
