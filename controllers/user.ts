'use strict'
const users = require('../models/index.ts').users;

async function createUser(req, h) {
    let result;
    try {
        result = await users.create(req.payload)
    } catch (err) {
        console.error(err);
        return h.response('Server no response').code(500)
    }
    return h.response(`User ID created: ${result}`)
}

async function validateUser(req, h) {
    let result;
    try {
        result = await users.validateUser(req.payload)
    } catch (err) {
        return h.response('Server no response to validate').code(500)
    }
    return result;
}
module.exports = {
    createUser: createUser,
    validateUser : validateUser
}