const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');

dotenv.config();

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

async function setupDatabase() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');

        const db = client.db('BTG');

        // Create collections
        await db.createCollection('clientes');
        await db.createCollection('sucursales');
        await db.createCollection('productos');
        await db.createCollection('inscripciones');
        await db.createCollection('disponibilidad');
        await db.createCollection('visitas');

        // Insert sample data
        await db.collection('clientes').insertMany([
            { _id: 1, nombre: 'Juan', apellidos: 'Pérez', ciudad: 'Bogotá' },
            { _id: 2, nombre: 'María', apellidos: 'González', ciudad: 'Medellín' },
            { _id: 3, nombre: 'Carlos', apellidos: 'Rodríguez', ciudad: 'Cali' }
        ]);

        await db.collection('sucursales').insertMany([
            { _id: 1, nombre: 'Sucursal Central', ciudad: 'Bogotá' },
            { _id: 2, nombre: 'Sucursal Norte', ciudad: 'Medellín' },
            { _id: 3, nombre: 'Sucursal Sur', ciudad: 'Cali' }
        ]);

        await db.collection('productos').insertMany([
            { _id: 1, nombre: 'FPV_BTG_PACTUAL_RECAUDADORA', tipoProducto: 'FPV', montoMinimo: 75000 },
            { _id: 2, nombre: 'FPV_BTG_PACTUAL_ECOPETROL', tipoProducto: 'FPV', montoMinimo: 125000 },
            { _id: 3, nombre: 'DEUDAPRIVADA', tipoProducto: 'FIC', montoMinimo: 50000 },
            { _id: 4, nombre: 'FDO-ACCIONES', tipoProducto: 'FIC', montoMinimo: 250000 },
            { _id: 5, nombre: 'FPV_BTG_PACTUAL_DINAMICA', tipoProducto: 'FPV', montoMinimo: 100000 }
        ]);

        await db.collection('inscripciones').insertMany([
            { idProducto: 1, idCliente: 1 },
            { idProducto: 2, idCliente: 2 },
            { idProducto: 3, idCliente: 3 },
            { idProducto: 4, idCliente: 1 },
            { idProducto: 5, idCliente: 2 }
        ]);

        await db.collection('disponibilidad').insertMany([
            { idSucursal: 1, idProducto: 1 },
            { idSucursal: 1, idProducto: 2 },
            { idSucursal: 2, idProducto: 3 },
            { idSucursal: 2, idProducto: 4 },
            { idSucursal: 3, idProducto: 5 }
        ]);

        await db.collection('visitas').insertMany([
            { idSucursal: 1, idCliente: 1, fechaVisita: new Date('2023-01-15') },
            { idSucursal: 2, idCliente: 2, fechaVisita: new Date('2023-02-20') },
            { idSucursal: 3, idCliente: 3, fechaVisita: new Date('2023-03-25') },
            { idSucursal: 1, idCliente: 2, fechaVisita: new Date('2023-04-10') },
            { idSucursal: 2, idCliente: 1, fechaVisita: new Date('2023-05-05') }
        ]);

        console.log('Sample data inserted successfully');
    } catch (error) {
        console.error('Error setting up database:', error);
    } finally {
        await client.close();
        console.log('Database connection closed');
    }
}

setupDatabase();