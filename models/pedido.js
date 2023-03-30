const db = require('../config/config');

const Pedido = {};

Pedido.registrar = (pedido) => {

    const sql = `
    INSERT INTO
        pedido(
            fecha,
            cliente,
            estado,
            total
        )
    VALUES($1, $2, $3, $4) RETURNING id
    `;

    return db.oneOrNone(sql, [
        pedido.fecha,
        pedido.cliente,
        pedido.estado,
        pedido.total
    ]);

}

Pedido.registrarDetalle = (idpedido, idproducto, cantidad, costo, precio, importe) => {

    const sql = `
    INSERT INTO
        detallepedido(
            idpedido,
            idproducto,
            cantidad,
            costo,
            precio,
            importe
        )
    VALUES($1, $2, $3, $4, $5, $6)
    `;

    return db.oneOrNone(sql, [
        idpedido,
        idproducto,
        cantidad,
        costo,
        precio,
        importe
    ]);

}

Pedido.anular = (idpedido) => {

    const sql = `
    UPDATE
        pedido
    SET
        estado='anulado'
    WHERE id=$1
    `;

    return db.oneOrNone(sql, [
        idpedido
    ]);

}

Pedido.listarPorFecha = (desde, hasta) => {

    const sql = `
    SELECT
        id, fecha, cliente, estado, total
    FROM
        Pedido
    WHERE 
        CAST(fecha AS date)>=$1 AND CAST(fecha AS date)<=$2
    ORDER BY id DESC
    `;

    return db.manyOrNone(sql, [
        desde,
        hasta
    ]);

}

Pedido.listarDetalle = (idpedido) => {

    const sql = `
    SELECT
        descripcion, cantidad, DetallePedido.costo, DetallePedido.precio, importe
    FROM
        Producto INNER JOIN DetallePedido ON Producto.id = DetallePedido.idproducto
    WHERE 
        idpedido=$1
    `;

    return db.manyOrNone(sql, [
        idpedido
    ]);

}

// Exportar modulo
module.exports = Pedido;