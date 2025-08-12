# Tea Tokenizer

> A full-stack text tokenizer API with Web Interface & API endpoints access

---

<p align="center">
  <img src="https://raw.githubusercontent.com/rahoolsingh/Tea-Tokenizer/main/snap1.png" alt="Tea Tokenizer Banner" width="600"/>
</p>

## Live Demo

[https://tea-tokenizer.vercel.app/](https://tea-tokenizer.vercel.app/)

## GitHub Repository

[https://github.com/rahoolsingh/Tea-Tokenizer](https://github.com/rahoolsingh/Tea-Tokenizer)

## API Reference Page

[https://tea-tokenizer.vercel.app/api-reference](https://tea-tokenizer.vercel.app/api-reference)

---

## Project Structure

This repository contains two main folders:

-   `backend/` — Express API server for tokenization.
-   `frontend/` — React app with UI & API reference.

---

## Getting Started

Follow these steps to run the project locally:

### 1. Clone the repository

```bash
git clone https://github.com/rahoolsingh/Tea-Tokenizer.git
```

### 2. Setup Backend

```bash
cd Tea-Tokenizer/backend
npm install
npm run dev
```

Create a `.env` file inside the `backend` folder with the following variables:

```env
CORS_ORIGIN="http://localhost:5173, http://localhost:5174"
MONGODB_URI=<your_mongodb_connection_string>
PORT=3000
```

### 3. Setup Frontend

```bash
cd ../frontend
npm install
npm run dev
```

Create a `.env` file inside the `frontend` folder with the following:

```env
VITE_API_BASE_URL=http://localhost:3000
```

By default, the frontend runs on `localhost:5173` and proxies API requests to the backend server.

---

## Configuration

Use the environment variables in the `.env` files to customize:

-   `MONGODB_URI`: MongoDB connection string for backend.
-   `CORS_ORIGIN`: Allowed origins for API requests (comma separated).
-   `PORT`: Backend server port (default is 3000).
-   `VITE_API_BASE_URL`: Frontend base URL for API requests (usually backend URL).
