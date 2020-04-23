const express = require("express");
const router = express.Router();

const UserModel = require("../models/user");

const authParser = require("../middleware/middleware_auth.middleware");
const logoutParser = require('../middleware/middleware_logout.middleware');

// register
router.post("/", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(404)
      .send({ message: "Must include username AND password" });
  }

  return UserModel.create(req.body).then(
    () => {
      req.session.username = username;
      return res.status(200).send({ username });
    },
    (error) => res.status(500).send(error)
  );
});

// Create ADMIN user
router.post("/admin", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(404)
      .send({ message: "Must include username AND password" });
  }
  req.body.isAdmin = true;
  return UserModel.create(req.body).then(
    () => {
      req.session.username = username;
      return res.status(200).send({ username });
    },
    (error) => res.status(500).send(error)
  );
});

// router.post("/authenticate", async (req, res) => {
//   try {
//     const { username, password } = req.body;
//     let user = (await UserModel.findOne({ username: username })).exec();
//     user.comparePassword(password, (error, match) => {
//       if (match) {
//         req.session.isAdmin = user.isAdmin; 
//         req.session.username = username;
//         return res.status(200).send({ username });
//       }
//       return res.status(400).send("The password does not match");
//     });
//   } catch (error) {
//     res.status(404).send(error)
//   }
// });

// login
router.post("/authenticate", function (req, res) {
  const { username, password } = req.body;
  UserModel.findOne({ username: username })
    .exec()
    .then((user) => {
      user.comparePassword(password, (error, match) => {
        if (match) {
          req.session.username = username;
          req.session.isAdmin = user.isAdmin;
          return res.status(200).send({ username });
        }
        return res.status(400).send("The password does not match");
      });
    })
    .catch((error) => console.error(`Something went wrong: ${error}`));
});

// update
router.put("/:username", async (req, res) => {
  try {
    const username = req.params.username;
    let entry = await UserModel.findOne({ username: username }).exec();
    if (!entry) {
      return res.status(404).send("ID not found");
    }
    const id = entry._id;
    var followingPlaylists = entry.followingPlaylists;
    if (req.body.following) {
      followingPlaylists.push(req.body.following);
    }
    if (req.body.unfollowing) {
      for(var i = followingPlaylists.length - 1; i >= 0; i--) {
        if(followingPlaylists[i] == req.body.unfollowing) {
          console.log('start splice')
          followingPlaylists.splice(i, 1);
        }
      }
    }
    req.body.followingPlaylists = followingPlaylists;
    entry = await UserModel.findByIdAndUpdate(id, req.body).exec();
    res.status(200).send(entry);
  } catch (error) {
    res.status(500).send(error);
  }
});

// get a user's following playlists
router.get("/:username/followinglists", async (req, res) => {
  try {
    const username = req.params.username;
    let entry = await UserModel.findOne({ username: username }).exec();
    if (!entry) {
      return res.status(404).send("ID not found");
    }
    res.status(200).send(entry.followingPlaylists);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/loggedIn", authParser, function (req, res) {
  return res.status(200).json({username: req.username, isAdmin: req.isAdmin});
});

router.post('/logout', logoutParser, function(req, res) {
  return res.sendStatus(200);
})

router.get("/", (req, res) =>
  UserModel.find()
    .exec()
    .then((users) => res.send(users))
);

module.exports = router;
