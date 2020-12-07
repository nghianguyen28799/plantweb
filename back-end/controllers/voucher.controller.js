
const Voucher = require("../models/voucher.model");

module.exports = {
    checkVoucher: (req, res) => {
        const name = req.body.name;
        const userId = req.body.id;
        Voucher.find({ name: name }) 
        .then((data) => {
            if(data[0] != undefined) {
                const userIdReceived = data[0].userIdReceived.indexOf(userId);
                // var a = data[0].userIdReceived;
                // console.log(userId);
                // console.log(a);
                if(userIdReceived === -1) {
                    res.json(data);
                } else {
                    res.json({ error: true });
                }
            } else {
                res.json({invalid: true})
            }
        })
    },

    updateUsedVoucher: (req, res) => {
        const id = req.body.voucher._id
        const userId = req.body.userId
        Voucher.findOne({ _id: id})
        .then((data) => {
            const condition = {
                _id: id
            }
            // console.log(data.userIdReceived);
            const action = {
                userIdReceived: data.userIdReceived.concat(userId)
            }
            Voucher.updateOne(condition, action).then(()=> {})
        })
    },

    checkUsedVoucher: (req, res) => {
        const id = req.body.id;
        console.log('id' + id);
    }

}