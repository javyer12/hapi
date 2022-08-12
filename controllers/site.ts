'use strict'


function home(req, h) {
    return h.view('index', {
        title: "home",
        user:req.state.user
    })
}

function register(req, h) {
    if (req.state.user) {
        return h.redirect('/')
    }
    return h.view('register', {
        title: "register",
        user:req.state.user
    })
}
function login(req, h) {
    if (req.state.user) {
        return h.redirect('/')
    }
    return h.view('login', {
        title: "login",
        user:req.state.user
    })
}
// function notlogin(req, h){
//     return h.view('nologin', {
//         title: "no login"
//     })
// }

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