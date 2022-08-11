'use strict'


function home(req, h) {
    return h.view('index', {
        title: "home"
    })
}

function register(req, h) {
    return h.view('register', {
        title: "register"
    })
}
function login(req, h) {
    return h.view('login', {
        title: "login"
    })
}

function hello(req, h) {
    return h.response("hola mundo") //code(404).message("sorry was a mistake")
}
function redirect(req, h) {
    return h.redirect("http://platzi.com")
    alert("Here, Learn about it ")
}
module.exports = {
    home: home,
    register: register,
    login: login,
    hello: hello,
    redirect: redirect
}