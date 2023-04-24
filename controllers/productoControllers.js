const Producto = require('../models/producto');

module.exports = {

    async listar(req, res, next) {

        try {
            
            const lista = await Producto.getListar();

            return res.status(201).json({
                success: true,
                message: 'Busqueda exitosa',
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

    async listarPorDescripcion(req, res, next) {

        console.log('REQ PARAM', req.params.dato);

        try {

            const lista = await Producto.getListarPorDescripcion(req.params.dato)

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

    async registrar(req, res, next) {
        
        console.log('REQ BODY', req.body);

        try {

            const entidad = req.body

            // Buscamos al usuario por medio del email
            const existeDescripcion = await Producto.getExisteDescripcion(req.body.descripcion)

            // Si existe, entonces ya existe la descripcion --> if(!existeDescripcion) no existe
            if (existeDescripcion) {
                return res.status(201).json({
                    success: false,
                    message: 'La descripcion ya existe en la DB',
                    data: []
                })                
            }

            const resultado = await Producto.registrar(entidad)

            return res.status(201).json({
                success: true,
                message: 'El producto se ha creado correctamente',
                data: resultado.id
                /*data: [{
                    'id': resultado.id
                }]*/
            });

        } catch (error) {
            
            console.log('Error', error)

            return res.status(501).json({
                success: false,
                message: 'Hubo un error al crear el producto',
                data: []
            });
        }

    },

    async actualizar(req, res, next) {
        
        console.log('REQ BODY', req.body);

        try {

            const entidad = req.body

            const existeDescripcion = await Producto.getExisteDescripcionActualizar(entidad)

            // Si existe, entonces ya existe la descripcion --> if(!existeDescripcion) no existe
            if (existeDescripcion) {
                return res.status(201).json({
                    success: false,
                    message: 'La descripcion ya existe en la DB',
                    data: []
                })                
            }

            await Producto.actualizar(entidad)

            return res.status(201).json({
                success: true,
                message: 'Los datos del producto se han actualizado correctamente',
                data: entidad.id
                /*data: [{
                    'id': entidad.id
                }]*/
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

    async eliminar(req, res, next) {
        
        console.log('REQ PARAMS', req.params.id);

        try {

            const idproducto = req.params.id

            const existeEnDetalle = await Producto.getEstaEnDetalle(idproducto)

            // Si existe, entonces ya existe la descripcion --> if(!existeDescripcion) no existe
            if (existeEnDetalle) {
                return res.status(201).json({
                    success: false,
                    message: 'El producto se encuentra en otras entidades, imposible eliminar.',
                    data: []
                })                
            }

            await Producto.eliminar(idproducto);

            return res.status(201).json({
                success: true,
                message: 'El producto se han eliminado correctamente',
                data: idproducto
                /*data: [{
                    'id': idproducto
                }]*/
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