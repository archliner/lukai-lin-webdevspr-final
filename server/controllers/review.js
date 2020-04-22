const express = require("express");
const router = express.Router();

const ReviewModel = require("../models/review");
const authParser = require("../middleware/middleware_auth.middleware");

// Get all reviews
router.get("/", (req, res) => {
  return ReviewModel.find()
    .exec()
    .then(
      (response) => res.status(200).send(response),
      (error) => res.status(404).send(error)
    );
});

// Get reviews on a playlist
router.get("/:playlist_Id", (req, res) => {
  const id = req.params.playlist_Id;
  return ReviewModel.find({ playlist_Id: id })
    .exec()
    .then(
      (response) => res.status(200).send(response),
      (error) => res.status(404).send(error)
    );
});

// Get reviews of a user
router.get("/user/:username", (req, res) => {
  const username = req.params.username;
  return ReviewModel.find({ username: username })
    .exec()
    .then(
      (response) => res.status(200).send(response),
      (error) => res.status(404).send(error)
    );
});

// Post a review
router.post("/", authParser, (req, res) => {
  const username = req.username;
  req.body.username = username;
  return ReviewModel.create(req.body).then(
    (response) => res.status(200).send(response),
    (error) => res.status(403).send(error)
  );
});

// Edit a review
// Declare function to save some space.
function updateReview(id, rate, comment, editTime) {
  return ReviewModel.findByIdAndUpdate(
    id,
    { rate: rate, comment: comment, editTime: editTime },
    { new: true, useFindAndModify: false }
  ).exec();
}

router.put("/:id", authParser, async (req, res) => {
  try {
    const id = req.params.id;
    let entry = await ReviewModel.findById(id).exec();
    if (!entry) {
      return res.status(404).send("ID not found");
    }

    const username = req.username;
    const isAdmin = req.isAdmin;
    const rate = req.body.rate;
    const comment = req.body.comment;
    const editTime = Date.now();

    if (isAdmin) {
      // return ReviewModel.findByIdAndUpdate(
      //   id,
      //   { rate: rate, comment: comment, editTime: editTime },
      //   { new: true, useFindAndModify: false },
      //   (err, review) => {
      //     if (err) return res.status(403).send(err);
      //     return res.status(200).send(review);
      //   }
      // );
      return updateReview(id, rate, comment, editTime).then(
        (response) => res.status(200).send(response),
        (error) => res.status(403).send(error)
      );
    } else {
      // Veryfy username, don't know whether there is a better way
      entry = await ReviewModel.findOne({
        _id: id,
        username: username,
      }).exec();
      if (!entry) {
        return res.status(403).send("Username not matched");
      }

      return updateReview(id, rate, comment, editTime).then(
        (response) => res.status(200).send(response),
        (error) => res.status(403).send(error)
      );
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete("/:id", authParser, async (req, res) => {
  try {
    const id = req.params.id;
    let entry = await ReviewModel.findById(id).exec();
    if (entry) {
      const isAdmin = req.isAdmin;
      const username = req.username;
      if (isAdmin) {
        return ReviewModel.findByIdAndDelete(id, { useFindAndModify: false })
          .exec()
          .then(
            (response) => res.status(200).send(response),
            (error) => res.status(403).send(error)
          );
      } else {
        // Veryfy username, don't know whether there is a better way
        entry = await ReviewModel.findOne({
          _id: id,
          username: username,
        }).exec();
        if (!entry) {
          return res.status(403).send("Username not matched");
        }

        console.log('start deleting')
        return ReviewModel.findByIdAndDelete(id, { useFindAndModify: false })
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
