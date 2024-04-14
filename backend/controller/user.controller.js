//packages
const { Validator } = require('node-input-validator');

//models
const userModel = require("../model/user.model.js");
const userLoginHistory = require("../model/loginhistory.model.js");

//required file
const commonService = require("../helpers/common.service.js");

//registration
exports.registration = (request, response) => {
    try {
        const v = new Validator(request.body, {
            firstName: 'required',
            lastName: 'required',
            email: 'required|email',
            password: 'required',
            confirmPassword: 'required'
        });

        v.check().then((matched) => {
            if (!matched) {
                response.status(422).json({ status: false, message: v.errors, data: null });
            } else {
                const body = request.body;
                userModel.find({ email: body.email }).then(ifFind => {
                    if (ifFind.length > 0) {
                        response.status(400).json({ status: false, message: "User already exist!", data: null });
                    } else {
                        if (body.password == body.confirmPassword) {
                            const insertNewUser = {
                                firstName: body.firstName,
                                lastName: body.lastName,
                                email: body.email,
                                password: body.confirmPassword
                            };
                            userModel.create(insertNewUser).then(isCreate => {
                                const loginHistoryStore = {
                                    userId: isCreate._id,
                                    email: isCreate.email,
                                    ip: commonService.getIPAddress(request),
                                    os: process.platform ,
                                    browser: request.headers['user-agent']
                                };
                                userLoginHistory.create(loginHistoryStore).then(result => {
                                    const data = {
                                        accessToken: commonService.accessToken(isCreate._id),
                                        refressToken: commonService.refreshToken(isCreate._id)
                                    }
                                    response.status(200).json({ status: true, message: "Registration completed!", data: data });
                                }).catch(error => {
                                    response.status(400).json({ status: false, message: error.message, data: null });
                                })
                                
                            }).catch(notCreate => {
                                response.status(400).json({ status: false, message: notCreate.message, data: null });
                            })
                        } else {
                            response.status(400).json({ status: false, message: "Password and Confirm password are mismatched!", data: null });
                        }
                    }
                }).catch(elseFind => {
                    response.status(400).json({ status: false, message: elseFind.message, data: null });
                })
            }
        });
    } catch (error) {
        response.status(400).json({ status: false, message: error.message, data: null });
    }
}

//login
exports.login = (request, response) => {
    try {
        const v = new Validator(request.body, {
            email: 'required|email',
            password: 'required'
        });

        v.check().then((matched) => {
            if (!matched) {
                response.status(422).json({ status: false, message: v.errors, data: null });
            } else {
                const body = request.body;
                userModel.find({ email: body.email, password: body.password }).then(ifFind => {
                    if (ifFind.length > 0) {
                        ifFind = ifFind[0];
                        const loginHistoryStore = {
                            userId: ifFind._id,
                            email: ifFind.email,
                            ip: commonService.getIPAddress(request),
                            os: process.platform ,
                            browser: request.headers['user-agent']
                        };
                        userLoginHistory.create(loginHistoryStore).then(result => {
                            const data = {
                                accessToken: commonService.accessToken(ifFind._id),
                                refressToken: commonService.refreshToken(ifFind._id)
                            }
                            response.status(200).json({ status: true, message: "Successfully Logined!", data: data });
                        }).catch(error => {
                            response.status(400).json({ status: false, message: error.message, data: null });
                        })
                    } else {
                        response.status(400).json({ status: false, message: "Invalid credentials!", data: null });
                    }
                }).catch(elseFind => {
                    response.status(400).json({ status: false, message: elseFind.message, data: null });
                })
            }
        });
    } catch (error) {
        response.status(400).json({ status: false, message: error.message, data: null });
    }
}

//refresh token change
exports.newAccessToken = (request, response) => {
    try {
        const v = new Validator(request.body, {
            refreshTokenBody: 'required'
        });

        v.check().then((matched) => {
            if (!matched) {
                response.status(422).json({ status: false, message: v.errors, data: null });
            } else {
                commonService.verifyRefreshToken(request.body.refreshTokenBody).then(verifyRefreshTokenData => {
                    if (verifyRefreshTokenData.status) {
                        const data = {
                            accessToken: commonService.accessToken(verifyRefreshTokenData.data.subject)
                        }
                        response.status(400).json({ status: true, message: "New token created!", data: data });
                    } else {
                        response.status(400).json({ status: false, message: verifyRefreshTokenData.message, data: null });
                    }
                }).catch(error => {
                    response.status(400).json({ status: false, message: error.message, data: null });
                })

            }
        })
    } catch (error) {
        response.status(400).json({ status: false, message: error.message, data: null });
    }
}

//login history
exports.loginHistory = (request, response) => {
    try {
        const userId = request.subject;
        userLoginHistory.find({"userId": userId}).then(result => {
            response.status(200).json({ status: true, message: "success", data: result });
        }).catch(error => {
            response.status(400).json({ status: false, message: error.message, data: null });
        })
    } catch (error) {
        response.status(400).json({ status: false, message: error.message, data: null });
    }
}