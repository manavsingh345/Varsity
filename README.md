# 📈Kite & Zerodha – Full Stack Stock Trading Platform

A modern and full-featured **Zerodha Clone** built with the MERN stack + Razorpay integration. This project replicates a complete online stock trading experience, including user authentication, dashboard analytics, live stock prices, order management, wallet system, and a support ticket system.

🚀 **Live Website:** [https://frontend-09yj.onrender.com](https://frontend-09yj.onrender.com)  
🔗 **Dashboard:** [https://dashboard-m8d9.onrender.com](https://dashboard-m8d9.onrender.com)  
🔧 **Backend API:** [https://backened-9xgc.onrender.com](https://backened-9xgc.onrender.com)  


---

## 🧠 Features

### ✅ Authentication & Authorization
- Secure signup & login using **JWT tokens**
- Protected routes for sensitive dashboard features
- Auto session storage in `localStorage`

### 📊 Stock Dashboard
- View user-specific **Holdings**, **Positions**, **Orders**
- View **real-time stock prices** using Finnhub API
- Easy navigation from dashboard to frontend

### 💰 Wallet & Razorpay Integration
- Razorpay checkout to **add funds**
- All transactions are saved in the backend (MongoDB)
- Funds reflected instantly in wallet

### 🛒 Order Management
- Place **BUY/SELL orders**
- Auto-updates Holdings and Positions
- Smart average price calculations on buys

### 📦 Holdings & Positions
- Real-time updated **Holdings & Positions** fetched by user
- Live stock updates through `GET /price/:symbol`

### 💬 Support Ticket System
- Fully working contact form using **Nodemailer**
- Separate `support-server` deployed to send emails securely
- Protected using CORS & validated inputs

---

## 🏗️ Tech Stack

| Layer        | Technologies |
|--------------|--------------|
| Frontend     | React, Vite, Tailwind, React Router |
| Dashboard    | React, Axios, Token Auth |
| Backend API  | Node.js, Express, MongoDB, JWT, Razorpay |
| Support      | Express, Nodemailer, Gmail API |
| APIs Used    | Finnhub (Live stock data), Razorpay (Payments) |
| Deployment   | Render (for backend, dashboard, support), Vercel/Render (frontend) |

---

## 🗂️ Folder Structure

