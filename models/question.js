"use strict";
class Questions {
  constructor(db) {
    this.db = db;
    this.ref = this.db.ref("/");
    this.collection = this.ref.child("questions");
  }

  async create(data, user) {
    const ask = { ...data };
    ask.owner = user;
    const question = this.collection.push(ask);
    // question.set(data);

    return question.key;
  }

  async getLast(amount) {
    const query = await this.collection.limitToLast(amount).once("value");
    const data = query.val();
    let orderedData = {};
    Object.keys(data)
      .reverse()
      .map((key) => (orderedData[key] = data[key]));

    return orderedData;
  }
  async getOne(id) {
    const query = await this.collection.child(id).once("value");
    const data = query.val();
    const orderedAnswers = {};
    Object.keys(data.answers)
      .reverse()
      .map((key) => (orderedAnswers[key] = data.answers[key]));
    return {
      ...data,
      answers: orderedAnswers,
    };
  }
  async answer(data, user) {
    const answer = await this.collection.child(data.id).child("answers").push();
    answer.set({ text: data.answer, user: user });
    return answer;
  }
  async setAnswerRight(questionId, answerId, user) {
    const query = await this.collection.child(questionId).once("value");
    const question = query.val();
    const answers = questions.answers;

    if (!user.email === question.owner.email) {
      return false;
    }
    for (let key in answers) {
      answers[key].correct = key === answerId;
    }
    const update = await this.collection
      .child(questionId)
      .child("answer")
      .update(answer);
    return update;
  }
}

module.exports = Questions;
