const { UserModel } = require('./model');
const { hashPasswordAsync, comparePasswordAsync, genJWT, signInResponse, defaultResponse } = require('./utils');
 
//Acc: abc, abcdef
//Pass: 123
const signUp = async (signUpdata) => {
    try {
        const hashedPassword = await hashPasswordAsync(signUpdata.password);
        //UserModel
        const userInfo = new UserModel({
            userName: signUpdata.userName,
            email: signUpdata.email,
            password: hashedPassword
        })
        console.log(userInfo)
        const result = await userInfo.save();
        if (result) return { isSuccess: true };
        return defaultResponse(false, 'Sign up error');
    } catch (error) {
        if (error.code === 11000) return defaultResponse(false, 'Duplicated email or userName');
        return defaultResponse(false, 'Sign up error');
    }
}

const signIn = async (signInData, req) => {
    const { userName, password } = signInData;
    const result = await UserModel.findOne({ userName });
    if (result) {
        const verifyPasswordStatus = await comparePasswordAsync(password, result.password);
        if (!verifyPasswordStatus) return signInResponse(false, 'Password is not correct');
        else {
            const payload = {
                userID: result._id,
                userName: result.userName,
                email: result.email,
            }
            // lay user tu session
            // req.session is undefined ??????
            // req.session.user = payload;
            // const jwt = genJWT(payload, process.env.SECRET_KEY, '1h');
            // req.body is not secured (password leaked)
            console.log(req.body)
            const jwt = genJWT(payload, 'THISISTHESECRETKEY', '1h');
            return signInResponse(true, null, jwt);
        }
    }
    else return signInResponse(false, 'UserName is not correct');
}

const signOut = async (req) => {
    // req.session is undefined ??????
    console.log(req.session)
    await req.session.destroy();
    return DefaultRespone(true)
}
module.exports = { signUp, signIn, signOut }