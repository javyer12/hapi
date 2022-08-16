'use strict';


const handlebars = require('handlebars');

const bcrypt = require('bcrypt')
async function encrypt(pass) {
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(pass, saltRounds);
    return hashedPassword;
}


function registerHelper(){
    handlebars.registerHelper("answerNumber", (answers) => {
    if (!answers) return 0;
  
    const keys = Object.keys(answers).length;
    return keys;
  });
   handlebars.registerHelper("ifEquals", (a,b,options)=> {
    if (a === b ) {
        return options.fn(this)
    }
    return options.inverse(this)
})
  return handlebars;
}
module.exports= registerHelper()
