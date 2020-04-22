const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const UserSchema = new Schema(
  {
    username: { type: String, index: true },
    password: String,
    // email: String,
    bio: String,
    followingPlaylists: [String],
    isAdmin: { type: Boolean, default: false },
  },
  { collection: "users" }
);

UserSchema.pre("save", function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

UserSchema.methods.comparePassword = function (plaintext, callback) {
  return callback(null, bcrypt.compareSync(plaintext, this.password));
};

module.exports = mongoose.model("UserModel", UserSchema);
