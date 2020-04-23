const express = require("express");
const router = express.Router();

const PlaylistModel = require("../models/playlist");
const authParser = require("../middleware/middleware_auth.middleware");

// Get all the playlists
router.get("/", (req, res) => {
  return PlaylistModel.find()
    .exec()
    .then(
      (response) => res.status(200).send(response),
      (error) => res.status(404).send(error)
    );
});

// Get playlists shared by the user
router.get("/user/:username", (req, res) => {
  const username = req.params.username;
  return PlaylistModel.find({ sharedUser: username })
    .exec()
    .then(
      (response) => res.status(200).send(response),
      (error) => res.status(404).send(error)
    );
});

// Get playlists by id
router.get("/:id", (req, res) => {
  const id = req.params.id;
  return PlaylistModel.find({ _id: id })
    .exec()
    .then(
      (response) => res.status(200).send(response),
      (error) => res.status(404).send(error)
    );
});

// Wish to do a fuzzy search by playlist name

// Get playlists by tag name
router.get("/tag/:tag", (req, res) => {
  const tag = req.params.tag;
  // https://docs.mongodb.com/manual/tutorial/query-arrays/#query-an-array-for-an-element
  return PlaylistModel.find({ tags: tag })
    .exec()
    .then(
      (response) => res.status(200).send(response),
      (error) => res.status(404).send(error)
    );
});

// Create a new playlist
router.post("/", authParser, (req, res) => {
  req.body.sharedUser = req.username;
  return PlaylistModel.create(req.body).then(
    (response) => res.status(200).send(response),
    (error) => res.status(403).send(error)
  );
});

router.put("/:id", authParser, async (req, res) => {
  try {
    const id = req.params.id;
    let entry = await PlaylistModel.findById(id).exec();
    if (!entry) {
      return res.status(404).send("ID not found");
    }
    const username = req.username;
    const isAdmin = req.isAdmin;
    const name = req.body.name;
    const description = req.body.description;
    const tags = req.body.tags;
    if (isAdmin) {
      return PlaylistModel.findByIdAndUpdate(
        id,
        { name: name, description: description, tags: tags },
        { new: true, useFindAndModify: false }
      )
        .exec()
        .then(
          (response) => res.status(200).send(response),
          (error) => res.status(403).send(error)
        );
    } else {
      entry = PlaylistModel.findOne({ _id: id, sharedUser: username }).exec();
      if (!entry) {
        return res.status(403).send("Username not match");
      }
      return PlaylistModel.findByIdAndUpdate(
        id,
        { name: name, description: description, tags: tags },
        { new: true, useFindAndModify: false }
      )
        .exec()
        .then(
          (response) => res.status(200).send(response),
          (error) => res.status(403).send(error)
        );
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

// Delete a playlist
router.delete("/:id", authParser, async (req, res) => {
  try {
    const id = req.params.id;
    let entry = await PlaylistModel.findById(id).exec();
    if (entry) {
      const isAdmin = req.isAdmin;
      const username = req.username;
      if (isAdmin) {
        return PlaylistModel.findByIdAndDelete(id, { useFindAndModify: false })
          .exec()
          .then(
            (response) => res.status(200).send(response),
            (error) => res.status(403).send(error)
          );
      } else {
        entry = await PlaylistModel.findOne({
          _id: id,
          sharedUser: username,
        }).exec();
        if (!entry) {
          return res.status(403).send("Username not matched");
        }
        return PlaylistModel.findByIdAndDelete(id, { useFindAndModify: false })
          .exec()
          .then(
            (response) => res.status(200).send(response),
            (error) => res.status(403).send(error)
          );
      }
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
