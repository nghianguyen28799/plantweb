var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var voucherSchema = new Schema({
    name: String,
    percent: Number,
    maximum: Number,
    minOrder: Number,
    userIdPromotion: Array,
    userIdReceived: Array,
});

var Voucher = mongoose.model('Voucher', voucherSchema, 'voucher');

module.exports = Voucher;