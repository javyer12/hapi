'use strict';
const quest = require("../models/index.ts").questions;

async function setAnswerRighty(questionId, answerId, user) {
    let result;
    try {
        result = await quest.setAnswerRight(questionId, answerId, user);
       console.log('righty ' + result) 
    } catch (err) {
        console.log(err.message)
        return false;
    }
    return result;
}
async function getLast(amount) {
    let data;
    try {
        data = await quest.getLast(amount)
    } catch (error) {
        console.log(error.message);
    }
    console.log('metodo ejecutado')
    return data;
}
module.exports = {
    setAnswerRighty,
    getLast
}