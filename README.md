# 🛒 E-Commerce Full Stack Application (MERN)

A production-ready E-commerce platform built using the MERN stack (MongoDB, Express, React, Node.js).  
Includes user authentication, dynamic product search, cart system, and responsive UI.

---

## 🌐 Live Demo  
🔗 [Frontend (Netlify)](https://your-frontend-url.netlify.app)  
🔗 [Backend API (Render)](https://shop-backend-koyj.onrender.com)

![Homepage Screenshot](./screenshots/shop.png)

---

## ✨ Features

- 🔍 Product listing with category filters & search suggestions
- 🛒 Shopping cart with quantity update and item removal
- 🔐 User authentication (Signup / Login / Logout) with JWT
- 📦 Order management for authenticated users
- 🔄 Navigation using React Router
- 📱 Fully responsive design (mobile-first)
- 🚀 Deployment with **Render** (backend) & **Netlify** (frontend)

---

## 🧠 What I Implemented

- Full-stack integration using the MERN stack
- Authentication flow with JWT & HTTP-only cookies
- Dynamic search with real-time suggestions from API
- Persistent cart state with context and localStorage
- Modular React components and clean folder structure
- Environment-based configuration for deployment
- ---

- 📚 What I Learned
	•	Building secure and scalable authentication with JWT
	•	Connecting front and back ends using RESTful APIs
	•	Managing state effectively in React (Context + LocalStorage)
	•	Deploying full-stack applications to the cloud (CI/CD)

---

## 🧱 Tech Stack

**Frontend:** React, React Router, Context API, Styled Components  
**Backend:** Node.js, Express.js  
**Database:** MongoDB Atlas  
**Authentication:** JWT, bcrypt  
**Deployment:** Render (Server), Netlify (Client)

🚀 Future Enhancements
	•	🧑‍💼 Admin dashboard to manage products and orders
	•	💳 Stripe/PayPal integration for payments
	•	⭐ Product ratings, reviews, and wishlist
	•	🧭 SEO improvements and accessibility (a11y)

⸻
---

## 🧪 How to Run Locally

# Start the Frontend
cd frontend
npm install
npm run dev

# Start the Backend
cd backend
npm install
npm run dev

## Add Environment Variables
JWTSECRET=cartwish_secret
DATABASE=mongodb+srv://shmoelyitzhak:ePuKbhk2f2lU3n4N@cluster0.hnc0cyv.mongodb.net/cartwish
PORT=3000
