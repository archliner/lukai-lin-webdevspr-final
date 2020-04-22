module.exports = function(req, res, next) {
    const username = req.session.username;
    if (!username) {
        res.status(200).send('Already Logged out');
    } else {
        req.session.destroy();
        next();
    }
}