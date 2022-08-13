'use strict'
var datos = []
class Questions{
    cosntructor (db) {
        this.db = db
        this.ref = this.db.ref("/")
        this.collection = this.ref.child("questions")
    }
    
    async create (data,user) {
        console.log(data)
        //ask.owner = user;
        const question =  datos.push(data)
        // question.set(data)
        return question.key;
        
    }
    async addData () {
        this.collection = datos;
    }
}

console.log(datos)
module.exports = Questions;