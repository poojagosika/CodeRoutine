
# CodeRoutine

CodeRoutine is a full-stack web application built using the MERN stack (MongoDB, Express.js, React, and Node.js). It is a platform for coding challenges

## Features



## Tech Stack

### Frontend
- **React.js**: For building the user interface.
- **MUI (Material-UI)**: For component styling.
- **Redux Toolkit**: For state management.
- **Axios**: For making HTTP requests to the backend.

### Backend
- **Node.js**: Runtime environment.
- **Express.js**: For building the API.
- **MongoDB**: NoSQL database for storing user data and coding problems.
- **Mongoose**: MongoDB ODM for schema modeling.
- **JWT**: For user authentication and session management.

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/aakash416/CodeRoutine
   cd codeRoutine
   ```

2. **Install dependencies for the client**:
   ```bash
   cd client
   npm install
   ```

3. **Install dependencies for the server**:
   ```bash
   cd server
   npm install
   ```

4. **Create a `.env` file in the server directory and configure environment variables**:
   - `ORIGIN`: http://localhost:5173
   - `MONGODB_URL`: MongoDB connection string.
   - `JWT_SECRET`: Secret key for JWT tokens.
   - `PORT`: The port on which the server will run (default: 5000).

5. **Create a `.env` file in the client directory and configure environment variables**:
   - `VITE_API_URL`: http://localhost:8000

6. **Run the development servers**:

   - In one terminal, run the React client:
     ```bash
     cd client
     npm run dev
     ```

   - In another terminal, run the Node.js server:
     ```bash
     cd server
     npm start
     ```

## Usage

1. Navigate to the frontend URL (usually `http://localhost:5173`).
2. Sign up or log in to the platform.
3. Browse coding problems, write code in the editor, and submit your solutions.

## Contributing

Contributions are welcome! If you'd like to contribute, please fork the repository and create a pull request with your changes.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
