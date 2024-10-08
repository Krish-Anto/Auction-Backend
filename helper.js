const bcrypt = require('bcrypt');

async function genPassword(password){
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)
    return hashedPassword
}
 