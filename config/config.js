// Configuracion para la conexion con la base de datos

const promise = require('bluebird')
const options = {
    promiseLib: promise,
    query: (e) => {}
}

const pgp = require('pg-promise')(options)
const types = pgp.pg.types
types.setTypeParser(1114, function(stringValue) {
    return stringValue
})

/*
// Datos para produccion
const databaseConfig = {
    'host': 'ec2-.-...-...-79.com....',
    'port': 5432,
    'database': 'dah.....',
    'user': 'cqz...',
    'password': 'ec831....',
    'ssl': { rejectUnauthorized: false }
}
*/

// Datos para server local
const databaseConfig = {
    'host': '127.0.0.1',
    'port': 5432,
    'database': 'PedidoDb',
    'user': 'postgres',
    'password': '12345678'
}

const db = pgp(databaseConfig)

module.exports = db