'use strict';
const question = require("../models/question").questions;

async function setAnswerRight(questionId, answerId, user) {
    let result;
    try {
        result = await question.setAnswerRight(questionId, answerId, user);
    } catch (err) {
        console.log(err.message)
        return false;
    }
    return result;
}

module.exports = {
    setAnswerRight
}