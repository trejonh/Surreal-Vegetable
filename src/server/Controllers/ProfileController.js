var mongoose = require('mongoose');
var User = mongoose.model('userModel');
module.exports.profileRead = function(req, res) {

    // If no user ID exists in the JWT return a 401
    if (!req.payload._id) {
        res.status(401).json({
            "message": "UnauthorizedError: private profile"
        });
    } else {
        // Otherwise continue
        User
            .findById(req.payload._id, '-hash -salt')
            .exec(function(err, user) {
                if (err) {
                    console.log(err);
                    console.log("finding user went wrong");
                }
                res.status(200).json(user);
            });
    }
};

module.exports.profileDelete = function(req, res) {
    User.findByIdAndRemove(req.query._id, function() {
        res.status(200).end();
        return;
    });
};

module.exports.updateUser = function(req, res) {
    User.findById(req.body._id, '-hash -salt', function(err, user) {
        if (err) {
            res.status(500);
            res.json(err);
            return;
        } else if (user) {
            if (req.body.newPassword)
                user.setPassword(req.body.newPassword);
            user.save(function(err) {
                res.status(200).json(user);
            });
        } else {
            res.status(500).json({
                err: "user not found"
            });
        }
    });
};
