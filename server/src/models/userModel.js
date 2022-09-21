const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      lowcase: true,
    },
    number: {
      type: String,
      default: "0123456789",
    },
    adress: {
      type: String,
      default: "Hà Nội",
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,

      minLength: 8,
      select: false,
    },
    passwordConfirm: {
      type: String,

      validate: {
        validator: function (el) {
          return el === this.password;
        },
        message: "Mật khẩu không giống nhau!",
      },
    },
    passwordChangedAt: Date,
    // passwordResetToken: String,
    // passwordResetExpires: Date,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
userSchema.virtual("reviews", {
  ref: "Review",
  foreignField: "user",
  localField: "_id",
});
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
});

// Làm cho thời gian hợp lý và thoả mái hơn
userSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) {
    return next();
  }
  this.passwordChangedAt = Date.now() - 1000;
  next();
});

// Kiểm tra mật khẩu
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

// Kiểm tra người dùng đã thay đổi mật khẩu chưa
userSchema.methods.changesPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimestamp < changedTimestamp;
  }
  return false;
};

// userSchema.methods.createPasswordResetToken = function () {
//   const resetToken = crypto.randomBytes(32).toString("hex");

//   this.passwordResetToken = crypto
//     .createHash("sha256")
//     .update(resetToken)
//     .digest("hex");

//   this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

//   return resetToken;
// };

const User = mongoose.model("User", userSchema);

module.exports = User;
