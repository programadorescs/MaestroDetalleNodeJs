# MaestroDetalleNodeJs
Ejemplo básico de un maestro detalle en NodeJs, que servirá como apirest para el proyecto RetrofitMaestroDetalle (https://github.com/programadorescs/RetrofitMaestroDetalle), la base de datos está implementada en Postgresql

## Script de la base de datos

```sql
DROP TABLE IF EXISTS producto CASCADE;
CREATE TABLE producto(
	id BIGSERIAL PRIMARY KEY,
	descripcion VARCHAR(255) NOT NULL UNIQUE,
	costo DECIMAL DEFAULT 0,
	precio DECIMAL DEFAULT 0
);

DROP TABLE IF EXISTS pedido CASCADE;
CREATE TABLE pedido(
	id BIGSERIAL PRIMARY KEY,
	fecha TIMESTAMP(0) NOT NULL,
	cliente VARCHAR(255) NOT NULL,
	estado VARCHAR(10) NULL DEFAULT 'Publico general',
	total DECIMAL DEFAULT 0
);

DROP TABLE IF EXISTS detallePedido CASCADE;
CREATE TABLE detallePedido(
	id BIGSERIAL PRIMARY KEY,
	cantidad INTEGER DEFAULT 0,
	costo DECIMAL DEFAULT 0,
	precio DECIMAL DEFAULT 0,
	importe DECIMAL DEFAULT 0,
	idpedido BIGINT NOT NULL,
	idproducto BIGINT NOT NULL,
	FOREIGN KEY(idpedido) REFERENCES pedido(id) ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY(idproducto) REFERENCES producto(id) ON UPDATE CASCADE ON DELETE CASCADE
);
```
