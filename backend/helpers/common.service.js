//packages
const jwt = require("jsonwebtoken");

const accessTokenKey = "Yudtp$87$dfoiE";
const refreshTokenKey = "UpqvT12k0nbvi$fr$wf";

module.exports = {
    accessToken: (id) => {
        const payload = {subject: id}
        return jwt.sign(payload, accessTokenKey, {expiresIn: "15m"})
    },
    refreshToken: (id) => {
        const payload = {subject: id}
        return jwt.sign(payload, refreshTokenKey, {expiresIn: "30d"})
    },
    verifyRefreshToken: (token) => {
        return new Promise((resolve, reject) => {
            jwt.verify(token, refreshTokenKey, (error, tokenDetails) => {
                if(!error && tokenDetails) {
                    resolve( {status: true, message: "Valid refresh token", data: tokenDetails})
                } else {
                    resolve( { status: false, message: error.message })
                }
            })
        })
    },
    getIPAddress: (request) => {
        var ipAddress = request.headers['x-forwarded-for'] || request.socket.remoteAddress;
        return ipAddress;
    },
    verifyAccessToken: (request, response, next) => {
        try {
            jwt.verify(request.headers.authorization, accessTokenKey, (error, result) => {
                if(!error && result) {
                    request.subject = result.subject;
                    next();
                } else {
                    response.status(400).json({ status: false, message: error.message, data: null });
                }
            })
        } catch (error) {
            response.status(400).json({ status: false, message: error.message, data: null });
        }
    }
}
