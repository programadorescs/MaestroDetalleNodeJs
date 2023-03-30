const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const logger = require('morgan')
const cors = require('cors')
const passport = require('passport') // para usar los token

/*
Definir las RUTAS
Con un punto accedemos a los archivos de la raiz ya que server.js esta en la raiz
*/
const users = require('./routes/usuarioRoutes');
const productos = require('./routes/productoRoutes.js');
const pedidos = require('./routes/pedidoRoutes');

// Crear el puerto por donde estara escuchando (en produccion process.env.PORT)
const port = process.env.PORT || 3000

// Nos servira para debuggear mientras desarrollamos
app.use(logger('dev'))

// Necesario para parsear el json
app.use(express.json())
app.use(express.urlencoded( {
    extended: true
}))
app.use(cors())


//// para usar web token
//app.use(passport.initialize())
//app.use(passport.session())
//// ejecutamos la funcion passport
//require('./config/passport')(passport)


// Para la seguridad
app.disable('x-powered-by')

app.set('port', port)

/*
* LLAMANDO A LA RUTAS
*/
//users(app)
productos(app)
pedidos(app)

// Definir la ip y puerto de escucha del servidor de heroku
server.listen(port, function() {
    console.log('App de node.js escuchando en el puerto: ' + port + ' iniciada...')
})


// Configuracion para manejar el error
app.use((err, req, res, next) => {
    console.log(err)
    res.status(err.status || 500).send(err.stack)
})

module.exports = {
    app: app,
    server: server
}