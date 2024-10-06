# BTG Pactual Fund Management System

This project is a full-stack application for managing BTG Pactual's Voluntary Pension Funds (FPV) and Collective Investment Funds (FIC). It allows users to subscribe to funds, cancel subscriptions, and view their transaction history.

## Technologies Used

- Backend: Node.js, Express.js
- Frontend: React.js
- Database: MongoDB
- Architecture: Model-View-Controller (MVC)

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm installed
- MongoDB installed and running
- Git installed (optional, for cloning the repository)

## Setting Up the Project

1. Clone the repository:
   ```
   git clone https://github.com/EdwarLe/btg-fund-management.git
   cd btg-fund-management
   ```

2. Install the backend dependencies:
   ```
   cd backend
   npm install
   ```

3. Install the frontend dependencies:
   ```
   cd ../frontend
   npm install
   ```

4. Create a `.env` file in the `backend` directory and add your MongoDB connection string:
   ```
   MONGODB_URI=your_mongodb_connection_string_here
   ```

5. Seed the database with initial fund data:
   Create a `seedDatabase.js` file in the `backend` directory with the following content:

   ```javascript
   const mongoose = require('mongoose');
   const dotenv = require('dotenv');
   const Fund = require('./models/Fund');

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
   ```

   Then run:
   ```
   node seedDatabase.js
   ```

## Running the Application

1. Start the backend server:
   ```
   cd backend
   npm run start-dev
   ```
   The server will run on `http://localhost:5000`

2. In a new terminal, start the React frontend:
   ```
   cd frontend
   npm run dev
   ```
   The frontend will run on `http://localhost:5173`

3. Open your browser and navigate to `http://localhost:5173` to use the application.

## Features

- View available funds
- Subscribe to a fund
- Cancel a fund subscription
- View transaction history
- Check current balance

## API Endpoints

- GET /api/funds - Get all available funds
- POST /api/funds - Create a new fund
- POST /api/transactions/subscribe - Subscribe to a fund
- POST /api/transactions/cancel - Cancel a fund subscription
- GET /api/transactions/history - Get transaction history
- GET /api/transactions/balance - Get current balance

## Testing

To run the tests for the backend:

```
cd backend
npm test
```

## Deployment

For deployment, you can use AWS CloudFormation to set up the infrastructure. Create a CloudFormation template that defines the necessary resources (EC2 instances, security groups, etc.) for both the frontend and backend.

## Future Improvements

- Implement user authentication
- Add more comprehensive unit and integration tests
- Implement a more sophisticated frontend design
- Add pagination for transaction history
- Implement real email/SMS notifications

## Contributing

Contributions to this project are welcome. Please fork the repository and create a pull request with your changes.

## License

This project is licensed under the MIT License.