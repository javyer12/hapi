'use strict'
const joi = require('joi')
const site = require('./controllers/site.ts');
const user = require('./controllers/user.ts');
const question = require('./controllers/questions.ts');

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
            }),
            failAction: user.failValidation
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
            }),
            failAction: user.failValidation
        }
    },
    handler: user.validateUser
},
{
    method: 'POST',
    path: '/create-question',
    options: {
        validate: {
            payload: joi.object({
                title: joi.string().required(),
                description: joi.string().required().min(6)
            }),
            failAction: user.failValidation
        }
    },
    handler: question.createQuestion
},
{
    method: 'GET',
    path: '/login',
    handler: site.login
},
{
    method: 'GET',
    path: '/logout',
    handler: user.logout
},
{
    method: 'GET',
    path: '/ask',
    handler: site.ask
},
// {
//     method: 'POST',
//     path: '/create-user',
//     handler: user.createUser
// },
{
    method: 'GET',
    path: '/redirect',
    handler: site.redirect
},
{
    method: 'GET',
    path: '/assets/{param*}',
    handler: {
        directory: {
            path: '.',
            index: ['index.html']
        }
    }
},
{
    method: ['GET', 'POST'],
    path: '/{any*}',
    handler: site.notFound
}]