/**
 * The NextSpark program, transcribed from the owner's curriculum.
 * Facts only: nothing here is invented. Fees, intake dates, delivery format
 * and mentor details are not known yet and are deliberately absent.
 */

export const program = {
  name: "Full-Stack Web Development & IT Industrial Training Program",
  shortName: "Full-stack web development and IT industrial training",
  weeks: 16,
  units: 19,
  industrySessions: 3,
  weeklyHours: "4–6 hours",
  approach: [
    "Practical learning",
    "industrial exposure",
    "project-based development",
  ],
  philosophy:
    "Learn technology. Experience industry. Build professional excellence.",
  technologies: [
    "HTML",
    "CSS",
    "Tailwind CSS",
    "JavaScript",
    "React.js",
    "Next.js",
    "Node.js",
    "Express.js",
    "MongoDB",
    "Mongoose",
    "Git",
    "GitHub",
    "GitHub Actions",
    "CI/CD",
    "Hosting",
    "Odoo",
  ],
  prerequisites: [
    "Basic computer literacy.",
    "No previous programming experience required.",
    "Interest in software development and technology.",
    "Willingness to complete practical assignments.",
  ],
} as const;

export type Week = {
  n: number;
  title: string;
  objective: string;
  topics: string[];
  assignment: string;
  assessment: string;
};

export type Phase = {
  n: number;
  id: string;
  title: string;
  weeks: Week[];
};

export const phases: Phase[] = [
  {
    n: 1,
    id: "foundations",
    title: "Web development foundations",
    weeks: [
      {
        n: 1,
        title: "HTML fundamentals",
        objective:
          "Understand the structure and semantic foundation of web applications.",
        topics: [
          "Introduction to HTML",
          "HTML document structure",
          "Elements, tags, and attributes",
          "Headings, paragraphs, and links",
          "Images and multimedia",
          "Lists and tables",
          "Forms and input elements",
          "Semantic HTML",
          "Basic accessibility",
        ],
        assignment:
          "Build a personal portfolio website structure using HTML.",
        assessment: "HTML quiz and code review.",
      },
      {
        n: 2,
        title: "CSS and responsive web design",
        objective:
          "Develop the ability to create visually appealing and responsive websites.",
        topics: [
          "CSS fundamentals",
          "Selectors and specificity",
          "Colors, typography, and backgrounds",
          "Box model",
          "Margin and padding",
          "Display and positioning",
          "Flexbox",
          "CSS Grid",
          "Responsive design",
          "Media queries",
          "Transitions and animations",
        ],
        assignment:
          "Style the HTML portfolio website and make it responsive.",
        assessment: "UI implementation and responsive design review.",
      },
      {
        n: 3,
        title: "Tailwind CSS",
        objective:
          "Learn utility-first CSS and modern frontend styling workflows.",
        topics: [
          "Introduction to Tailwind CSS",
          "Installation and configuration",
          "Utility classes",
          "Responsive breakpoints",
          "Flexbox and Grid",
          "Typography and spacing",
          "Colors and backgrounds",
          "Hover and focus states",
          "Reusable UI patterns",
          "Component-based styling",
        ],
        assignment: "Rebuild the previous portfolio using Tailwind CSS.",
        assessment: "Practical UI submission.",
      },
      {
        n: 4,
        title: "JavaScript fundamentals",
        objective:
          "Understand programming fundamentals and develop problem-solving skills.",
        topics: [
          "Introduction to JavaScript",
          "Variables and data types",
          "Operators",
          "Conditional statements",
          "Loops",
          "Functions",
          "Arrays and objects",
          "Array methods",
          "DOM manipulation",
          "Event handling",
          "ES6+ features",
          "Basic debugging",
        ],
        assignment:
          "Build an interactive To-Do application using JavaScript.",
        assessment: "Coding challenges and practical test.",
      },
    ],
  },
  {
    n: 2,
    id: "frontend",
    title: "Frontend development",
    weeks: [
      {
        n: 5,
        title: "React.js introduction",
        objective: "Understand component-based frontend development.",
        topics: [
          "Introduction to React",
          "React project setup",
          "JSX",
          "Components",
          "Props",
          "State management",
          "Event handling",
          "Conditional rendering",
          "Component composition",
          "Reusable components",
        ],
        assignment:
          "Build a counter application and user profile card interface.",
        assessment: "Component implementation and code review.",
      },
      {
        n: 6,
        title: "Full-stack project structure and development environment",
        objective:
          "Understand how professional frontend and backend applications are structured.",
        topics: [
          "Frontend vs backend architecture",
          "Client-server communication",
          "Project folder structure",
          "Environment setup",
          "Package management with npm",
          "Development server",
          "Routing fundamentals",
          "Environment variables",
          "Introduction to Git and GitHub",
          "Connecting frontend and backend projects",
        ],
        assignment:
          "Create a full-stack project skeleton with separate frontend and backend structures.",
        assessment: "Project structure inspection.",
      },
      {
        n: 7,
        title: "React hooks and state management",
        objective:
          "Build interactive applications and manage component state effectively.",
        topics: [
          "useState",
          "useEffect",
          "useRef",
          "Custom hooks",
          "Component lifecycle concepts",
          "State management",
          "Props drilling",
          "Form handling",
          "Loading and error states",
        ],
        assignment:
          "Build a weather application using React state and hooks.",
        assessment: "Functional implementation and review.",
      },
      {
        n: 8,
        title: "API integration and data fetching",
        objective:
          "Connect frontend applications with external APIs and dynamically display data.",
        topics: [
          "Introduction to REST APIs",
          "HTTP methods",
          "Fetch API",
          "Axios",
          "JSON data handling",
          "API requests and responses",
          "Rendering dynamic lists",
          "Loading states",
          "Error handling",
          "Search and filtering",
          "Pagination fundamentals",
        ],
        assignment:
          "Build a dynamic application that fetches and displays posts from an API.",
        assessment: "Live API integration and practical submission.",
      },
    ],
  },
  {
    n: 3,
    id: "backend",
    title: "Backend and database development",
    weeks: [
      {
        n: 9,
        title: "Node.js and Express.js",
        objective:
          "Understand server-side JavaScript and backend application development.",
        topics: [
          "Introduction to Node.js",
          "Node.js runtime",
          "npm and package management",
          "Express.js installation",
          "Server creation",
          "Routing",
          "Request and response",
          "Middleware",
          "HTTP status codes",
          "REST API fundamentals",
          "API testing with Postman",
        ],
        assignment: "Create a basic Express server with JSON API endpoints.",
        assessment: "API functionality review.",
      },
      {
        n: 10,
        title: "Backend setup and frontend integration",
        objective: "Connect frontend applications with backend services.",
        topics: [
          "Backend project architecture",
          "Express application structure",
          "API endpoint development",
          "Environment variables",
          "Middleware implementation",
          "CORS",
          "Request validation",
          "Frontend-backend integration",
          "API testing",
          "Error handling",
        ],
        assignment: "Connect a React application with an Express backend.",
        assessment: "Functional integration test.",
      },
      {
        n: 11,
        title: "MongoDB and database management",
        objective:
          "Understand database architecture and manage application data.",
        topics: [
          "Introduction to databases",
          "SQL vs NoSQL overview",
          "MongoDB fundamentals",
          "Database and collection",
          "Documents and BSON",
          "MongoDB Atlas",
          "Database connection",
          "Mongoose introduction",
          "Schema and models",
          "Data relationships",
          "Basic data validation",
        ],
        assignment:
          "Create a user management database and connect it to the backend.",
        assessment: "Database connection and API response validation.",
      },
      {
        n: 12,
        title: "CRUD operations and REST API development",
        objective:
          "Develop complete backend functionality using database-driven APIs.",
        topics: [
          "Create operations",
          "Read operations",
          "Update operations",
          "Delete operations",
          "Mongoose queries",
          "API architecture",
          "Request validation",
          "Error handling",
          "Search and filtering",
          "Pagination",
          "Basic authentication concepts",
        ],
        assignment:
          "Build a Product Management System API with complete CRUD functionality.",
        assessment: "API endpoint testing and code review.",
      },
    ],
  },
  {
    n: 4,
    id: "fullstack",
    title: "Next.js and full-stack application development",
    weeks: [
      {
        n: 13,
        title: "Next.js introduction and project setup",
        objective:
          "Understand Next.js and modern full-stack React development.",
        topics: [
          "Introduction to Next.js",
          "Next.js App Router",
          "Project initialization",
          "Folder structure",
          "File-based routing",
          "Layouts and pages",
          "Server and Client Components",
          "Navigation",
          "Dynamic routes",
          "Metadata fundamentals",
        ],
        assignment:
          "Create a Next.js project with multiple pages and reusable components.",
        assessment: "Project structure and code submission.",
      },
      {
        n: 14,
        title: "Static website development with Next.js",
        objective: "Build optimized websites using Next.js features.",
        topics: [
          "Static rendering",
          "Server-side rendering overview",
          "Data fetching",
          "Server Components",
          "Dynamic data",
          "Image optimization",
          "Font optimization",
          "SEO fundamentals",
          "Metadata",
          "Deployment preparation",
        ],
        assignment:
          "Build a modern personal blog or business website using Next.js.",
        assessment: "UI, SEO, and deployment readiness review.",
      },
      {
        n: 15,
        title: "Next.js full-stack application development",
        objective:
          "Combine frontend and backend functionality to build production-oriented applications.",
        topics: [
          "Next.js full-stack architecture",
          "App Router architecture",
          "API Routes and Route Handlers",
          "Server-side data handling",
          "Database integration",
          "Authentication fundamentals",
          "Protected routes",
          "Client-server integration",
          "Form submission",
          "Data validation",
          "Application security fundamentals",
        ],
        assignment:
          "Build a full-stack Task Management System using Next.js and MongoDB.",
        assessment: "Functional application and code review.",
      },
      {
        n: 16,
        title: "Real-time project practice and industrial training",
        objective:
          "Apply technical knowledge in a collaborative, industry-oriented project environment.",
        topics: [
          "Project planning",
          "Requirement analysis",
          "Task breakdown",
          "GitHub repository management",
          "Team collaboration",
          "Branching strategy",
          "Pull requests",
          "Code review",
          "Debugging",
          "Testing",
          "Project documentation",
          "Final deployment preparation",
          "Project presentation",
        ],
        assignment:
          "Complete a full-stack capstone project in a team or individual environment.",
        assessment:
          "GitHub repository, working application, documentation, live deployment, technical demonstration and final presentation.",
      },
    ],
  },
];

export type IndustrySession = {
  n: number;
  when: string;
  title: string;
  objective: string;
  covers: string[];
  lab: string;
  deliverables: string[];
};

export const industrySessions: IndustrySession[] = [
  {
    n: 1,
    when: "Before week 01",
    title: "The real-life software development process and industry workflow",
    objective:
      "How professional software companies plan, develop, test, deliver and maintain software products.",
    covers: [
      "How software companies and their teams operate",
      "The software development life cycle, from requirement to maintenance",
      "Task management, Git workflow, pull requests and code review",
      "Professional communication, reporting and deadlines",
    ],
    lab: "Analyze a sample software project and follow its complete journey from client requirement to production deployment.",
    deliverables: [],
  },
  {
    n: 17,
    when: "After week 16",
    title: "DevOps engineering: CI/CD pipeline and hosting",
    objective:
      "Deployment automation and the real-world operational side of software development.",
    covers: [
      "DevOps fundamentals",
      "Git and GitHub workflow with GitHub Actions",
      "CI/CD pipeline architecture, builds, tests and secrets",
      "Hosting, domains, DNS and server basics",
    ],
    lab: "Deploy a full-stack application using GitHub Actions and a hosting environment.",
    deliverables: [
      "GitHub repository",
      "CI/CD workflow file",
      "successful build pipeline",
      "automated deployment",
      "live application URL",
    ],
  },
  {
    n: 18,
    when: "After week 16",
    title: "Odoo development: ERP and business applications",
    objective:
      "Enterprise software development, and how business applications are built using Odoo.",
    covers: [
      "ERP fundamentals and Odoo architecture",
      "Development environment, Python and PostgreSQL",
      "Models, ORM and business logic",
      "XML views, menus and actions",
      "Users, groups and access control",
    ],
    lab: "Build a basic Employee Management or Task Management module in Odoo.",
    deliverables: [
      "Custom Odoo module",
      "Python models",
      "XML views",
      "menu and action configuration",
      "access control configuration",
      "working module demonstration",
    ],
  },
];

/** The expected outcome of Session 01, quoted from the curriculum. */
export const industryStatement =
  "Software development is not only about writing code; it is a complete professional engineering process.";

export const capstone = {
  when: "Weeks 15–16",
  objective:
    "Build and deploy a complete full-stack application integrating the technical concepts covered throughout the training program.",
  suggestedProjects: [
    "Task Management System",
    "E-commerce Management Dashboard",
    "Student Management System",
    "Project Management Application",
    "Employee Management System",
    "Learning Management System",
  ],
  requiredFeatures: [
    "Responsive frontend",
    "Backend API",
    "Database integration",
    "CRUD functionality",
    "Authentication",
    "Data validation",
    "Error handling",
    "GitHub repository",
    "Deployment",
  ],
  deliverables: [
    "Project source code",
    "GitHub repository",
    "Working application",
    "Project documentation",
    "Live deployment",
    "Final presentation and demonstration",
  ],
} as const;

/** The recommended evaluation model. Weights sum to 100. */
export const evaluation = [
  { area: "Capstone project", weight: 40 },
  { area: "Weekly assignments and practical work", weight: 20 },
  { area: "Technical assessments", weight: 20 },
  { area: "Industrial workflow and collaboration", weight: 10 },
  { area: "DevOps and Odoo practical sessions", weight: 10 },
] as const;

export const careerPreparation = [
  "Professional portfolio development",
  "GitHub profile optimization",
  "CV and LinkedIn preparation",
  "Technical interview preparation",
  "Real-world project presentation",
  "Internship preparation",
  "Professional communication",
  "Career guidance",
] as const;

export const futurePaths = [
  "TypeScript",
  "Advanced React and Next.js",
  "Advanced backend engineering",
  "PostgreSQL",
  "Docker and Kubernetes",
  "AWS and cloud engineering",
  "Advanced DevOps",
  "Advanced Odoo development",
  "Software architecture",
] as const;

export const certificate =
  "Learners who successfully complete the program, the required assignments, the capstone project and the practical assessments may receive a program completion certificate.";

export const faqs = [
  {
    q: "Do I need to know how to code before I start?",
    a: "No. Previous programming experience is not required. You need basic computer literacy, an interest in software development and technology, and the willingness to complete the practical assignments.",
  },
  {
    q: "How much time does the program take?",
    a: "The core curriculum runs for 16 weeks, with a recommended commitment of 4–6 hours a week. Three industry sessions sit around it: one before week 01 and two after week 16.",
  },
  {
    q: "What will I have at the end?",
    a: "A capstone you built and deployed: its source code in a GitHub repository, a working application, project documentation, a live deployment, and a final presentation and demonstration. The weekly assignments also leave you with a portfolio site, several React applications and working APIs.",
  },
  {
    q: "Is there a certificate?",
    a: certificate,
  },
  {
    q: "What can I learn after this program?",
    a: `The curriculum points to these next steps: ${futurePaths.join(", ")}.`,
  },
] as const;

export const pad = (n: number) => String(n).padStart(2, "0");
