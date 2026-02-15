# PG Finder Backend

RESTful API backend for the PG Finder application built with Node.js, Express, and MongoDB.

## Features

- RESTful API architecture
- MongoDB database with Mongoose ODM
- JWT-based authentication
- Input validation with express-validator
- CORS enabled
- Error handling middleware
- Database seeding script

## Installation

```bash
npm install
```

## Configuration

Create a `.env` file in the root directory:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/pg-finder
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
```

## Running the Application

Development mode (with auto-reload):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

## Seeding the Database

To populate the database with sample data:

```bash
npm run seed
```

## API Documentation

### Base URL
```
http://localhost:5000/api
```

### PG Endpoints

#### Get All PGs
```
GET /pgs
```

Query Parameters:
- `search` - Search by name or location
- `minPrice` - Minimum price filter
- `maxPrice` - Maximum price filter
- `sharingType` - Filter by sharing type (can be multiple)
- `gender` - Filter by gender preference
- `amenities` - Filter by amenities (can be multiple)
- `maxDistance` - Maximum distance from college
- `available` - Filter by availability (true/false)

Response:
```json
{
  "success": true,
  "count": 8,
  "data": [...]
}
```

#### Get Single PG
```
GET /pgs/:id
```

Response:
```json
{
  "success": true,
  "data": {...}
}
```

#### Create PG
```
POST /pgs
```

Request Body:
```json
{
  "name": "Sunrise PG",
  "location": "Sector 18",
  "address": "123 Main Road",
  "price": 8500,
  "sharingType": "Double Sharing",
  "gender": "Male",
  "amenities": ["WiFi", "Meals", "AC"],
  "available": true,
  ...
}
```

#### Update PG
```
PUT /pgs/:id
```

#### Delete PG
```
DELETE /pgs/:id
```

#### Add Review
```
POST /pgs/:id/reviews
```

Request Body:
```json
{
  "user": "John Doe",
  "rating": 4.5,
  "comment": "Great place to stay!"
}
```

### Auth Endpoints

#### Register
```
POST /auth/register
```

Request Body:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "+91 9876543210"
}
```

#### Login
```
POST /auth/login
```

Request Body:
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

Response:
```json
{
  "success": true,
  "token": "jwt_token_here",
  "user": {
    "id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

## Database Models

### PG Model
- name (String, required)
- location (String, required)
- address (String, required)
- coordinates (Object)
- distance (String, required)
- price (Number, required)
- sharingType (String, enum, required)
- images (Array of Strings)
- rating (Number, 0-5)
- reviews (Array of Objects)
- amenities (Array of Strings)
- gender (String, enum, required)
- available (Boolean)
- description (String)
- rules (Array of Strings)
- contactInfo (Object)
- facilities (Object)
- timing (Object)

### User Model
- name (String, required)
- email (String, required, unique)
- password (String, required, hashed)
- phone (String)
- role (String, enum)
- favorites (Array of PG IDs)
- savedSearches (Array of Objects)

## Error Handling

All endpoints return consistent error responses:

```json
{
  "success": false,
  "message": "Error message here",
  "error": "Detailed error (only in development)"
}
```

## Development

The backend uses:
- Express.js for routing
- Mongoose for MongoDB integration
- bcryptjs for password hashing
- jsonwebtoken for authentication
- express-validator for input validation
- cors for cross-origin requests
- dotenv for environment variables

## Scripts

- `npm start` - Start the server
- `npm run dev` - Start with nodemon (auto-reload)
- `npm run seed` - Seed database with sample data
