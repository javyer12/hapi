'use strict'
const joi = require('joi')
const site = require('./controllers/site.ts');
const user = require('./controllers/user.ts');

module.exports = [{
    method: 'GET',
    path: '/',
    handler: site.home
},
{
    method: 'GET',
    path: '/register',
    handler: site.register
},
{
    method: 'POST',
    options: {
        validate: {
            payload: joi.object({
                name: joi.string().required().min(3),
                email: joi.string().email().required(),
                password: joi.string().required().min(6)
            })
        }
    },
    path: '/create-user',
    handler: user.createUser
},
{
    method: 'POST',
    path: '/validate-user',
    options: {
        validate: {
            payload: joi.object({
                email: joi.string().email().required(),
                password: joi.string().required().min(6)
            })
        }
    },
    handler: user.validateUser
},
{
    method: 'GET',
    path: '/login',
    handler: site.login
},
// {
//     method: 'POST',
//     path: '/create-user',
//     handler: user.createUser
// },
{
    method: 'GET',
    path: '/say',
    handler: site.hello

},
{
    method: 'GET',
    path: '/redirect',
    handler: site.redirect
},
{
    method: 'GET',
    path: '/{param*}',
    handler: {
        directory: {
            path: '.',
            index: ['index.html']
        }
    }
}]