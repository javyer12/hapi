'use strict'

const firebase = require('firebase-admin');
const serviceAccount = require('../config/phy-firebase.json');

firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: 'https://phyform-default-rtdb.firebaseio.com/'
})

const db = firebase.database();
const Useres = require('./users');

module.exports = {
    users: new Useres(db)
}