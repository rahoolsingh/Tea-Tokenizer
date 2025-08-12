
```markdown
# 🍵 Tea Tokenizer

Tea Tokenizer is a simple and efficient tokenizer service with a user-friendly API and a frontend interface to encode and decode text into token IDs.  
Built using **Express (backend)** and **React + Tailwind CSS (frontend)**.

---

## 📌 Live Demo
- **Frontend:** [Tea Tokenizer Live](https://tea-tokenizer.vercel.app/)
- **API Reference:** [API Reference Page](https://tea-tokenizer.vercel.app/api-reference)

---

## 📂 Repository Structure
```

Tea-Tokenizer/
│
├── backend/       # Express.js API server
├── frontend/      # React.js web interface
└── README.md      # This file

````

---

## 🚀 Features
- Encode text into token IDs
- Decode token IDs back into text
- Display token statistics (length, token count, unknown words)
- Clean UI with **Tailwind CSS** and **Font Awesome**
- Fully documented **API Reference** page

---

## 🛠 Tech Stack
**Backend**
- Node.js
- Express.js

**Frontend**
- React.js
- Tailwind CSS
- Axios

---

## 📦 Installation & Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/rahoolsingh/Tea-Tokenizer.git
cd Tea-Tokenizer
````

---

### 2️⃣ Backend Setup (Express)

```bash
cd backend
npm install
```

#### Create `.env` file (if needed for configs)

Example:

```env
PORT=3000
```

#### Run backend server

```bash
npm start
```

Backend will run on:

```
http://localhost:3000
```

---

### 3️⃣ Frontend Setup (React)

Open a new terminal in project root:

```bash
cd frontend
npm install
```

#### Configure backend API URL

In `frontend/src/config.js`:

```javascript
export const API_BASE_URL = "http://localhost:3000";
```

#### Run frontend

```bash
npm start
```

Frontend will run on:

```
http://localhost:5173
```

(or whichever port Vite/CRA chooses)

---

## 🌐 Deployment

* **Backend**: Can be deployed to **Render**, **Railway**, or any Node hosting service.
* **Frontend**: Deploy easily to **Vercel** or **Netlify**.
* Update API URLs in the frontend config when deploying.

---

## 📖 API Reference

### **Encode**

**POST** `/encode`
Encodes text into tokens.

Example Request:

```bash
curl -X POST https://tea-tokenizer.onrender.com/encode \
  -H "Content-Type: application/json" \
  -d '{ "text": "Grab your tea" }'
```

Example Response:

```json
{
  "tokens": [41254, 4, 107447, 4, 95066],
  "stats": {
    "originalLength": 13,
    "tokenCount": 5,
    "unknownWordsCount": 2
  }
}
```

---

### **Decode**

**POST** `/decode`
Decodes tokens into text.

Example Request:

```bash
curl -X POST https://tea-tokenizer.onrender.com/decode \
  -H "Content-Type: application/json" \
  -d '{ "tokens": [41254, 4, 107447, 4, 95066] }'
```

Example Response:

```json
{
  "text": "Grab your tea"
}
```

---

## 🧑‍💻 Development Notes

* Frontend & backend can be run simultaneously using two terminals.
* Use **CORS** in backend during development.
* Make sure backend port matches frontend API config.

---



**Made with ❤️ for tea lovers and developers.**


