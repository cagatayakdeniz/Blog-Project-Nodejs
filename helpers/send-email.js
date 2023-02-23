const nodeMailer = require('nodemailer');
const config = require("../config");

const transfer = nodeMailer.createTransport({
    service:"Gmail",
    auth:{
        user: config.mail.user,
        pass: config.mail.password,
    }
});

module.exports = transfer;