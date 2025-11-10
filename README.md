# 🔐 Secure Role-Based Access Control (RBAC) Web Portal


---

## 🚀 Live Demo

- **Frontend (Vercel):** [https://my-rbac-app.vercel.app](https://my-rbac-app.vercel.app/)  
- **Backend API (Render):** [https://my-rbac-app.onrender.com](https://my-rbac-app.onrender.com)

---

## 📖 Project Overview

This project is a **full-stack web application** designed to demonstrate a **secure and scalable implementation of Role-Based Access Control (RBAC)**.  
Built using **MERN stack principles**, it addresses the critical security risk of **“Broken Access Control” (OWASP Top 10 #1)** by enforcing strict permission checks on both the frontend and backend.

### System Roles

- 🛡️ **Admin:** Full system access (Create, Read, Update, Delete **any** content).  
- ✍️ **Editor:** Can create and edit/delete **only their own** content.  
- 👀 **Viewer:** Read-only access to public content.

---

## ✨ Key Features

- **Secure Authentication:** Uses **JSON Web Tokens (JWT)** for stateless, tamper-proof authentication.  
- **Dual-Layer Authorization:**  
  - **UI Guarding:** Implemented with a React Higher-Order Component (**PermissionGate**) to dynamically hide/disable restricted UI elements.  
  - **API Enforcement:** Node.js middleware (**authorize**) rigorously validates every request on the backend.  
- **Row-Level Security:** Editors cannot alter data they don’t own, even if permissions exist.  
- **Modern UI/UX:** Responsive, professional interface built using **React** and **Tailwind CSS**.

---

## 📸 Screenshots & Demo
- **Login Page:**

  ![Login Page Screenshot](https://github.com/ravishankar1810/MY-RBAC-APP/blob/400648caddb7e9b7667799e13ac41e949ffd8948/Screenshot%202025-11-10%20005122.png?raw=true)

- **Admin page:** 

  ![admin page](https://github.com/ravishankar1810/MY-RBAC-APP/blob/bde10c60b6d27d89f2e4f6196597f4da4620018f/Screenshot%202025-11-10%20121046.png)

- **Editor page:**

![edittor page](https://github.com/ravishankar1810/MY-RBAC-APP/blob/0d32e7907a4b958dff66068909214805107f9acd/Screenshot%202025-11-10%20121734.png)



### [🎥 Video Walkthrough](https://youtu.be/4dNuVgB-4f4)
[![Watch the video](https://img.youtube.com/vi/4dNuVgB-4f4/maxresdefault.jpg)](https://youtu.be/4dNuVgB-4f4)



### 🖥️ Application Screenshots

#### 🔑 Secure Login Screen  
#### 🛡️ Admin Dashboard (Full Access)
- Clear role-based entry points  
- Create, Edit, and Delete for all posts  

#### ✍️ Editor Dashboard (Restricted)
- Can only edit own posts  
- Disabled action buttons for others  

#### 👀 Viewer Dashboard (Read-Only)
- View-only mode  
- No action buttons visible  

> **Note:** Create a folder named `screenshots` in your project and add images (e.g., `login.png`, `admin-dashboard.png`, etc.) to display them properly.

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-------------|
| **Frontend** | React.js, Vite, Tailwind CSS, Lucide React (Icons) |
| **Backend** | Node.js, Express.js |
| **Security** | JSON Web Token (JWT), CORS |
| **Deployment** | Vercel (Client), Render (Server) |

---

## 🏃‍♂️ How to Run Locally

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/YOUR_GITHUB_USERNAME/MY-RBAC-APP.git
cd MY-RBAC-APP
```
### 2️⃣ Setup & Run Backend Server
```
cd server
npm install
node server.js
# Server will start on http://localhost:3001
```
### 3️⃣ Setup & Run Frontend Client (in a new terminal)
```
# From root folder
npm install
npm run dev
# Client will start on http://localhost:5173
```

### 👥 Contributors
| Name           | Roll Number |
| -------------- | ----------- |
| Ravi Shankar   | 23BCS11920  |
| Rishu Kumar    | 23BCS10208  |
| Ayush Jaswal   | 23BCS11532  |
| Devesh Rajpoot | 23BCS13411  |

## Supervisor: Suyash Gupta (T2191)



