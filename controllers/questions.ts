'use strict';

const questiones = require('../models/index.ts').questions;

async function createQuestion(req, h) {
    let result;
    try {
        console.log(`pregunta creada:  ${result}`);
        result = await questiones.create(req.payload, req.state.user)
    } catch (error) {
        console.error('algo salio mal ' + error);
        return h.view('ask', {
            title: 'Crear Pregunta',
            error: 'Pregunta no creada'
        }).code(500).takeover()
    }
    return h.response("TU PREGUNTA FUE GUARDADA")
}

module.exports = {
    createQuestion: createQuestion
}