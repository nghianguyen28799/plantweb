const express = require('express')
const voucher = express.Router();

const controller = require('../controllers/voucher.controller');

voucher.post('/checkvoucher', controller.checkVoucher)

voucher.post('/updateUsedVoucher', controller.updateUsedVoucher)

voucher.post('/checkUsedVoucher', controller.checkUsedVoucher)

module.exports = voucher;