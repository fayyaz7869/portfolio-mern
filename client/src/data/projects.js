const projects = [
  {
    title: "ServeConnect",
    subtitle: "Full-Stack NGO Management Platform",
    category: "mern",
    description:
      "A comprehensive MERN platform designed for non-profit organizations. Implemented JWT authentication and role-based access control (Admin / Volunteer), enabling streamlined campaign tracking, volunteer applications, and donation scheduling.",
    stack: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT Auth", "REST API"],
    live: "https://frontend-serveconnect.onrender.com",
    github: "https://github.com/fayyaz7869",
    featured: true,
  },
  {
    title: "Quiz Application",
    subtitle: "Real-time Timed Quiz Platform",
    category: "mern",
    description:
      "A distributed quiz system architected with decoupled frontend and backend services. Features live countdown timers, randomized question delivery, automated score calculations, and instantaneous result breakdown.",
    stack: ["React.js", "Node.js", "Express.js", "MongoDB", "CSS3"],
    github: "https://github.com/fayyaz7869/Quiz-frontend.git",
    githubSecondary: "https://github.com/fayyaz7869/quiz-backend.git",
    githubSecondaryLabel: "Backend API Repo",
    featured: true,
  },
  {
    title: "BeanConnect",
    subtitle: "Social Networking Platform",
    category: "mern",
    description:
      "A social networking application built from the ground up using the MERN stack. Includes user authentication, dynamic profile management, post creation and interaction feeds, and relational networking between community members.",
    stack: ["React.js", "Node.js", "Express.js", "MongoDB", "REST API"],
    github: "https://github.com/fayyaz7869/Beanconnect.git",
    featured: true,
  },
  {
    title: "To-Do List REST API",
    subtitle: "Enterprise Task Management Backend",
    category: "backend",
    description:
      "A structured RESTful API developed with Node.js and the Sequelize ORM against MySQL. Built with robust input sanitization, full CRUD task workflows, status filtering, and modular controller/route architectures tested via Postman.",
    stack: ["Node.js", "Express.js", "Sequelize ORM", "MySQL", "REST API"],
    github: "https://github.com/fayyaz7869/Sequeliz-backendProject",
    featured: false,
  },
  {
    title: "Sports League Management",
    subtitle: "Desktop System & Data Layer",
    category: "java",
    description:
      "A desktop tournament and league data application engineered with Core Java. Leverages JDBC for transactional SQL database connectivity, managing team rosters, match schedules, and points table calculations.",
    stack: ["Core Java", "JDBC", "MySQL", "OOP Design"],
    github: "https://github.com/fayyaz7869/java_Project1",
    featured: false,
  },
];

export default projects;
