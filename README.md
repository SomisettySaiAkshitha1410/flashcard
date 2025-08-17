
# 📚 Flashcard App

A full-stack flashcard application designed to enhance the learning experience by allowing users to create, edit, delete, flip, and test themselves with flashcards.  
Deployed with a **React frontend (Netlify)**, **Node.js/Express backend (Render)**, and **MySQL database**.

---

## 🚀 Features
- **Flashcard Management**: Create, edit, and delete flashcards easily.  
- **Flip Functionality**: Flip cards to reveal answers for self-testing.  
- **Knowledge Testing Mode**: Test yourself with flashcards, enter answers, and track your score at the end.  
- **Customizable Learning**: Users can design their own flashcards for personalized study sessions.  
- **Responsive UI**: Clean and intuitive interface for smooth user interaction.  

---

## 🛠 Tech Stack

| Layer     | Technology                |
|-----------|----------------------------|
| Frontend  | HTML, CSS, JavaScript, React |
| Backend   | Node.js, Express           |
| Database  | MySQL                      |
| Hosting   | Netlify (frontend), Render (backend) |

---

## ⚡ Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/your-username/flashcard-app.git
````

### 2. Install dependencies

```bash
cd flashcard-app/frontend
npm install

cd ../backend
npm install
```

### 3. Set up Environment Variables

**Frontend (`frontend/.env`)**

```env
REACT_APP_API_URL=https://your-backend.onrender.com
```

**Backend (`backend/.env`)**

```env
DB_HOST=your-mysql-host
DB_USER=your-mysql-user
DB_PASS=your-mysql-password
DB_NAME=your-mysql-dbname
DB_PORT=3306
```

### 4. Run locally

**Backend**

```bash
cd backend
npm start
```

**Frontend**

```bash
cd frontend
npm start
```

---

## 🌍 Deployment

* **Frontend** → Deployed on Netlify: [Live App](https://leafy-monstera-c8231a.netlify.app/)
* **Backend** → Deployed on Render: [API Endpoint](https://flashcard-5ds0.onrender.com)
* **Database** → Hosted on MySQL

---

## 📂 Database Schema

The app uses a single table `flashcards`:

```sql
CREATE TABLE flashcards (
  id INT AUTO_INCREMENT PRIMARY KEY,
  question VARCHAR(255) NOT NULL,
  answer VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

