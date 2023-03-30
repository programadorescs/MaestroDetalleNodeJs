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
    'host': 'ec2-3-228-235-79.compute-1.amazonaws.com',
    'port': 5432,
    'database': 'dahar339gh0eo4',
    'user': 'cqzqtwlsoeqjgr',
    'password': 'ec831ed7bc89645d92e6b4103c5e2d962787d206e076b559bc737049fba12762',
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