'use strict'
class Questions {
  constructor(db) {
    this.db = db
    this.ref = this.db.ref('/')
    this.collection = this.ref.child('questions')
  }

  async create(data, user, filename) {
    const ask = {
      description: data.description,
      title: data.title,
      owner: user
    }

    if (filename) {
      ask.filename = filename
    }
    const question = this.collection.push(ask)
    // question.set(data);

    return question.key
  }

  async getLast(amout) {
    const query = await this.collection.limitToLast(amout).once('value')
    const data = query.val()
    const orderedData = {}
    Object.keys(data)
      .reverse()
      .map((key) => (orderedData[ key ] = data[ key ]))

    return orderedData
  }

  async getOne(id) {
    const query = await this.collection.child(id).once('value')
    const data = query.val()
    const orderedAnswers = {}
    Object.keys(data.answers)
      .reverse()
      .map((key) => (orderedAnswers[ key ] = data.answers[ key ]))
    return {
      ...data,
      answers: orderedAnswers
    }
  }

  async answer(data, user, fileanswer) {
    const answers = await this.collection.child(data.id).child('answers').push()
    answers.set({ text: data.answer, user, fileanswer })
    return answers
  }

  async setAnswerRight(questionId, answerId, user) {
    const query = await this.collection.child(questionId).once('value')
    const questiom = query.val()
    const answers = questiom.answers

    if (!user.email === questiom.owner.email) {
      return false
    }
    for (const key in answers) {
      answers[ key ].correct = (key === answerId)
    }
    const update = await this.collection
      .child(questionId)
      .child('answers')
      .update(answers)
    return update
  }
}

module.exports = Questions
