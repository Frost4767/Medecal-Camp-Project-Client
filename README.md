# 🏥 Medi Camp

A modern and responsive web application to manage and organize medical camps seamlessly. From registration to payment, confirmation, and participant feedback — everything in one place.

---

## 🌐 Live Site
🔗 [Visit the Live Website](https://comfy-peony-c583b0.netlify.app)

## 👨‍⚕️ Organizer Credentials
- **Username (Email):** `admin@gmail.com`
- **Password:** `Admin1`

---

## 🖼 Screenshot
![Medi Camp Screenshot](screenshot.png) <!-- Replace with actual screenshot path -->

---

## 🛠 Tech Stack & Tools

- **Frontend:** React, Tailwind CSS, Framer Motion, AOS
- **Backend:** Node.js, Express.js, MongoDB
- **Authentication:** Firebase Auth + Firebase Admin SDK
- **Payments:** Stripe Integration
- **State Management:** React Query
- **Forms:** React Hook Form
- **UI Libraries:** Material Tailwind, Headless UI, React Icons
- **Charts & Animations:** Recharts, Lottie, Framer Motion
- **Others:** Axios, React Toastify, SweetAlert2

---

## 🔥 Core Features

- 🔐 **Firebase Authentication** – User login/signup with secure token-based backend protection.
- 🧑‍⚕️ **Camp Organizer Dashboard** – Manage camps, view participants, and confirm registrations.
- 📝 **Camp Registration** – Participants can register for camps with detailed personal and emergency information.
- 💳 **Stripe Payment Integration** – Smooth and secure payment system with transaction history.
- 🧾 **Payment History** – View all past transactions with payment status and confirmation updates.
- 🚫 **Conditional Cancellation** – Unpaid participants can cancel their registration anytime before payment.
- ✅ **Confirmation System** – After successful payment, participant status updates to 'Confirmed'.
- 💬 **Feedback System** – Participants can give feedback after payment, shown on the landing page.
- 🔍 **Search & Pagination** – Powerful search by camp name/date/healthcare professional and paginated tables.
- 📊 **Statistics & Analytics** – Interactive charts for participants and camp data via Recharts.

---

## 📦 Dependencies

- **Frontend:** react, react-dom, tailwindcss, framer-motion, aos, react-query, react-hook-form, material-tailwind, headlessui, react-icons, recharts, lottie-react, axios, react-toastify, sweetalert2
- **Backend:** express, mongodb, firebase-admin, stripe, cors, dotenv

---

## ⚙️ Installation & Local Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/medi-camp.git
   cd medi-camp
Setup Backend

bash
Copy
Edit
cd backend
npm install
Create .env file with:

ini
Copy
Edit
PORT=5000
MONGODB_URI=your_mongo_connection_string
FIREBASE_PROJECT_ID=your_firebase_project_id
FIREBASE_CLIENT_EMAIL=your_firebase_client_email
FIREBASE_PRIVATE_KEY=your_firebase_private_key
STRIPE_SECRET_KEY=your_stripe_secret_key
bash
Copy
Edit
npm run start
Setup Frontend

bash
Copy
Edit
cd frontend
npm install
Create .env file with:

ini
Copy
Edit
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
VITE_BACKEND_URL=http://localhost:5000
bash
Copy
Edit
npm run dev
Open in Browser

arduino
Copy
Edit
http://localhost:5173
