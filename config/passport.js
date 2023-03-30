// Aqui trabajaremos con los web token
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
//const LocalStrategy = require('passport-local').Strategy
const User = require('../models/usuario')
const Keys = require('./keys')

// Exportamos una funcion
module.exports = function(passport) {

    let opts = {}
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt')
    opts.secretOrKey = Keys.secretOrKey


    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        
        // Obtiene el id del user (jwt_payload.id)
        User.findById(jwt_payload.id, (err, user) => {
            if (err) {
                return done(err, false)
            }
            if (user) {
                return done(null, user)
            }
            else {
                return done(null, false)
            }
        })

    }))

}