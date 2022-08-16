'use strict';

const questiones = require('../models/index.ts').questions;

async function createQuestion(req, h) {
    console.log(req.payload)
    let result;
    try {
        result = await questiones.create(req.payload, req.state.user)
         console.log(`pregunta creada:  ${result}`);
    } catch (error) {
        console.error('algo salio mal ' + error.message);
        return h.view('ask', {
            title: 'Crear Pregunta',
            error: 'Pregunta no creada'
        }).code(500).takeover()
    }
    return h.response("TU PREGUNTA FUE GUARDADA")
}
async function answerQuestion (req, h) {
    let result;
    try {
        result = await questiones.answer(req.payload, req.state.user);
        console.log(`respuesta creada: ${result}`)
    }catch (error) {
        console.log(error.message)
    }
    return h.redirect(`/question/${req.payload.id}`)
}

module.exports = {
    createQuestion,
    answerQuestion
}