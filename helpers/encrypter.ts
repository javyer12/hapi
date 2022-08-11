const bcrypt = require('bcrypt')
async function encrypt(pass) {
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(pass, saltRounds);
    return hashedPassword;
}

module.exports(encrypt);