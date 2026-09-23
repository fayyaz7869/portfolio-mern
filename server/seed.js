import dotenv from "dotenv";
import connectDB from "./config/db.js";
import Project from "./models/Project.js";

dotenv.config();

const projects = [
  {
    title: "ServeConnect",
    subtitle: "NGO management platform",
    description:
      "A full-stack platform for NGOs with JWT authentication and role-based access control. Handles volunteer registration and campaign management end to end.",
    stack: ["React", "Node.js", "Express", "MongoDB", "JWT"],
    live: "https://frontend-serveconnect.onrender.com",
    github: "https://github.com/fayyaz7869",
    featured: true,
    order: 1,
  },
  {
    title: "Quiz Application",
    subtitle: "Timed quiz platform, MERN",
    description:
      "A quiz app split into a dedicated frontend and backend — question delivery, answer scoring and results, built as two connected services.",
    stack: ["React", "Node.js", "Express", "MongoDB"],
    github: "https://github.com/fayyaz7869/Quiz-frontend.git",
    githubSecondary: "https://github.com/fayyaz7869/quiz-backend.git",
    githubSecondaryLabel: "Backend repo",
    featured: true,
    order: 2,
  },
  {
    title: "BeanConnect",
    subtitle: "Social media platform",
    description:
      "Core social-platform features built on the MERN stack — user profiles, posts and connections between users.",
    stack: ["React", "Node.js", "Express", "MongoDB"],
    github: "https://github.com/fayyaz7869/Beanconnect.git",
    featured: true,
    order: 3,
  },
  {
    title: "To-Do List API",
    subtitle: "REST API, Node.js + Sequelize",
    description: "A task management REST API built with Node.js and the Sequelize ORM on top of MySQL.",
    stack: ["Node.js", "Sequelize", "MySQL"],
    github: "https://github.com/fayyaz7869/Sequeliz-backendProject",
    featured: false,
    order: 4,
  },
  {
    title: "Sports League Management",
    subtitle: "Desktop data system, Java + JDBC",
    description: "A league and team data management system built with core Java, using JDBC for database connectivity.",
    stack: ["Java", "JDBC"],
    github: "https://github.com/fayyaz7869/java_Project1",
    featured: false,
    order: 5,
  },
];

(async () => {
  await connectDB();
  await Project.deleteMany({});
  await Project.insertMany(projects);
  console.log(`Seeded ${projects.length} projects.`);
  process.exit(0);
})();
