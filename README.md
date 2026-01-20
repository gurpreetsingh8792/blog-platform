\# Blog Platform (Full-Stack)



A full-stack blogging platform built with \*\*Node.js + Express\*\*, \*\*MongoDB Atlas\*\*, \*\*JWT Authentication\*\*, and \*\*React + Redux Toolkit\*\*. Users can register/login, create rich-text blog posts, edit/delete only their own posts, and comment on other users’ posts (authors cannot comment on their own posts). The UI is responsive and includes a mobile right-side menu.



---



\## Features



\### Authentication



\* Register with \*\*unique username\*\* (case-insensitive)

\* Login with email + password

\* JWT-based session handling (token stored client-side)

\* Logout clears session



\### Posts



\* Create a new post (title + rich text content using Quill editor)

\* View all posts list

\* View post details with formatted rich text content

\* Edit/update \*\*only your own\*\* posts

\* Delete \*\*only your own\*\* posts

\* Search posts by title (`q` query param)

\* Sort posts (newest/oldest/title)



\### Comments



\* Only logged-in users can comment

\* The post author \*\*cannot\*\* comment on their own post

\* Comment username is automatically taken from the logged-in user



\### UI / UX



\* Responsive Bootstrap UI

\* Mobile: right-side offcanvas menu

\* Rich text editor toolbar for headings, bold/italic, lists, links, blockquote, code block

\* Pasted plain text is preserved with paragraph spacing/new lines



---



\## Tech Stack



\### Frontend



\* React (Vite)

\* Redux Toolkit

\* React Router DOM

\* Bootstrap

\* React Quill (rich text editor)



\### Backend



\* Node.js

\* Express.js

\* MongoDB (Atlas)

\* Mongoose

\* JWT (jsonwebtoken)

\* bcryptjs



---



\## Project Structure



```

blog-platform/

&nbsp; client/        # React + Redux frontend (Vite)

&nbsp; server/        # Node/Express API + MongoDB

```



---



\## Prerequisites



\* Node.js (v18+ recommended)

\* npm (comes with Node)

\* MongoDB Atlas cluster + connection string



---



\## 1) Run Locally (Backend)



\### Step 1: Go to server folder



```bash

cd server

```



\### Step 2: Install dependencies



```bash

npm install

```



\### Step 3: Create `.env` file



Create a file: `server/.env`



Example:



```env

PORT=5000

MONGO\_URI=mongodb+srv://<username>:<password>@<cluster-name>.mongodb.net/blog\_platform?retryWrites=true\&w=majority

JWT\_SECRET=your\_super\_secret\_key

JWT\_EXPIRES\_IN=7d

```



\*\*Notes\*\*



\* Replace `<username>`, `<password>`, `<cluster-name>` with your Atlas details.

\* `JWT\_SECRET` should be a long random string.



\### Step 4: Start backend



If you use nodemon:



```bash

npm run dev

```



Or normal start:



```bash

npm start

```



Backend should run on:



\* `http://localhost:5000`



---



\## 2) Run Locally (Frontend)



\### Step 1: Open a new terminal and go to client folder



```bash

cd client

```



\### Step 2: Install dependencies



```bash

npm install

```



\### Step 3: Create `.env` file for frontend



Create a file: `client/.env`



Example:



```env

VITE\_API\_URL=http://localhost:5000/api

```



\### Step 4: Start frontend



```bash

npm run dev

```



Frontend runs on something like:



\* `http://localhost:5173`



---



\## 3) How to Use



1\. Open frontend URL in browser

2\. Register a new user

3\. Login

4\. Create a new post using the rich text editor

5\. View posts list and click any post

6\. Comment on other users’ posts (you cannot comment on your own post)

7\. Edit/delete your own post from the post detail page



---



\## API Endpoints (Backend)



\### Auth



\* `POST /api/auth/register`

\* `POST /api/auth/login`



\### Posts



\* `GET /api/posts?q=\&sort=`



&nbsp; \* `q`: search title (optional)

&nbsp; \* `sort`: `new` (default), `old`, `title`

\* `GET /api/posts/:id`

\* `POST /api/posts` (protected)

\* `PUT /api/posts/:id` (protected, owner only)

\* `DELETE /api/posts/:id` (protected, owner only)



\### Comments



\* `POST /api/posts/:id/comments` (protected, non-owner only)



---



\## Password Rules (Register)



Password must:



\* be at least \*\*5 characters\*\*

\* start with a \*\*capital letter (A–Z)\*\*

\* contain at least \*\*one number (0–9)\*\*

\* contain at least \*\*one special symbol\*\* from: `! @ # $ % ^ \& \*`



Example: `A1@bc`



---



\## Environment Variables Summary



\### server/.env



\* `PORT`

\* `MONGO\_URI`

\* `JWT\_SECRET`

\* `JWT\_EXPIRES\_IN`



&nbsp;client/.env



\* `VITE\_API\_URL`



---

###Deployment: Vercel (frontend) + Render (backend)



\## Future Improvements



\* Pagination for posts list

\* Like / bookmark posts

\* User profile page

\* Better rich text sanitization + stricter allowed tags

\* Unit tests (Jest) for controllers and routes



---



