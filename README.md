# Secure User Authentication System

This project is a secure user authentication system built using the MERN stack (MongoDB, Express, React, Node.js). The system allows users to register and login, with security features such as password hashing and JSON Web Token (JWT) for session management.


## Features

- **User Registration:** Create accounts with username, email, and password, with hashed passwords.
- **User Login**: Log in with email and password, generating and storing JWT in cookies.
- **Protected Routes:** Access certain routes only if authenticated.
- **Security**: Input sanitization is implemented to prevent XSS and injection attacks. Passwords are hashed, and JWTs are used for session management.


### Prerequisites

- Node.js
- npm

### Backend Installation

1. Clone the repository:

```bash
https://github.com/NirajSrivastava18/Full-Stack-Auth
```

2. Navigate to the project directory:

```bash
cd server
```

3. Install NPM packages for the Backend:

```bash
npm install
```
4. Put your environment variables values in a .env file in the root directory 

```bash
MONGO_URI=<your_mongo_db_uri>
JWT_SECRET=<your_jwt_secret>
```
**NOTE:** While I have provided my database credentials for access, it is recommended to use your own credentials for MongoDB and JWT secret.

5. Start the Backend development server:

```bash
npm start
```

### Frontend Installation

2. Navigate to the project directory:

```bash
cd client
```

3. Install NPM packages for the Frontend:

```bash
npm install
```

4. Start the Frontend development server:

```bash
npm start
```

## Usage 

- **Register a new user**: Go to the registration page and create a new account.
- **Login**: Login with your credentials.
- **Access protected routes**: After logging in, you can access protected routes like the private page.

## Security Features
- **Password Hashing:** Passwords are hashed using bcrypt before storing them in the database.
- **JWT:** JSON Web Tokens are used for session management. Tokens are stored in cookies and are required to access protected routes.
- **Input Sanitization:** User inputs are sanitized to prevent XSS and injection attacks.

