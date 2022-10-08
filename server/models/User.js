const crypto = require("crypto");
const mongoose = require("mongoose");
bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide a username"],
  },
  email: {
    type: String,
    require: [true, "Please provide an email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide an password"],
    minlength: 8,
    select: false,
  },
  phoneNumber: {
    type: String,
    required: false,
    defaultValue: "",
  },
  billingAddress: {
    type: String,
    required: false,
    defaultValue: "",
  },
  city: {
    type: String,
    required: false,
    defaultValue: "",
  },
  postalCode: {
    type: String,
    required: false,
    defaultValue: "",
  },
  dummy: {
    type:String,
    required: false
  },
  wishList: [
    {
      type: {
        availableSizes: {
          type: [{ type: String }],
        },
        category: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
        subCategory: {
          type: String,
          required: true,
        },
        availableColors: {
          type: [{ type: String }],
        },

        images: {
          type: [{ type: String }],
        },
        itemName: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    },
  ],
  resetPasswordToken: { type: String },
  resetPasswordExpire: { type: Date },
});

UserSchema.pre("save", async function save(next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (err) {
    return next(err);
  }
});
UserSchema.methods.matchPasswords = async function (password) {
  return await bcrypt.compare(password, this.password);
};

UserSchema.methods.getSignedToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};
UserSchema.methods.getSignedRefreshToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRE,
  });
};
UserSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.resetPasswordExpire = Date.now() + 10 * (60 * 1000);
  return resetToken;
};
const User = mongoose.model("User", UserSchema);
module.exports = User;
