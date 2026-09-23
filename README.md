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

- **Resume**: replace `client/public/resume.pdf` with an updated file — the
  "Download resume" buttons link straight to it.
- **Photo**: swap `client/src/assets/profile.jpg` (there's also
  `profile-alt.jpg`, your other headshot, if you want to switch the look).
- **Projects**: edit `client/src/data/projects.js` (fallback/offline copy)
  and `server/seed.js` (what gets loaded into MongoDB), or `POST` new
  projects straight to `/api/projects`.
- **Copy** (about, skills, experience): edit the matching component in
  `client/src/components/`.

## Deploying

- **Frontend**: `npm run build` in `client/` produces a static `dist/`
  folder — deploy it to Vercel, Netlify, or similar.
- **Backend**: deploy `server/` to Render, Railway, or similar, set the
  `MONGO_URI` and `PORT` environment variables there, and point your
  deployed frontend's API calls at the backend's URL (update the fetch
  calls in `Projects.jsx` and `Contact.jsx`, or add a proxy/rewrite rule
  on your host).
