'use strict'
const users = require('../models/index.ts').users;
const boom = require('@hapi/boom');

async function createUser(req, h) {
    let result;
    try {
        result = await users.create(req.payload)
    } catch (error) {
        console.error(error);
        return h.view('register', {
            title: 'Register',
            error: 'error creating user'
        })
    }
    return h.view('register', {
        title: 'Register',
        success: 'Resgister process was successfully, now Log In'
    })
}

async function validateUser(req, h) {
    let result;
    try {
        result = await users.validateUser(req.payload);
        if (!result) {
            // return h.response('Email and/or password is wrong').code(401);
            return h.view('login', {
                title: 'Login',
                error: 'Email and/or password is wrong'
            })
        }
    } catch (error) {
        // return h.response('Server no response to validate').code(500)
        return h.view('login', {
            title: 'Login',
            error: 'Server no response to validate'
        })
    }
    return h.redirect('/').state('user', {
        name: result.name,
        email: result.email
    })
}
function logout(req, h) {
    //se redirecciona a login, y se elimina la cookie, con unstate("el nombre de la cookie")
    return h.redirect('/login').unstate('user')
}
function failValidation(req, h, err) {
    const templates = {
        '/create-user': 'register',
        '/validate-user': 'login',
        '/create-question': 'ask'
    }
    return h.view(templates[ req.path ], {
        title: 'Error to evaluate ',
        error: 'Check all input has a valid value'
    }).code(404).takeover()
    // return boom.badRequest('Apparently something went wrong, we could not validate your login, try again', req.payload)

}
module.exports = {
    createUser: createUser,
    validateUser: validateUser,
    logout: logout,
    failValidation: failValidation
}