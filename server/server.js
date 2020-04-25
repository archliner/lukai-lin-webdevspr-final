const express = require("express");
const user = require("./controllers/user");
const playlist = require("./controllers/playlist");
const review = require("./controllers/review");

const app = express();

const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const mongoEndpoint = process.env.MONGODB_URI || "mongodb://127.0.0.1/playlist_app";

mongoose.connect(mongoEndpoint, { useNewUrlParser: true });
const db = mongoose.connection;

const session = require("express-session");

const MongoStore = require("connect-mongo")(session);

// app.use(
//   session({
//     secret: process.env.SUPER_SECRET,
//     store: new MongoStore({
//       mongooseConnection: db,
//     }),
//   })
// );
app.use(session({secret: 'my_secret_ssshhhhh_1234567890',
    store: new MongoStore({
        mongooseConnection : db,
    })}));
// This will create the connection, and throw an error if it doesn't work
db.on("error", console.error.bind(console, "Error connecting to MongoDB:"));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", user);
app.use("/api/playlist", playlist);
app.use("/api/review", review);

app.listen(3001, function () {
  console.log("Starting server");
});
