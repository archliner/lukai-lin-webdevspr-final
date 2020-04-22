module.exports = function (req, res, next) {
  const username = req.session.username;
  const isAdmin = req.session.isAdmin;
  if (!username) {
    res.status(401).send("Unauthorized: No session available");
  } else {
    req.isAdmin = isAdmin;
    req.username = username;
    next();
  }
};
