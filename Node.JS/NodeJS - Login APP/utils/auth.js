const bcrypto = require('bcrypt');

const hashPassword = (plainText) => {
    return bcrypto.hashSync(plainText, 5);
}

const ifExistUsername = (username,users) => {
    users.findOne({username: username}).then(res =>{
        return res;
    });
}
exports.hashPassword = hashPassword;
exports.ifExistUsername = ifExistUsername;