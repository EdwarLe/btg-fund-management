const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Fund = require('../models/Fund');

dotenv.config();

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const seedFunds = [
    { name: 'FPV BTG PACTUAL RECAUDADORA', minimumAmount: 75000, category: 'FPV' },
    { name: 'FPV BTG PACTUAL ECOPETROL', minimumAmount: 125000, category: 'FPV' },
    { name: 'DEUDAPRIVADA', minimumAmount: 50000, category: 'FIC' },
    { name: 'FDO ACCIONES', minimumAmount: 250000, category: 'FIC' },
    { name: 'FPV BTG PACTUAL DINAMICA', minimumAmount: 100000, category: 'FPV' },
];

const seedDatabase = async () => {
    try {
        await Fund.deleteMany({});
        await Fund.insertMany(seedFunds);
        console.log('Database seeded successfully');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedDatabase();