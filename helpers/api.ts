'use strict'
const authBasic = require('@hapi/basic');
const Joi = require('joi');
const Boom = require('@hapi/boom');
const getQuestion = require('../models/index.ts').questions;
const users = require("../models/index.ts").users;


module.exports = {
    name: 'api-rest',
    version: '1.0.0',
    async register(server, options) {
        const prefix = options.prefix || 'api'

        //server.auth.strategy('simple', 'basic', { validateAuth }) server.auth.default('simple')
        await server.register(authBasic)
        server.auth.strategy('simple', 'basic', { validate: validateAuth });

        server.route({
            method: 'GET',
            path: `/${prefix}/question/{key}`,
            options: {
                auth: 'simple',
                validate: {
                    params: Joi.object({
                        key: Joi.string().required()
                    }),
                    failAction: failValidation
                }
            },
            handler: async (req, h) => {
                let result;
                try {
                    result = await getQuestion.getOne(req.params.key);
                    if (!result) {
                        return Boom.notFound(`Respuesta no encontrada ${req.params.key}`)
                    }
                } catch (error) {
                    console.log(error.message);
                    return Boom.badImplementation(`Hubo un error al buscar ${req.params.key} - ${error}`)
                }
                return result;
            }
        })

        server.route({
            method: 'GET',
            path: `/${prefix}/questions/{amount}`,
            options: {
                auth: 'simple',
                validate: {
                    params: Joi.object({
                        amount: Joi.number().integer().min(1).max(15).required()
                    }),
                    failAction: failValidation
                }
            },
            handler: async (req, h) => {
                let result;
                try {
                    result = await getQuestion.getLast(req.params.amount);
                    if (!result) {
                        return Boom.notFound(`Respuestas no encontradas ${req.params.amount}`)
                    }
                } catch (error) {
                    console.log(error.message);
                    return Boom.badImplementation(`Hubo un error al buscar las respuestas: - ${error}`)
                }
                return result;
            }
        })
        function failValidation(req, h, err) {
            return Boom.badRequest('Porfavor utilice los parametros correctos');
        }
        async function validateAuth(req, username, passwd, h) {
            let user;
            try {
                user = await users.validateUser({
                    email: username,
                    password: passwd
                })
            } catch (error) {
                console.log('hay un error para usar la API ' + error.message)
            }
            return {
                credentials: user || {},
                isValid: (user !== false)
            }
        }
    }
}