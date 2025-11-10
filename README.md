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
