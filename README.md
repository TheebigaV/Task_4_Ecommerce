# Task 4 Ecommerce

## Overview
This repository contains a frontend React/Vite app under `frontend/` and a PHP backend under `backend/`.

## Requirements
- Node.js 16+ / npm
- PHP 8+ with PDO support
- MySQL
- Composer (for backend dependencies)

## Frontend Setup
1. Open a terminal and go to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file using the example:
   ```bash
   copy .env.example .env
   ```
   or on PowerShell:
   ```powershell
   cp .env.example .env
   ```
4. Update `.env` if needed. By default it points to the local backend:
   ```env
   VITE_API_BASE_URL=http://localhost:8000/api
   ```
5. Start the frontend developer server:
   ```bash
   npm run dev
   ```

## Backend Setup
1. Open a terminal and go to the backend folder:
   ```bash
   cd backend
   ```
2. Install PHP dependencies if required:
   ```bash
   composer install
   ```
3. Configure database connection using environment variables or defaults.

### Database settings
The backend reads these environment variables in `backend/config/db.php`:
- `DB_HOST` (default: `localhost`)
- `DB_NAME` (default: `luminal_db`)
- `DB_USER` (default: `root`)
- `DB_PASSWORD` (default: empty)

If you prefer a `.env` file, create one and load it in your shell or web server configuration before starting PHP.

### Start backend server
For local development, run:
```bash
php -S localhost:8000
```
Then access backend routes like:
- `http://localhost:8000/api/create_order.php`
- `http://localhost:8000/api/contact.php`

## Mail Configuration
Update `backend/config/mail.php` with SMTP credentials if you want email features to work.

## Database Notes
- Create the MySQL database manually if it does not exist:
  ```sql
  CREATE DATABASE luminal_db;
  ```
- Update `DB_NAME`, `DB_USER`, and `DB_PASSWORD` if you use a different database name or credentials.

## Run the full stack
1. Start the backend:
   ```bash
   cd backend
   php -S localhost:8000
   ```
2. Start the frontend:
   ```bash
   cd frontend
   npm run dev
   ```
3. Open the frontend URL shown by Vite in the browser (usually `http://localhost:5173`).

## Notes
- The frontend expects the backend API base URL to be available at `http://localhost:8000/api`.
- If you change the backend port, update `frontend/.env` accordingly.
