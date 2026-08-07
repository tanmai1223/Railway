# 🚆 SMART - Study Material, Assessment and Resource Tools

A full-stack document management portal developed for the **Zonal Railway Training Institute (ZRTI)** to centralize study materials, training manuals, videos, and other learning resources for trainees.

The platform enables administrators to efficiently manage educational content while allowing trainees to quickly search and access resources through an intuitive interface.

---

## 🌐 Live Demo

### Trainee Portal
🔗 https://railwaymanual.netlify.app

### Admin Portal
🔗 https://uploadformrailway.netlify.app

---

## 📸 Screenshots

### Home Page

<img width="1918" height="879" alt="image" src="https://github.com/user-attachments/assets/2962bb01-2f7a-4024-a30e-db8027e164c5" />


---

### Resource Cards

<img width="1907" height="858" alt="image" src="https://github.com/user-attachments/assets/a4bcee1e-0977-40d9-b4d6-409e2de7f00d" />


---

### Admin Dashboard

<img width="1917" height="881" alt="image" src="https://github.com/user-attachments/assets/a463d555-c889-489f-819e-155f33e0dfcc" />


---

### Add Resource

<img width="1920" height="878" alt="image" src="https://github.com/user-attachments/assets/0268ca35-a118-4288-8168-1e71ba133af5" />

---

### Edit Resource

<img width="1910" height="878" alt="image" src="https://github.com/user-attachments/assets/e6a19e95-5873-47de-8f3d-62a8e278d497" />

---

## ✨ Features

### Trainee Portal

- View study materials
- Browse category-wise resources
- Search documents instantly
- Open PDFs and videos via Google Drive
- Responsive UI
- Fast loading experience

### Admin Portal

- Add new resources
- Edit existing resources
- Delete resources
- Organize resources by category
- Store Google Drive links
- Manage metadata

---

## 🛠 Tech Stack

### Frontend

- React.js
- Vite
- CSS3
- Axios

### Backend

- Node.js
- Express.js

### Database

- MongoDB
- Mongoose

### Tools

- Git
- GitHub
- Postman

### Deployment

- Netlify
- Render
- MongoDB Atlas

---

## ⚙️ Installation

### Clone the repository

```bash
git clone [https://github.com/yourusername/smart.git](https://github.com/tanmai1223/Railway)
```

### Frontend

```bash
cd form
npm install
npm run dev
```

### Backend

```bash
cd backend
npm install
npm start
```

---

## 🔑 Environment Variables

Create a `.env` file inside the server folder.

```env
PORT=3000

MONGODB_URI=your_mongodb_connection

CLIENT_URL=http://localhost:5173
```

---

## 📌 Workflow

```
Admin
   │
   ▼
Create Resource
   │
   ▼
Store Metadata in MongoDB
   │
   ▼
Google Drive URL
   │
   ▼
Trainee Portal
   │
   ▼
Search & Access Resources
```

---

## 🚀 Deployment

### Frontend

- Netlify

### Backend

- Render

### Database

- MongoDB Atlas

---

## Future Improvements

- User authentication
- Role-based authorization
- Resource download tracking
- Analytics dashboard
- Assessment module
- Notifications
- Bookmark resources

