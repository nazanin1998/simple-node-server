import bcrypt from "bcrypt";
import e from "express";
import jwt from 'jsonwebtoken'

async function convertStrToHash(value) {
    const salt = await bcrypt.genSalt(10);
    let hash = await bcrypt.hash(value, salt);
    return hash
}

async function isValidHash(value, hash) {
    let isValid = await bcrypt.compare(value, hash);
    return isValid;
}

function generateJWT(baseObj) {
    const token = jwt.sign(baseObj, process.env.TOKEN_KEY, { expiresIn: process.env.JWT_EXPIRATION_DURATION });
    return token;
}

function decodeJWT(token, callback) {
    try {
        const decoded = jwt.verify(token, process.env.TOKEN_KEY)
        return callback(undefined ,decoded);

    } catch (err) {
        return callback(err ,undefined);
    }
}

let helperFunctions = {
    convertStrToHash: convertStrToHash,
    isValidHash: isValidHash,
    generateJWT: generateJWT,
    decodeJWT: decodeJWT
}
export default helperFunctions = helperFunctions;