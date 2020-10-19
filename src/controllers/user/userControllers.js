const { UserModel } = require('../../models/user/userModel');
const { hashPasswordAsync, comparePasswordAsync, genJWT, signInResponse, defaultResponse } = require('../../utils/utils');
const {DUPLICATE_ERROR, SIGN_UP_ERROR, INCORRECT_PASSWORD, INCORRECT_USERNAME, ERROR} = require('../../utils/constant/errorConstant')
 
const signUp = async (signUpdata) => {
    try {
        const hashedPassword = await hashPasswordAsync(signUpdata.password);
        const userInfo = new UserModel({
            userName: signUpdata.userName,
            email: signUpdata.email,
            password: hashedPassword
        })
        console.log(userInfo)
        const result = await userInfo.save();
        if (result) return { isSuccess: true };
        return defaultResponse(false, SIGN_UP_ERROR);
    } catch (error) {
        if (error.code === 11000) return defaultResponse(false, DUPLICATE_ERROR);
        return defaultResponse(false, SIGN_UP_ERROR);
    }
}

const signIn = async (signInData, req) => {
    const { userName, password } = signInData;
    const result = await UserModel.findOne({ userName });
    if (result) {
        const verifyPasswordStatus = await comparePasswordAsync(password, result.password);
        if (!verifyPasswordStatus) return signInResponse(false, INCORRECT_PASSWORD);
        else {
            const payload = {
                userID: result._id,
                userName: result.userName,
                email: result.email,
            }
            req.session.user = payload;
            const jwt = genJWT(payload, process.env.SECRET_KEY, '1h');
            return signInResponse(true, null, jwt);
        }
    }
    else return signInResponse(false, INCORRECT_USERNAME);
}

const signOut = async (req) => {
    await req.session.destroy();
    return defaultResponse(true)
}
module.exports = { signUp, signIn, signOut }