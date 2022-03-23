import bcrypt from "bcrypt";

async function convertStrToHash(value){
    const salt = await bcrypt.genSalt(10);
    let hash = await bcrypt.hash(value, salt);
    return hash
}

async function isValidHash(value, hash) {
    console.log("isValidPassword")
    console.log(value)
    console.log(hash)
    let isValid = await bcrypt.compare(value, hash);
    console.log(isValid)

    return isValid;
}

let helperFunctions = {
    convertStrToHash: convertStrToHash,
    isValidHash: isValidHash
}
export default helperFunctions = helperFunctions;