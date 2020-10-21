const jwt = require('jsonwebtoken')
const { AuthenticationError } = require('apollo-server-express')

const authorizationMiddleware = async ({ req, res }, childFunction, args = null) => {
    try {
        const jwtReq = req.headers.authorization;
        const token = jwtReq.replace("Bearer ", "");
        const payload = await jwt.verify(token, process.env.SECRET_KEY);
        const userInfo = req.session.user;
        if (payload.email != userInfo.email) {
            throw new Error('Bad token!');
        }
        return childFunction(payload, args = null);
    } catch (error){
        throw new AuthenticationError(error.message);
    }

}
module.exports = authorizationMiddleware

