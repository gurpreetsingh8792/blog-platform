# Blog Platform (Full-Stack)

A full-stack blogging platform built with **Node.js + Express**, **MongoDB Atlas**, **JWT Authentication**, and **React + Redux Toolkit**.

Users can register/login, create rich-text blog posts, edit/delete only their own posts, and comment on other users’ posts (authors cannot comment on their own posts).
The UI is fully responsive and includes a mobile right-side menu.

---

## Features

### Authentication

- Register with **unique username** (case-insensitive)
- Login with email + password
- JWT-based session handling (token stored client-side)
- Logout clears session

### Posts

- Create a new post (title + rich text content using Quill editor)
- View all posts list
- View post details with formatted rich text content
- Edit/update **only your own** posts
- Delete **only your own** posts
- Search posts by title (`q` query param)
- Sort posts (newest / oldest / title)

### Comments

- Only logged-in users can comment
- The post author **cannot** comment on their own post
- Comment username is automatically taken from the logged-in user

### UI / UX

- Responsive Bootstrap UI
- Mobile: right-side offcanvas menu
- Rich text editor toolbar:
  - Headings
  - Bold / Italic
  - Lists
  - Links
  - Blockquote
  - Code block
- Pasted plain text is preserved with paragraph spacing and new lines

---

## Tech Stack

### Frontend

- React (Vite)
- Redux Toolkit
- React Router DOM
- Bootstrap
- React Quill

### Backend

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT (jsonwebtoken)
- bcryptjs

---

## Project Structure

```
blog-platform/
├── client/        # React + Redux frontend (Vite)
└── server/        # Node.js + Express API + MongoDB
```

---

## Prerequisites

- Node.js (v18+ recommended)
- npm
- MongoDB Atlas cluster

---

## 1) Run Locally (Backend)

```bash
cd server
npm install
npm run dev
```

Backend runs at:
- http://localhost:5000

---

## 2) Run Locally (Frontend)

```bash
cd client
npm install
npm run dev
```

Frontend runs at:
- http://localhost:5173

---

## API Endpoints

### Auth
- POST /api/auth/register
- POST /api/auth/login

### Posts
- GET /api/posts
- GET /api/posts/:id
- POST /api/posts
- PUT /api/posts/:id
- DELETE /api/posts/:id

### Comments
- POST /api/posts/:id/comments

---

## Deployment

- Frontend: Vercel
- Backend: Render

---

## Future Improvements

- Pagination
- Likes / bookmarks
- User profiles
- Unit tests
