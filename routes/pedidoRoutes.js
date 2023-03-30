const PedidoController = require('../controllers/pedidoControllers');
const passport = require('passport');

module.exports = (app) => {

    //// TRAER DATOS
    app.get('/api/pedido/listarPorFecha', PedidoController.listarPorFecha)
    app.get('/api/pedido/listarDetalle/:id', PedidoController.listarDetalle)

    //// GUARDAR DATOS
    app.post('/api/pedido/registrar', PedidoController.registrar)
    app.put('/api/pedido/anular/:id', PedidoController.anular)

}