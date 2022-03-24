import jwt from 'njwt'


function generateJWT(baseObj) {
    const token = jwt.create(baseObj, process.env.TOKEN_KEY)
    // token.setExpiration( process.env.JWT_EXPIRATION_DURATION)
    token.setExpiration(new Date().getTime() + 3600*1000)
    // const token = jwt.create(baseObj, process.env.TOKEN_KEY, { expiresIn: process.env.JWT_EXPIRATION_DURATION });
    return token;
}

function decodeJWT(token) {
    try {
        const decoded = jwt.verify(token, process.env.TOKEN_KEY)
        return decoded.body;
    } catch (err) {
        throw err.message
    }
}

let JWTHelper = {
    generateJWT: generateJWT,
    decodeJWT: decodeJWT
}

export default JWTHelper = JWTHelper;