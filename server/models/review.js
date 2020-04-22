const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReviewSchema = new Schema(
  {
    playlist_Id: { type: String, required: true },
    username: { type: String, required: true },
    rate: { type: Number, min: 1, max: 5 },
    comment: String,
    createTime: { type: Date, default: Date.now() },
    editTime: { type: Date, default: Date.now() },
  },
  { collection: "reviews" }
);

module.exports = mongoose.model("Review", ReviewSchema);
