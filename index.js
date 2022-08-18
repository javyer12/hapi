"use strict";
const blankie = require('blankie');
const scooter = require('@hapi/scooter');
const Hapi = require("@hapi/hapi");
const crumb = require('@hapi/crumb')
const inert = require("@hapi/inert");
const path = require("path");
const vision = require("@hapi/vision");
const handlebars = require("./helpers/helpers.ts");
const routes = require("./routes.ts");
const site = require("./controllers/site.ts");
const methods = require("./helpers/methods.ts");

const server = Hapi.server({
  port: process.env.PORT || 3000,
  host: "localhost",
  routes: {
    files: {
      relativeTo: path.join(__dirname, "public"),
    },
  },
});

async function init() {
  try {
    await server.start();

    await server.register(inert);
    await server.register(vision);
    await server.register({
      plugin: crumb,
      options: {
        cookieOptions: {
          isSecure: process.env.NODE_ENV === 'production'
        }
      }
    })
    await server.register([scooter, {
      plugin: blankie,
      options: {
          defaultSrc: `'self' 'unsafe-inline'`,
          styleSrc: `'self' 'unsafe-inline' https://maxcdn.bootstrapcdn.com`,
          fontSrc: `'self' 'unsafe-inline' data:`,
          scriptSrc: `'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://maxcdn.bootstrapcdn.com https://code.jquery.com`,
          generateNonces: false
      }
  }]); 
  
    // await server.register({
    //   plugin: require("hapi-pino"),
    //   options: {
    //       prettyPrint: process.env.NODE_ENV !== 'production',
    //       // redact: [req.headers.authorization]
    //     },
    // });

    await server.register({
      plugin: require('./helpers/api.ts'),
      options: {
        prefix: 'api'
      }
    });

    server.method("setAnswerRight", methods.setAnswerRighty);
    server.method("getLast", methods.getLast, {
      cache: {
        expiresIn: 1000 * 30,
        generateTimeout: 1000,
      },
    });
    server.state("user", {
      ttl: 1000 * 60 * 60 * 24 * 7,
      //evaluar si la cookie es segura, evalua el ambiente de desarrollo, si es desarrollo, no es segura, si es de proceso la cookie  sera segura
      isSecure: process.env.NODE_ENV === "prod",
      encoding: "base64json",
    });

    server.views({
      engines: {
        hbs: handlebars,
      },
      relativeTo: __dirname,
      path: "views",
      layout: true,
      layoutPath: "views",
    });

    server.ext("onPreResponse", site.fileNotFound);
    server.route(routes);
    // await server.start();
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
  console.log(`servidor lanzado en: ${server.info.uri}`);
}
//cuando una promesa es rechazada y no manejada
process.on("unhandledRejection", (error) => {
  console.error("UnhandleRejection", error.message, error.localization);
});
//error del sistema
process.on("unhandleException", (error) => {
  console.error("UnhandleException", error.message, error);
});
init();

// server.views({
//     engines: { // --- hapi puede usar diferentes engines
//       hbs: handlebars // --- asociamos el plugin al tipo de archivos
//     },
//     relativeTo: __dirname, // --- para que las vistas las busque fuera de /public
//     path: 'views', // --- directorio donde colocaremos las vistas dentro de nuestro proyecto
//     layout: true, // --- indica que usaremos layouts
//     layoutPath: 'views' // --- ubicación de los layouts
//   })
