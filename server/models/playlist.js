const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PlaylistSchema = new Schema(
  {
    playlistId: { type: String, required: true },
    sharedUser: { type: String, required: true },
    name: String,
    description: String,
    tags: [String],
    shareTime: { type: Date, default: Date.now() },
  },
  { collection: "playlists" }
);

module.exports = mongoose.model("PlaylistModel", PlaylistSchema);
