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


## ⚙️ Installation & Setup

### 📥 Clone Repositories

# Clone Frontend
```bash
git clone https://github.com/Programming-Hero-Web-Course4/b11a11-client-side-CodesWithRakib.git
cd b11a11-client-side-CodesWithRakib
npm install
npm run dev
```
# Clone Backend
```bash
git clone https://github.com/Programming-Hero-Web-Course4/b11a11-server-side-CodesWithRakib.git
cd b11a11-server-side-CodesWithRakib
npm install
npm run dev
```

---

## 🔒 Environment Variables

### 🔹 Client (.env)

```env
VITE_API_KEY=your_firebase_key
VITE_AUTH_DOMAIN=your_firebase_auth
VITE_PROJECT_ID=your_project_id
VITE_STORAGE_BUCKET=your_storage_bucket
VITE_MESSAGING_SENDER_ID=your_sender_id
VITE_APP_ID=your_app_id
VITE_API_URL=https://backend-eta-five-56.vercel.app
VITE_CLOUD_NAME=your_cloudinary_name
```

### 🔹 Server (.env)

```env
PORT=5000
MONGO_URI=mongodb+srv://your_mongo_uri
JWT_SECRET=your_secret
CLOUDINARY_NAME=your_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
```

---

## 📤 Image Upload

- Users can upload product images using Cloudinary
- Supported on both **Add** and **Update** product forms
- Upload triggered through a secure backend API

---

## 🚀 Deployment

### 🔹 Frontend (Firebase)

```bash
npm run build
firebase deploy
```

### 🔹 Backend (Vercel Serverless)

- Routes inside `/api/` folder
- Export handlers using CommonJS/ES6
- Follow [Vercel Docs](https://vercel.com/docs/functions) for structure

---

## 🧪 Testing

- Backend routes tested via Postman
- Firebase test users used for auth
- UI feedback tested via forms, toasts, and edge cases

---

## 🔧 Future Improvements

- Stripe Payment Integration
- Admin Dashboard
- Seller Verification Process
- Order Management System

---

## 🤝 Contributing

Contributions, suggestions, and forks are welcome!

- Check [Issues](https://github.com/codeswithrakib/globira/issues)
- Submit a PR or feedback

Please follow the [contribution guidelines](CONTRIBUTING.md) for collaboration.

---

## 📄 License

Licensed under the **MIT License** — see the [LICENSE](LICENSE) file.

---

## 📫 Contact

📧 Email: [codeswithrakib@gmail.com](mailto:codeswithrakib@gmail.com)
🔗 LinkedIn: [Rakib Islam](https://linkedin.com/in/codeswithrakib)

---

## 🧑‍🎓 Author

Made with 💻 by **Md. Rakib Islam**
Globira Project © 2025

---
