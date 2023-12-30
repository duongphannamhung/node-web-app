'user strict'

const jwt = require('jsonwebtoken');

function sign(email, expiresIn = "30m") {
    return jwt.sign({email}, process.env.JWT_KEY || 'S3cret', {expiresIn})
}


function verify(token) {
    try {
        jwt.verify(token, process.env.JWT_KEY || JWT_SECRET);
        return true;
    } catch (error) {
        return false;
    }
}

module.exports = { sign, verify }