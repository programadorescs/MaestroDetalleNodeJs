const Pedido = require('../models/pedido');

//https://www.youtube.com/watch?v=W4_oH3anYHU

module.exports = {

    async registrar(req, res, next) {
        
        console.log('REQ BODY', req.body);

        try {

            const entidad = req.body

            const data = await Pedido.registrar(entidad);

            for (const det of entidad.detalles) {
                await Pedido.registrarDetalle(data.id, det.idproducto, det.cantidad, det.costo, det.precio, det.importe);
            }

            return res.status(201).json({
                success: true,
                message: 'El pedido se registro correctamente',
                data: [{
                    'id': data.id
                }]
            });

        } catch (error) {
            
            console.log('Error', error);

            return res.status(501).json({
                success: false,
                message: error,
                data: []
            });
        }

    },

    async anular(req, res, next) {
        
        console.log('REQ PARAMS', req.params.id);

        try {

            const idproducto = req.params.id

            await Pedido.anular(idproducto);

            return res.status(201).json({
                success: true,
                message: 'El pedido fue anulado correctamente',
                data: [{
                    'id': idproducto
                }]
            });

        } catch (error) {
            
            console.log('Error', error);

            return res.status(501).json({
                success: false,
                message: error,
                data: [] 
            });
        }

    },

    async listarPorFecha(req, res, next) {

        //console.log('REQ PARAM DESDE', req.params.desde)
        //console.log('REQ PARAM HASTA', req.params.hasta)
        console.log('REQ PARAM DESDE', req.query.desde)
        console.log('REQ PARAM HASTA', req.query.hasta)

        try {

            const lista = await Pedido.listarPorFecha(req.query.desde, req.query.hasta)

            return res.status(201).json({
                success: true,
                message: "Busqueda exitosa",
                data: lista
            });
            
        } catch (error) {
            console.log('Error', error);

            return res.status(501).json({
                success: false,
                message: error,
                data: [] 
            });
        }
    },

    async listarDetalle(req, res, next) {

        console.log('REQ PARAM', req.params.id)

        try {

            const lista = await Pedido.listarDetalle(req.params.id)

            return res.status(201).json({
                success: true,
                message: "Busqueda exitosa",
                data: lista
            });
            
        } catch (error) {
            console.log('Error', error);

            return res.status(501).json({
                success: false,
                message: error,
                data: [] 
            });
        }
    },

}