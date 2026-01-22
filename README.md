# 📦 SubDub – Subscription Management System

SubDub is a comprehensive Node.js & Express application for managing subscriptions with automated email reminders using Upstash Workflow.

---

## 🚀 Features

- 🔐 JWT-based authentication (Register, Login, Logout)
- 📋 Subscription CRUD operations
- ⏰ Automated email reminders (7, 5, 2, 1 days before renewal)
- 🔁 Auto-renewal date calculation
- 🛡️ Arcjet security (rate limiting, bot detection, shield)
- 📧 Responsive HTML email templates
- 🗄️ MongoDB with Mongoose ODM
- 🔄 Upstash Workflow & QStash scheduling

---

## 🛠️ Tech Stack

- Runtime: Node.js (ES Modules)
- Framework: Express.js
- Database: MongoDB + Mongoose
- Authentication: JWT, bcryptjs
- Workflow: Upstash Workflow & QStash
- Security: Arcjet
- Email: Nodemailer (Gmail)
- Dates: Day.js, Moment.js
- Environment: dotenv

---

## 📁 Project Structure

```text
Subscription Tracker/
├── app.js
├── config/
│   ├── arcjet.js
│   ├── env.js
│   ├── nodemailer.js
│   └── upstash.js
├── controllers/
│   ├── auth.controller.js
│   ├── subscription.controller.js
│   ├── user.controller.js
│   └── workflow.controller.js
├── database/
│   └── mongodb.js
├── middlewares/
│   ├── arcjet.middleware.js
│   ├── auth.middleware.js
│   └── error.middleware.js
├── models/
│   ├── subscription.model.js
│   └── user.model.js
├── routes/
│   ├── auth.routes.js
│   ├── subscription.routes.js
│   ├── user.routes.js
│   └── workflow.routes.js
├── utils/
│   ├── email-template.js
│   └── send-email.js
├── .env.development.local
├── .env.production.local
└── package.json
```

---

## ⚙️ Installation

```bash
npm install
```

---

## 🔐 Environment Variables

Create `.env.development.local`

```env
PORT=5500
SERVER_URL=http://localhost:5500
NODE_ENV=development

DB_URI=mongodb://localhost:27017/subdub

JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d

ARCJET_KEY=your_arcjet_key

QSTASH_URL=your_qstash_url
QSTASH_TOKEN=your_qstash_token
QSTASH_CURRENT_SIGNING_KEY=your_current_signing_key
QSTASH_NEXT_SIGNING_KEY=your_next_signing_key

EMAIL_PASSWORD=your_gmail_app_password
```

---

## ▶️ Running the App

### Development
```bash
npm run dev
```

### Production
```bash
npm start
```

Server:
```
http://localhost:5500
```

---

## 📡 API Endpoints

### Authentication (`/api/v1/auth`)
- POST `/register`
- POST `/login`
- POST `/logout`

### Users (`/api/v1/users`)
- GET `/`
- GET `/:id` (auth required)

### Subscriptions (`/api/v1/subscriptions`)
- GET `/`
- GET `/:id`
- POST `/` (auth required)
- PUT `/:id`
- DELETE `/:id`
- PUT `/:id/cancel`
- GET `/user/:id`
- GET `/upcoming-renewals`

### Workflows (`/api/v1/workflows`)
- POST `/subscription/remainder`

---

## 🧪 Testing with HTTPie

### Register User
```bash
http POST http://localhost:5500/api/v1/auth/register \
  name="John Doe" \
  email="john@example.com" \
  password="securePass123"
```

### Login User
```bash
http POST http://localhost:5500/api/v1/auth/login \
  email="john@example.com" \
  password="securePass123"
```

### Create Subscription
```bash
http POST http://localhost:5500/api/v1/subscriptions \
  Authorization:"Bearer YOUR_JWT_TOKEN" \
  name="Netflix Premium" \
  price:=15.99 \
  currency="USD" \
  frequency="monthly" \
  category="entertainment" \
  paymentMethod="credit_card"
```

---

## 📊 Subscription Model

Fields:
- name (required)
- price (required)
- currency (USD, EUR, GBP, INR, JPY)
- frequency (daily, weekly, monthly, yearly)
- category (sports, entertainment, education, productivity, other)
- startDate
- renewalDate (auto-calculated)
- status (active, expired, cancelled)
- paymentMethod
- user

---

## 📧 Email Reminder System

- Triggered when subscription is created
- Managed using Upstash Workflow
- Reminder schedule:
  - 7 days before renewal
  - 5 days before renewal
  - 2 days before renewal
  - 1 day before renewal

---

## 🔒 Security

- Arcjet rate limiting
- Bot detection
- Shield protection
- JWT authentication
- bcrypt password hashing
- Centralized error handling

---

## 🐛 Error Handling

Handles:
- Mongoose validation errors
- Duplicate key errors (E11000)
- Invalid ObjectId
- JWT authentication errors
- Custom application errors

---

## ✉️ Gmail Setup

1. Enable 2FA
2. Generate App Password  
   https://myaccount.google.com/apppasswords
3. Use it as EMAIL_PASSWORD

---
