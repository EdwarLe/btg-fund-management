SELECT DISTINCT c.nombre, c.apellidos
FROM Cliente c
JOIN Inscripción i ON c.id = i.idCliente
JOIN Producto p ON i.idProducto = p.id
WHERE EXISTS (
    SELECT 1
    FROM Visitan v
    JOIN Disponibilidad d ON v.idSucursal = d.idSucursal
    WHERE v.idCliente = c.id
    AND d.idProducto = p.id
)
AND NOT EXISTS (
    SELECT 1
    FROM Disponibilidad d
    WHERE d.idProducto = p.id
    AND d.idSucursal NOT IN (
        SELECT idSucursal
        FROM Visitan
        WHERE idCliente = c.id
    )
);