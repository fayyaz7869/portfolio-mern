// In development, Vite proxies /api/* to http://localhost:5000 (see vite.config.js),
// so API_BASE can stay empty. In production (Render), set VITE_API_URL to your
// deployed backend's URL, e.g. https://fayyaz-portfolio-api.onrender.com
export const API_BASE = import.meta.env.VITE_API_URL || "";
