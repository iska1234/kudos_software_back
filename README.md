<h1 align="center">Kudos Api</h1>

<p align="center">This is an API for a Full Stack application that securely allows authenticated users, specifically those with admin roles, to perform various actions such as uploading CSV files for creating records in a PostgreSQL database, ensuring data validation, and authorization.
    <br> 
</p>

## 📝 Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Usage](#usage)
- [Structure](#structure)
- [Features](#features)
- [Built Using](#built_using)

## 🧐 About <a name = "about"></a>
- This backend API follows a three-layer architecture, enabling authenticated users, particularly those with admin roles, to upload CSV files for creating records in a PostgreSQL database securely.
- The API ensures data validation, authorization, and administrative functionalities, such as uploading CSV files and correcting invalid records.
- Developed using Node.js and Express, adhering to a three-layer architecture, and incorporating Test-Driven Development (TDD) practices.

## 🏁 Getting Started <a name = "getting_started"></a>

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites
You will need to have the following installed on your machine:
- [Node.js](https://nodejs.org/en/)
- [PostgreSql](https://www.postgresql.org)

### Installing
With the prerequisites installed, and with docker running, you can run the following commands to get the project up and running:

1. Clone the repository or download the zip file and extract it:
```bash
git clone https://github.com/iska1234/kudos_software_back.git
```

2. Install the dependencies:
```bash
npm install
```

3. Create a `.env` file in the root of the project with the following content:
```env
JWT_SECRET=

PGHOST=

PGPORT=

PGDATABASE=

PGUSER=

PGPASSWORD=
```

4. Start the database: create the database by querying the schema.sql file inside the schemas folder
```bash
schema.sql
```

6. Start the server:
```bash
npm run dev
```

## 🏗️ Structure <a name = "structure"></a>
The project is structured as follows:
```
├── .github: folder where the project's GitHub actions are located.

├── src: folder where application files are located.

│    ├── controllers: folder where controllers for handling HTTP requests are located.

│   ├── data: folder where data access functions are located.

│   ├── db: folder where database configuration and connection functions are located.

│   ├── middlewares: folder where middleware functions are located.

│   ├── models: folder where data models and schemas are located.

│   ├── routers: folder where route handlers are located.

│   ├── services: folder where business logic services are located.

│   ├── tests: folder where test files are located.

│   ├── utils: folder where utility functions are located.

└── index.ts: file initializes an Express server, configures middleware for handling requests, defines routes for different endpoints, and starts the server to listen on a specified port.

```

## 🔧 Running the tests <a name = "tests"></a>
The tests are divided into unit tests and e2e tests. To run the tests, you can run the following commands:

1. To run the unit tests:
```bash
npm run test
```

## 🎈 Features <a name = "features"></a>

### FRs (Functional Requirements)

- [x]  Users can create accounts with unique email addresses and provide necessary details.
- [x]  Authentication is based on registered email and password, generating an authentication token upon success.
- [x]  Access to functionalities depends on predefined user roles, each granting different levels of access.
- [x]  Users, including admins, can save data entries with descriptive information and content.
- [x]  Admins have the authority to share data entries with other users, retaining metadata about sharing.
- [x]  Users retrieve their own data entries, while admins access all entries, with retrieval supporting filtering and searching.
- [x]  The system handles errors gracefully, providing informative messages for various scenarios.
- [x]  Admins manage user accounts, including retrieval of user information and potentially role modification.


### BRs (Business Requirements)

- [x] Users can register with unique email addresses and provide necessary details like name, password, and optionally age.
- [x] Registered users can authenticate using their email and password to access the system.
- [x] Authentication tokens are issued upon successful login to access protected resources.
- [x] The system supports different user roles, including regular users and administrators, with distinct access privileges.
- [x] Administrators have additional capabilities, such as managing user accounts, including creation, modification, and potentially deletion.
- [x] Users, including administrators, can save data entries containing descriptive information and content.
- [x] Administrators have the authority to share data entries with other users, maintaining metadata about sharing activities.
- [x] Retrieval functionalities allow users to access their own data entries and administrators to access all entries, with support for filtering and searching.
- [x] Access to system functionalities and resources is controlled based on user roles and permissions.
- [x] Authorization mechanisms ensure that users can only access resources and perform actions appropriate to their roles.
- [x] The system handles errors gracefully, providing informative error messages to users in case of failures.
- [x] Error logging mechanisms are implemented to record system errors for monitoring, debugging, and analysis purposes.
- [x] Comprehensive documentation is provided for the system, including API documentation covering endpoints, request/response formats, and authentication/authorization mechanisms.


### NFRs (Non-functional Requirements)

- [x] User passwords need to be encrypted;
- [x] Application data must be persisted in a PostgreSQL database;
- [x] All data lists must be paginated with 20 items per page;
- [x] Users must be identified by a JSON Web Token (JWT);
- [x] Implement robust security measures to safeguard data.
- [x] Ensure the system handles expected workloads with minimal performance impact.
- [x] Design the system to accommodate future growth and new features.
- [x] Maintain system availability for users with minimal downtime.
- [x] Ensure code is easy to understand and modify for future updates.
- [x] Create an intuitive user interface suitable for both technical and non-technical users.
- [x] Ensure compatibility across various browsers, devices, and operating systems.
- [x] Compliance: Adhere to relevant regulations and standards concerning data privacy and security.


## 🎈 Usage <a name="usage"></a>
To use the API, you can use the following routes:

### Auth Routes
```
POST /register: Register a user

POST /login: Authenticate a user

POST /logout: Logout a user
```

### User Routes
```
GET /all: Get all users (Admin access required)
```

### Saved Data Routes
```
POST /upload: Upload saved data (Admin access required)

GET /all/:userId: Get all saved data for a user (Admin access required)

GET /detail/:savedDataId: Get details of a saved data entry (Admin access required)
```

### Shared Data Routes
```
POST /shared: Share data with another user (Admin access required)

GET /admin/:adminId: Get shared data by Admin ID (Admin access required)

GET /user/:userId: Get shared data by User ID (User access required)

GET /saved/:sharedDataId: Get shared data by Shared Data ID (User or Admin access required)

PUT /delete/:sharedDataId: Delete shared data by Shared Data ID (Admin access required)

PUT /restore/:sharedDataId: Restore shared data by Shared Data ID (Admin access required)

GET /shared/deleted: Get shared data with deleted status (Admin access required)

GET /shared/deleted/:sharedDataId: Get shared data detail with deleted status by Shared Data ID (Admin access required)
```	

## ⛏️ Built Using <a name = "built_using"></a>
- [TypeScript](https://www.typescriptlang.org/)
- [Node.js](https://nodejs.org/en/)
- [PostgreSQL](https://www.postgresql.org/)
- [Zod](https://zod.dev/)
- [Vitest](https://vitest.dev/)

