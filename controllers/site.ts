'use strict'

const questions = require("../models/index.ts").questions;

async function home(req, h) {
    const data = await req.server.methods.getLast(10);
    return h.view('index', {
        title: "home",
        user: req.state.user,
        questions: data
    })
}

function register(req, h) {
    if (req.state.user) {
        return h.redirect('/')
    }
    return h.view('register', {
        title: "register",
        user: req.state.user
    })
}
// function profile(req, h) {
//     if (req.state.user) {
//         return h.redirect('/')
//     }
//     return h.view('profile', {
//         title: "profile",
//         user: req.state.user
//     })
// }
function login(req, h) {
    if (req.state.user) {
        return h.redirect('/')
    }
    return h.view('login', {
        title: "login",
        user: req.state.user
    })
}
async function viewQuestion(req, h) {
    let data;
    try {
        data = await questions.getOne(req.params.id);
        if (!data) {
            console.log(data)
            return notFound(req, h);
        }
    } catch (error) {
        console.log(error.message)
    }
    return h.view('question', {
        title: 'Detalles de la pregunta',
        user: req.state.user,
        question: data,
        key: req.params.id
    })
}
// function notlogin(req, h){
//     return h.view('nologin', {
//         title: "no login"
//     })
// }
function notFound(req, h) {
    //en la 404 no hay ningun parametro, por eso el objeto esta vacio
    //el segundo objeto es para cambiar propiedades de vision
    return h.view('404', {}, { layout: 'error' }).code(404)
}
function fileNotFound(req, h) {
    const response = req.response
    if (!req.path.startsWith('/api') && response.isBoom && response.output.statusCode === 404) {
        return h.view('404', {}, { layout: 'error' }).code(404)
    }
    return h.continue;
}
function ask(req, h) {
    if (!req.state.user) {
        return h.redirect('/login')
    }
    return h.view('ask', {
        title: 'Create Question',
        user: req.state.user
    })
}


function profile(req, h) {
    if (!req.state.user) {
        return h.redirect('/login')
    }
    return h.view('profile', { //code(404).message("sorry was a mistake")
        title: 'Profile',
        user: req.state.user
    })
}
function redirect(req, h) {
    return h.redirect("http://platzi.com")
}
module.exports = {
    home,
    fileNotFound,
    register,
    login,
    ask,
    viewQuestion,
    notFound,
    profile,
    redirect,
}