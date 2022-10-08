const express = require("express");
const User = require("../models/User");
const router = express.Router();
const ObjectId = require("mongoose").Types.ObjectId;
router.route("/add/:userId").post(async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { item } = req.body;
    const user = await User.findOne({ _id: userId });
    if (!user) {
      throw new Error("bad request");
    }
    if (!item) {
      throw new Error("bad request");
    }
    const doesItemExist = user.wishList.findIndex(
      (wishListItem) => wishListItem._id === item._id
    );
    if (doesItemExist !== -1) {
      throw new Error("item already eixists");
    }
    user.wishList = [item, ...user.wishList];
    await user.save();
    res.status(201).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error,
    });
  }
});
router.route("/remove/:userId").post(async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { wishList } = req.body;
    const user = await User.findOne({ _id: userId });
    if (!user) {
      throw new Error("bad request");
    }
    if (!wishList) {
      throw new Error("bad request");
    }

    user.wishList = wishList;
    user.wishList;
    await user.save();
    res.status(201).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      error,
    });
  }
});

module.exports = router;
