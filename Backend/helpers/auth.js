import bcrypt from 'bcrypt'

const hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(8);
        const hash = await bcrypt.hash(password, salt);
        return hash;
    } catch (err) {
        throw new Error(err);
    }
}

const comparePassword = async (password, hashed) => {
    try {
        const result = await bcrypt.compare(password, hashed);
        return result;
    } catch (err) {
        throw new Error(err);
    }
}

module.exports = {
    hashPassword,
    comparePassword
}