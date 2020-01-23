const bcrypt = require('bcrypt');

const hashPassword = (plainText) => {
    return bcrypt.hashSync(plainText, 5);
}
const checkPassword = (myPlaintextPassword,hash) => {
    return bcrypt.compareSync(myPlaintextPassword, hash);
}

exports.hashPassword = hashPassword;
exports.checkPassword = checkPassword;