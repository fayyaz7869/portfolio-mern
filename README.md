# Fayyaz Mansoori — MERN Portfolio

A full-stack portfolio site: a React (Vite) frontend and an Express + MongoDB
backend. Projects are served from MongoDB (with a static fallback so the site
still works before you've seeded the database), and the contact form saves
messages into MongoDB.

## Structure

```
portfolio-mern/
├── client/     React frontend (Vite)
└── server/     Express + MongoDB backend
```

## 1. Set up MongoDB

Easiest option: create a free cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas),
create a database user, and copy the connection string. Or run MongoDB locally
and use `mongodb://localhost:27017/portfolio`.

## 2. Run the backend

```bash
cd server
npm install
cp .env.example .env
# edit .env and paste your MONGO_URI
npm run seed     # loads your 5 projects into the database (run once)
npm run dev       # starts the API on http://localhost:5000
```

## 3. Run the frontend

In a second terminal:

```bash
cd client
npm install
npm run dev        # starts the site on http://localhost:5173
```

Vite proxies `/api/*` requests to `http://localhost:5000`, so the two run
side by side during development with no extra config.

## What's wired up

- `GET /api/projects` — returns your projects from MongoDB (Projects
  section fetches this; falls back to the built-in list in
  `client/src/data/projects.js` if the API isn't reachable yet)
- `POST /api/contact` — saves a contact-form submission to MongoDB
- `GET /api/contact` — lists saved messages (handy for a future admin view)

## Editing your content

- **Resume Preview & Download**: `client/public/resume.pdf` is embedded inside the interactive `ResumeModal` so visitors can view it immediately without downloading, and click "Download PDF" anytime to save it.
- **Contact Form & Direct Email Delivery**:
  - Automatically delivers client messages directly to `fayyazmansoori.dev@gmail.com` using FormSubmit with reply-to headers so you can hit Reply directly in Gmail.
  - Concurrently saves messages to MongoDB `/api/contact` and supports Nodemailer if SMTP credentials are added to `server/.env`.
  - The first time someone submits the form, FormSubmit sends a 1-click confirmation email to `fayyazmansoori.dev@gmail.com`. Click "Activate" once, and all future client leads land straight in your inbox!
- **Projects**: edit `client/src/data/projects.js` and `server/seed.js`.
- **Photo**: `client/src/assets/profile.jpg`.

## Deploying Updates to Render

If your portfolio is hosted on Render:
1. Push your updated code to your GitHub repository:
   ```bash
   git add .
   git commit -m "Revamp portfolio: theme, contact form email delivery, resume viewer"
   git push origin main
   ```
2. Render will automatically detect the changes and redeploy!
   - Build Command: `npm install && npm run build` (inside `client`)
   - Publish Directory: `client/dist` (or `dist` depending on your Render root setting)
