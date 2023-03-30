const ProductoController = require('../controllers/productoControllers');
const passport = require('passport');

module.exports = (app) => {

    //// TRAER DATOS
    //app.get('/api/producto/listar', passport.authenticate('jwt', {session: false}), ProductoController.listar)
    //app.get('/api/producto/listarPorDescripcion/:dato', passport.authenticate('jwt', {session: false}), ProductoController.listarPorDescripcion)
    app.get('/api/producto/listar', ProductoController.listar)
    app.get('/api/producto/listarPorDescripcion/:dato', ProductoController.listarPorDescripcion)

    //// GUARDAR DATOS
    //app.post('/api/producto/registrar', passport.authenticate('jwt', {session: false}), ProductoController.registrar)
    //app.put('/api/producto/actualizar', passport.authenticate('jwt', {session: false}), ProductoController.actualizar)
    //app.delete('/api/producto/eliminar/:id', passport.authenticate('jwt', {session: false}), ProductoController.eliminar)
    app.post('/api/producto/registrar', ProductoController.registrar)
    app.put('/api/producto/actualizar', ProductoController.actualizar)
    app.delete('/api/producto/eliminar/:id', ProductoController.eliminar)

}