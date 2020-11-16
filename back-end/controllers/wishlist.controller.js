const Wishlist = require("../models/wishlist.model");

module.exports = {
    showByUserID: (req, res) => {
        const userId = req.params.id
        Wishlist.find({userId: userId})
        .then(data => {
            res.json(data);
        })
    },

    create: (req, res) => {
        Wishlist.create({
            userId: req.body.userId,
            productId: req.body.productId,
            size: req.body.size
        }).then(() => {
            res.send(200);
        })
    },

    findData: (req, res) => {
        Wishlist.find({
            productId: req.body.productId,
            userId: req.body.userId,
            size: req.body.size
        }).then((data) => {
            (data.length != 0) ? res.json({added: true}) : res.json({added: false})
        })
    },

    delete: (req, res) => {
        const id = req.body.id
        Wishlist.deleteOne({_id: id})
        .then(() => {
            res.json({deleted: true})
        })
    }
}