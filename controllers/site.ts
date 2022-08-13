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
function notFound(req, h) {
    //en la 404 no hay ningun parametro, por eso el objeto esta vacio
    //el segundo objeto es para cambiar propiedades de vision
    return h.view('404', {}, {layout: 'error'}).code(404)
}
function fileNotFound (req, h) {
    const response = req.response
    if(response.isBoom && response.output.statusCode === 404) {
        return h.view('404', {}, {layout: 'error'}).code(404)
    }
    return h.continue;
}
function ask (req, h) {
    if(!req.state.user){
        return h.redirect('/login')
    }
    return h.view('ask', {
        title:'Create Question',
        user: req.state.user
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
    fileNotFound: fileNotFound,
    register: register,
    login: login,
    ask: ask,
    notFound: notFound,
    
    redirect: redirect,
    hello: hello,
}