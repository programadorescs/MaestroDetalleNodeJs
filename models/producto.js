const db = require('../config/config');

const Producto = {};

Producto.getListar = () => {
    const sql = `
        SELECT 
            id, descripcion, costo, precio
        FROM 
            Producto
        ORDER BY
            descripcion;
    `

    return db.manyOrNone(sql);
}

Producto.getListarPorDescripcion = (dato) => {
    const sql = `
        SELECT 
            id, descripcion, costo, precio
        FROM 
            Producto
        WHERE
            lower(descripcion) LIKE '%'||lower($1)||'%'
        ORDER BY
            descripcion;
    `

    return db.manyOrNone(sql, dato);
}

Producto.getExisteDescripcion = (dato) => {

    const sql = `
        SELECT 
            id, descripcion
        FROM 
            Producto 
        WHERE 
            lower(descripcion) = lower($1);
    `;

    return db.oneOrNone(sql, dato);

}

Producto.getExisteDescripcionActualizar = (producto) => {

    const sql = `
        SELECT 
            id, descripcion
        FROM 
            Producto 
        WHERE 
            id <> $1 AND descripcion = $2;
    `;

    return db.oneOrNone(sql, [
        producto.id,
        producto.descripcion
    ]);

}

Producto.getEstaEnDetalle = (id) => {

    const sql = `
        SELECT 
            id, cantidad, costo, precio
        FROM 
            DetallePedido 
        WHERE 
            idproducto = $1;
    `;

    return db.oneOrNone(sql, id);

}

Producto.registrar = (producto) => {

    const sql = `
    INSERT INTO
        producto(
            descripcion,
            costo,
            precio
        )
    VALUES($1, $2, $3) RETURNING id
    `;

    return db.oneOrNone(sql, [
        producto.descripcion,
        producto.costo,
        producto.precio
    ]);

}

Producto.actualizar = (producto) => {

    const sql = `
    UPDATE
        producto
    SET
        descripcion=$2,
        costo=$3,
        precio=$4
    WHERE
        id=$1
    `;

    return db.oneOrNone(sql, [
        producto.id,
        producto.descripcion,
        producto.costo,
        producto.precio
    ]);

}

Producto.eliminar = (idproducto) => {

    const sql = `
        DELETE FROM
            producto
        WHERE
            id=$1
    `;

    return db.oneOrNone(sql, [
        idproducto
    ])

}


// Exportar modulo
module.exports = Producto;