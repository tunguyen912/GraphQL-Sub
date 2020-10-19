const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const hashPasswordAsync = async (password) => {
    return await bcrypt.hash(password, 10);
}

const comparePasswordAsync = async (password, passwordHashed) => {
    return await bcrypt.compare(password, passwordHashed);
}

const genJWT = (payload, secretKey, expireTime) => {
    return jwt.sign(payload, secretKey, { expiresIn: expireTime })
}

const signInResponse = (isSuccess, message = null, jwt = null) => {
    return {
        isSuccess,
        message,
        jwt
    }
}

const defaultResponse = (isSuccess, message = null) => {
    return {
        isSuccess,
        message
    }
}

module.exports = {hashPasswordAsync, comparePasswordAsync, signInResponse, genJWT, defaultResponse}