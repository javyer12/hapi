'use strict';
const { writeFile } = require('fs');
const { promisify } = require('util');
const { join } = require('path');
const { v1: uuid } = require('uuid');
// const isBuffer = require('is-buffer');
const questiones = require('../models/index.ts').questions;

const write = promisify(writeFile);
// //////////////////////////////////////////////////////////////////////////////////// //////////////////////////////////////////////////////////////////////////////////
async function createQuestion(req, h) {
    if (!req.state.user) return h.redirect('/login')

    console.log(req.payload)
    let result, filename;
    console.log("aqui es resultado", result)
    try {
        const xbuffer = Buffer.from(req.payload.image);

        if (Buffer.isBuffer(xbuffer)) {
            filename = `${uuid()}.png`
            await write(join(__dirname, '..', 'public', 'uploads', filename), req.payload.image);
        }
        result = await questiones.create(req.payload, req.state.user, filename)
        console.log(`pregunta creada:  ${result}`);
    } catch (error) {
        console.error('algo salio mal ' + error.message);
        return h.view('ask', {
            title: 'Crear Pregunta',
            error: 'Pregunta no creada'
        }).code(500).takeover()
    }
    return h.redirect(`/question/${result}`)
}
// //////////////////////////////////////////////////////////////////////////////////// //////////////////////////////////////////////////////////////////////////////////
async function answerQuestion(req, h) {
    if (!req.state.user) return h.redirect('/login')

    let result, fileanswer;
    try {
        const xbuffer = Buffer.from(req.payload.image);

        if (Buffer.isBuffer(xbuffer)) {
            fileanswer = `${uuid()}.png`
            await write(join(__dirname, '..', 'public', 'Ianswer', fileanswer), req.payload.image);
        }
        result = await questiones.answer(req.payload, req.state.user, fileanswer);
        console.log(`respuesta creada: ${result}, ${req.payload}`)
    } catch (error) {
        console.log('aqui es ' + error.message,)
    }
    return h.redirect(`/question/${req.payload.id}`);
}
// //////////////////////////////////////////////////////////////////////////////////// //////////////////////////////////////////////////////////////////////////////////
async function setAnswerRight(req, h) {
    if (!req.state.user) return h.redirect('/login')

    let result;
    console.log('este es setanswer ' + result)
    try {
        result = await req.server.methods.setAnswerRight(
            req.params.questionId,
            req.params.answerId,
            req.state.user);
    } catch (error) {
        console.log('este es error ' + error.message)
    }
    return h.redirect(`/question/${req.params.questionId}`)
}
module.exports = {
    createQuestion,
    answerQuestion,
    setAnswerRight
}