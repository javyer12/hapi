'use strict'

// import { database } from "firebase-admin";
// const users = require("./index.ts");
// const encrypter = require("../helpers/encrypter.ts");
const bcrypt = require('bcrypt');

class Users {
    // private  db: database.Database;
    // private ref: database.Reference;
    // private collection: database.Reference;

    constructor (db) {
        this.db = db;
        this.ref = this.db.ref('/');
        this.collection = this.ref.child('users')
    }


    async create (data) {
        console.log(data)
        const user = {...data}
        console.log(data)
        user.password = await this.constructor.encrypt(data.password)
       const newUser = this.collection.push(user);
    //     // newUser.set(data)

        return newUser.key 
    }

    //validate Users
    async validateUser(data) {
        const userQuery = await this.collection.orderByChild('email').equalTo(data.email).once('value');
        const userFound = userQuery.val();
        if(userFound) {
            const userId = Object.keys(userFound)[0];
            const passwdRight = await bcrypt.compare(data.password,userFound[userId].password);
            const result = (passwdRight) ? userFound[userId] : false;

            return result;
        }
        return false;
    }
    
    static async encrypt (pass) {
        const saltRounds = 10
        const hashedPassword = await bcrypt.hash(pass,saltRounds);
        return hashedPassword;
    }
}

module.exports = Users;