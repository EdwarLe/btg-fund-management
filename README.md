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

5. Set up the database with initial data:
   ```
   cd backend
   npm run setup-db
   ```

## Database Configuration

The `setupDatabase.js` script in the `backend/scripts/` directory initializes the MongoDB database with the following collections:

- `clientes` (Clients)
- `sucursales` (Branches)
- `productos` (Products)
- `inscripciones` (Subscriptions)
- `disponibilidad` (Availability)
- `visitas` (Visits)

Each collection is populated with sample data that corresponds to the structure described in the original SQL tables.

## Running the Application

1. Start the backend server:
   ```
   cd backend
   npm run start-dev
   ```
   The server will run on `http://localhost:5000`

2. In a new terminal, start the React frontend:
   ```
   cd ../frontend
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

## Database Queries

The project includes a SQL query for obtaining the names of clients who have subscribed to products that are only available in the branches they visit. While our application uses MongoDB, this SQL query is stored for reference and potential future use:

```sql
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

```

This query is stored in the `backend/scripts/sql-queries/client_product_query.sql` file for documentation purposes.


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