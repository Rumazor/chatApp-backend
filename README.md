# Chat App

A real-time chat application built with **NestJS**, **Prisma**, **Socket.IO**, **JWT**, and **Supabase**.

## Features

- Real-time communication with Socket.IO.
- Authentication and authorization using JWT.
- Database management with Prisma and PostgreSQL (or any supported Prisma database).
- Scalable and maintainable backend architecture.
- Integrated with Supabase for additional functionalities.

---

## Prerequisites

Ensure you have the following installed:

- **Node.js**: >= 16.x
- **Yarn** or **npm**
- **PostgreSQL** or a Prisma-compatible database.

Set up the `.env` file with the following variables:

```env
DATABASE_URL="your_database_connection_string"
DIRECT_URL="your_direct_database_connection_string"
PORT=3000
JWT_SECRET="your_jwt_secret_key"
```

---

## Installation

1. Clone the repository:

   ```bash
   git clone git@github.com:Rumazor/chatApp-backend.git
   cd chat-app
   ```

2. Install dependencies:

   ```bash
   yarn install
   # or
   npm install
   ```

3. Generate Prisma client:

   ```bash
   npx prisma generate
   ```

4. Run database migrations:

   ```bash
   npx prisma migrate dev
   ```

5. Pull the database schema (if needed):
   ```bash
   npx prisma db pull
   ```

---

## Running the Application

### Development Mode

```bash
yarn start:dev
# or
npm run start:dev
```

### Production Mode

1. Build the application:

   ```bash
   yarn build
   # or
   npm run build
   ```

2. Start the application:
   ```bash
   yarn start:prod
   # or
   npm run start:prod
   ```

---

## Scripts

- **`yarn start`**: Starts the app in production mode.
- **`yarn start:dev`**: Starts the app in development mode with live reload.
- **`yarn test`**: Runs tests using Jest.
- **`yarn format`**: Formats the code using Prettier.
- **`yarn lint`**: Lints the code using ESLint.
- **`yarn build`**: Builds the project for production.

---

## Database Management

### Prisma CLI Commands

- Generate Prisma Client:

  ```bash
  npx prisma generate
  ```

- Run Migrations:

  ```bash
  npx prisma migrate dev
  ```

- Pull Existing Database Schema:

  ```bash
  npx prisma db pull
  ```

- View Prisma Studio (GUI for the database):
  ```bash
  npx prisma studio
  ```

---

## Socket.IO

Socket.IO is used for real-time communication. Update the configuration in `src/app.gateway.ts` for custom namespace or event handling.

---

## Authentication

Authentication is managed with JWT. Ensure you set the `JWT_SECRET` in the `.env` file. Modify the logic in the `auth` module to suit your requirements.

---

## Environment Variables

| Variable       | Description                    |
| -------------- | ------------------------------ |
| `DATABASE_URL` | Database connection string     |
| `DIRECT_URL`   | Direct database URL (optional) |
| `PORT`         | Server port (default: 3000)    |
| `JWT_SECRET`   | Secret key for JWT encryption  |

---

## Additional Notes

- This project uses **Supabase** for additional backend services. Make sure to configure your Supabase settings in the `.env` file or within the respective modules.
- For detailed API documentation, access the Swagger UI at `/api-docs` after running the app.

---

## Contributing

1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit changes:
   ```bash
   git commit -m "Add feature description"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Create a pull request.

---

## License

This project is licensed under the **UNLICENSED** license.

---
