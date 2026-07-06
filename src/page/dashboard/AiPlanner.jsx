import React, { useState } from 'react';
import { Sparkles, Loader2, CheckCircle, Clock, BookOpen, PenTool, RefreshCw, AlertCircle, ChevronDown, ChevronRight, Sliders, Save, ArrowRight, CheckCircle2, Circle, Target, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AiPlanner = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [generatedPlan, setGeneratedPlan] = useState(null);
  const [showMissingInfoModal, setShowMissingInfoModal] = useState(false);
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [isModifying, setIsModifying] = useState(false);
  
  // Missing Info State
  const [missingInfo, setMissingInfo] = useState({
    level: 'Intermediate',
    duration: 8,
    goal: 'Project'
  });

  // Approval Integrations State
  const [approvalIntegrations, setApprovalIntegrations] = useState({
    calendar: false,
    drive: false,
    dashboard: true
  });

  // Mock Roadmap Data - Updated Structure
  const mockRoadmap = {
    roadmap: [
      {
        phase: "Week 1 - Foundations of JavaScript & Node.js Basics",
        duration: "1 week",
        topics: [
          "JavaScript syntax and data types",
          "Control flow and functions",
          "Introduction to Node.js architecture",
          "Setting up Node.js environment",
        ],
        weekly_plan: {
          monday: {
            daily_study_hours: "3 hours",
            time_split: { theory: "2 hours", practice: "1 hour" },
            theory: {
              topics: [
                "JavaScript variables, const, let, var",
                "Primitive data types",
              ],
              checklist: [
                {
                  item: "Understand variable declarations",
                  status: "pending",
                },
                { item: "Identify data types", status: "pending" },
              ],
            },
            practice: {
              tasks: [
                "Write simple scripts printing values",
                "Experiment with type coercion",
              ],
              checklist: [
                { item: "Run scripts in Node REPL", status: "pending" },
                { item: "Document observations", status: "pending" },
              ],
            },
          },
          tuesday: {
            daily_study_hours: "3 hours",
            time_split: { theory: "2 hours", practice: "1 hour" },
            theory: {
              topics: [
                "Functions, arrow functions, scope",
                "Higher-order functions",
              ],
              checklist: [
                {
                  item: "Explain function declarations vs expressions",
                  status: "pending",
                },
                {
                  item: "Use arrow functions in examples",
                  status: "pending",
                },
              ],
            },
            practice: {
              tasks: [
                "Create reusable functions",
                "Implement map/filter/reduce on arrays",
              ],
              checklist: [
                {
                  item: "Solve array manipulation challenges",
                  status: "pending",
                },
                { item: "Review results in console", status: "pending" },
              ],
            },
          },
          wednesday: {
            daily_study_hours: "3 hours",
            time_split: { theory: "2 hours", practice: "1 hour" },
            theory: {
              topics: [
                "Control structures: if, switch, loops",
                "Error handling with try/catch",
              ],
              checklist: [
                { item: "Write conditional statements", status: "pending" },
                { item: "Demonstrate error handling", status: "pending" },
              ],
            },
            practice: {
              tasks: [
                "Build a simple calculator CLI",
                "Handle invalid inputs gracefully",
              ],
              checklist: [
                { item: "Test all operations", status: "pending" },
                { item: "Log errors to console", status: "pending" },
              ],
            },
          },
          thursday: {
            daily_study_hours: "3 hours",
            time_split: { theory: "2 hours", practice: "1 hour" },
            theory: {
              topics: [
                "Node.js runtime, event loop",
                "Modules: CommonJS vs ES6",
              ],
              checklist: [
                { item: "Explain event loop phases", status: "pending" },
                { item: "Differentiate module systems", status: "pending" },
              ],
            },
            practice: {
              tasks: [
                "Create a simple module exporting a function",
                "Import and use it in main file",
              ],
              checklist: [
                { item: "Run module example", status: "pending" },
                {
                  item: "Observe module caching behavior",
                  status: "pending",
                },
              ],
            },
          },
          friday: {
            daily_study_hours: "3 hours",
            time_split: { theory: "2 hours", practice: "1 hour" },
            theory: {
              topics: ["npm basics, package.json", "Semantic versioning"],
              checklist: [
                {
                  item: "Initialize a project with npm init",
                  status: "pending",
                },
                { item: "Explain version fields", status: "pending" },
              ],
            },
            practice: {
              tasks: [
                "Install a third‑party library (e.g., lodash)",
                "Use a lodash function",
              ],
              checklist: [
                { item: "Verify library works", status: "pending" },
                { item: "Document usage in README", status: "pending" },
              ],
            },
          },
          saturday: {
            daily_study_hours: "3 hours",
            time_split: { theory: "2 hours", practice: "1 hour" },
            theory: {
              topics: ["File system basics, reading/writing files"],
              checklist: [
                { item: "Explain fs module API", status: "pending" },
                { item: "Discuss async vs sync methods", status: "pending" },
              ],
            },
            practice: {
              tasks: [
                "Write a script that reads a JSON file and logs content",
                "Append data to a text file",
              ],
              checklist: [
                { item: "Handle file errors", status: "pending" },
                { item: "Confirm file updates", status: "pending" },
              ],
            },
          },
          sunday: { status: "OFF" },
        },
        projects: [
          {
            name: "CLI Calculator",
            description:
              "A command‑line calculator built using Node.js fundamentals, demonstrating functions, modules, and file I/O for logging.",
            skills_gained: [
              "JavaScript fundamentals",
              "Node.js module system",
              "npm usage",
              "File system operations",
            ],
          },
        ],
      },
      {
        phase: "Week 2 - Core Node.js APIs & Asynchronous Patterns",
        duration: "1 week",
        topics: [
          "Event-driven programming",
          "Callbacks and error‑first pattern",
          "Promises and async/await",
          "Timers and process management",
        ],
        weekly_plan: {
          monday: {
            daily_study_hours: "3 hours",
            time_split: { theory: "2 hours", practice: "1 hour" },
            theory: {
              topics: ["Event loop deep dive", "Callback conventions"],
              checklist: [
                { item: "Describe callback hell", status: "pending" },
                {
                  item: "Identify where callbacks are used in Node",
                  status: "pending",
                },
              ],
            },
            practice: {
              tasks: [
                "Create a simple event emitter",
                "Emit and listen to custom events",
              ],
              checklist: [
                { item: "Log event data", status: "pending" },
                {
                  item: "Remove listener after first call",
                  status: "pending",
                },
              ],
            },
          },
          tuesday: {
            daily_study_hours: "3 hours",
            time_split: { theory: "2 hours", practice: "1 hour" },
            theory: {
              topics: ["Promises: states and chaining"],
              checklist: [
                {
                  item: "Explain pending/fulfilled/rejected",
                  status: "pending",
                },
                { item: "Write promise chain examples", status: "pending" },
              ],
            },
            practice: {
              tasks: [
                "Convert a callback‑based function to return a Promise",
                "Handle errors with .catch",
              ],
              checklist: [
                {
                  item: "Test both success and failure paths",
                  status: "pending",
                },
                { item: "Document conversion steps", status: "pending" },
              ],
            },
          },
          wednesday: {
            daily_study_hours: "3 hours",
            time_split: { theory: "2 hours", practice: "1 hour" },
            theory: {
              topics: ["Async/Await syntax", "Error handling with try/catch"],
              checklist: [
                {
                  item: "Show async function return value",
                  status: "pending",
                },
                {
                  item: "Compare async/await vs promise chaining",
                  status: "pending",
                },
              ],
            },
            practice: {
              tasks: [
                "Rewrite previous promise example using async/await",
                "Introduce deliberate error to test catch",
              ],
              checklist: [
                { item: "Verify error is caught", status: "pending" },
                {
                  item: "Log results in formatted output",
                  status: "pending",
                },
              ],
            },
          },
          thursday: {
            daily_study_hours: "3 hours",
            time_split: { theory: "2 hours", practice: "1 hour" },
            theory: {
              topics: ["Timers: setTimeout, setInterval", "process.nextTick"],
              checklist: [
                { item: "Explain timer accuracy", status: "pending" },
                {
                  item: "Differentiate nextTick from setImmediate",
                  status: "pending",
                },
              ],
            },
            practice: {
              tasks: [
                "Create a countdown timer CLI",
                "Use process.nextTick to log before I/O",
              ],
              checklist: [
                { item: "Observe timer output", status: "pending" },
                { item: "Explain order of execution", status: "pending" },
              ],
            },
          },
          friday: {
            daily_study_hours: "3 hours",
            time_split: { theory: "2 hours", practice: "1 hour" },
            theory: {
              topics: ["Streams basics", "Readable vs Writable streams"],
              checklist: [
                { item: "Define stream backpressure", status: "pending" },
                {
                  item: "Identify common stream use‑cases",
                  status: "pending",
                },
              ],
            },
            practice: {
              tasks: [
                "Pipe a readable file stream to a writable stream",
                "Transform data while streaming",
              ],
              checklist: [
                { item: "Verify transformed output", status: "pending" },
                { item: "Handle stream errors", status: "pending" },
              ],
            },
          },
          saturday: {
            daily_study_hours: "3 hours",
            time_split: { theory: "2 hours", practice: "1 hour" },
            theory: {
              topics: ["Child processes", "Inter‑process communication"],
              checklist: [
                { item: "Explain spawn vs fork", status: "pending" },
                { item: "Describe message passing", status: "pending" },
              ],
            },
            practice: {
              tasks: [
                "Spawn a child process that runs a simple script",
                "Exchange messages between parent and child",
              ],
              checklist: [
                { item: "Log child output", status: "pending" },
                { item: "Terminate child gracefully", status: "pending" },
              ],
            },
          },
          sunday: { status: "OFF" },
        },
        projects: [
          {
            name: "Async File Processor",
            description:
              "A Node.js utility that reads large JSON files using streams, processes records asynchronously with promises, and writes results to a new file.",
            skills_gained: [
              "Streams",
              "Promises",
              "Async/Await",
              "Error handling",
              "Performance considerations",
            ],
          },
        ],
      },
      {
        phase: "Week 3 - Building Web Servers with Express.js",
        duration: "1 week",
        topics: [
          "Express fundamentals",
          "Routing and middleware",
          "Handling requests & responses",
          "Static file serving",
        ],
        weekly_plan: {
          monday: {
            daily_study_hours: "3 hours",
            time_split: { theory: "2 hours", practice: "1 hour" },
            theory: {
              topics: ["Express installation", "Creating an app instance"],
              checklist: [
                { item: "Explain express() function", status: "pending" },
                { item: "Describe request lifecycle", status: "pending" },
              ],
            },
            practice: {
              tasks: [
                "Set up a basic Express server that returns 'Hello World'",
              ],
              checklist: [
                { item: "Run server on port 3000", status: "pending" },
                { item: "Test with browser/curl", status: "pending" },
              ],
            },
          },
          tuesday: {
            daily_study_hours: "3 hours",
            time_split: { theory: "2 hours", practice: "1 hour" },
            theory: {
              topics: ["Routing methods (GET, POST, PUT, DELETE)"],
              checklist: [
                { item: "Differentiate route handlers", status: "pending" },
                { item: "Explain route parameters", status: "pending" },
              ],
            },
            practice: {
              tasks: [
                "Create CRUD routes for a simple in‑memory resource (e.g., books)",
              ],
              checklist: [
                { item: "Test each route with Postman", status: "pending" },
                { item: "Return JSON responses", status: "pending" },
              ],
            },
          },
          wednesday: {
            daily_study_hours: "3 hours",
            time_split: { theory: "2 hours", practice: "1 hour" },
            theory: {
              topics: [
                "Middleware concept",
                "Built‑in middleware (json, urlencoded)",
              ],
              checklist: [
                {
                  item: "Explain order of middleware execution",
                  status: "pending",
                },
                { item: "Describe next() function", status: "pending" },
              ],
            },
            practice: {
              tasks: [
                "Add logging middleware that records method and URL",
                "Implement error‑handling middleware",
              ],
              checklist: [
                { item: "Generate logs for each request", status: "pending" },
                { item: "Return formatted error JSON", status: "pending" },
              ],
            },
          },
          thursday: {
            daily_study_hours: "3 hours",
            time_split: { theory: "2 hours", practice: "1 hour" },
            theory: {
              topics: ["Serving static files", "Using express.static"],
              checklist: [
                { item: "Explain directory mapping", status: "pending" },
                { item: "Discuss cache control headers", status: "pending" },
              ],
            },
            practice: {
              tasks: ["Serve a simple HTML/CSS front‑end for the books API"],
              checklist: [
                { item: "Access front‑end via browser", status: "pending" },
                { item: "Fetch data using fetch API", status: "pending" },
              ],
            },
          },
          friday: {
            daily_study_hours: "3 hours",
            time_split: { theory: "2 hours", practice: "1 hour" },
            theory: {
              topics: ["Environment variables", "Configuration with dotenv"],
              checklist: [
                { item: "Explain .env usage", status: "pending" },
                { item: "Secure sensitive data", status: "pending" },
              ],
            },
            practice: {
              tasks: ["Move port number to .env file and load with dotenv"],
              checklist: [
                { item: "Run server using env variable", status: "pending" },
                { item: "Commit .env.example", status: "pending" },
              ],
            },
          },
          saturday: {
            daily_study_hours: "3 hours",
            time_split: { theory: "2 hours", practice: "1 hour" },
            theory: {
              topics: ["Testing Express apps", "Supertest basics"],
              checklist: [
                {
                  item: "Explain unit vs integration tests",
                  status: "pending",
                },
                {
                  item: "Set up test script in package.json",
                  status: "pending",
                },
              ],
            },
            practice: {
              tasks: [
                "Write a test for the GET /books route using Supertest",
              ],
              checklist: [
                { item: "Run test and see it pass", status: "pending" },
                {
                  item: "Add failing test to see error handling",
                  status: "pending",
                },
              ],
            },
          },
          sunday: { status: "OFF" },
        },
        projects: [
          {
            name: "Book Management API",
            description:
              "A RESTful API built with Express that supports full CRUD operations, middleware logging, static front‑end, and environment‑based configuration.",
            skills_gained: [
              "Express routing",
              "Middleware",
              "Static assets",
              "Environment configuration",
              "API testing",
            ],
          },
        ],
      },
      {
        phase: "Week 4 - Data Persistence with MongoDB",
        duration: "1 week",
        topics: [
          "MongoDB fundamentals",
          "Mongoose ODM",
          "Schema design and validation",
          "CRUD operations with Mongoose",
        ],
        weekly_plan: {
          monday: {
            daily_study_hours: "3 hours",
            time_split: { theory: "2 hours", practice: "1 hour" },
            theory: {
              topics: [
                "Document model vs relational tables",
                "Installing MongoDB locally",
              ],
              checklist: [
                { item: "Explain BSON format", status: "pending" },
                { item: "Start MongoDB server", status: "pending" },
              ],
            },
            practice: {
              tasks: [
                "Connect to MongoDB using MongoDB Shell",
                "Insert a sample document",
              ],
              checklist: [
                { item: "Query inserted document", status: "pending" },
                { item: "Delete the document", status: "pending" },
              ],
            },
          },
          tuesday: {
            daily_study_hours: "3 hours",
            time_split: { theory: "2 hours", practice: "1 hour" },
            theory: {
              topics: ["Mongoose basics", "Models and schemas"],
              checklist: [
                { item: "Define a Mongoose schema", status: "pending" },
                { item: "Explain schema validators", status: "pending" },
              ],
            },
            practice: {
              tasks: [
                "Create a Book schema with title, author, pages, publishedDate",
              ],
              checklist: [
                { item: "Save a book instance", status: "pending" },
                { item: "Handle validation errors", status: "pending" },
              ],
            },
          },
          wednesday: {
            daily_study_hours: "3 hours",
            time_split: { theory: "2 hours", practice: "1 hour" },
            theory: {
              topics: ["Relationships: referencing vs embedding"],
              checklist: [
                { item: "Compare one‑to‑many patterns", status: "pending" },
                { item: "Discuss population feature", status: "pending" },
              ],
            },
            practice: {
              tasks: [
                "Add an Author schema and reference it from Book",
                "Populate author data when fetching books",
              ],
              checklist: [
                {
                  item: "Query books with populated author",
                  status: "pending",
                },
                { item: "Verify data integrity", status: "pending" },
              ],
            },
          },
          thursday: {
            daily_study_hours: "3 hours",
            time_split: { theory: "2 hours", practice: "1 hour" },
            theory: {
              topics: [
                "Indexing for performance",
                "Aggregation pipeline basics",
              ],
              checklist: [
                { item: "Explain index creation", status: "pending" },
                { item: "Outline aggregation stages", status: "pending" },
              ],
            },
            practice: {
              tasks: [
                "Create an index on book title",
                "Write an aggregation to count books per author",
              ],
              checklist: [
                {
                  item: "Run aggregation and view results",
                  status: "pending",
                },
                {
                  item: "Measure query speed before/after index",
                  status: "pending",
                },
              ],
            },
          },
          friday: {
            daily_study_hours: "3 hours",
            time_split: { theory: "2 hours", practice: "1 hour" },
            theory: {
              topics: [
                "Connection handling in Express",
                "Using async/await with Mongoose",
              ],
              checklist: [
                { item: "Explain connection pooling", status: "pending" },
                { item: "Show try/catch around DB ops", status: "pending" },
              ],
            },
            practice: {
              tasks: [
                "Integrate Mongoose into the Book Management API from Week 3",
                "Replace in‑memory storage with MongoDB",
              ],
              checklist: [
                { item: "Test all CRUD endpoints", status: "pending" },
                { item: "Handle DB connection errors", status: "pending" },
              ],
            },
          },
          saturday: {
            daily_study_hours: "3 hours",
            time_split: { theory: "2 hours", practice: "1 hour" },
            theory: {
              topics: ["Data seeding and migrations"],
              checklist: [
                {
                  item: "Explain purpose of seed scripts",
                  status: "pending",
                },
                { item: "Discuss migration strategies", status: "pending" },
              ],
            },
            practice: {
              tasks: [
                "Write a seed script to populate 20 books",
                "Run script and verify data",
              ],
              checklist: [
                { item: "Log seeding summary", status: "pending" },
                { item: "Add script to npm run seed", status: "pending" },
              ],
            },
          },
          sunday: { status: "OFF" },
        },
        projects: [
          {
            name: "Persisted Book API",
            description:
              "Enhanced Book Management API that stores data in MongoDB using Mongoose, includes relationships, indexing, and seed data.",
            skills_gained: [
              "MongoDB",
              "Mongoose schemas",
              "Data modeling",
              "Database integration",
              "Performance tuning",
            ],
          },
        ],
      },
      {
        phase: "Week 5 - Authentication & Security",
        duration: "1 week",
        topics: [
          "JSON Web Tokens (JWT)",
          "Password hashing with bcrypt",
          "Secure routes and role‑based access",
          "Helmet and CORS middleware",
        ],
        weekly_plan: {
          monday: {
            daily_study_hours: "3 hours",
            time_split: { theory: "2 hours", practice: "1 hour" },
            theory: {
              topics: ["Authentication vs authorization", "JWT structure"],
              checklist: [
                {
                  item: "Explain header, payload, signature",
                  status: "pending",
                },
                { item: "Discuss token expiration", status: "pending" },
              ],
            },
            practice: {
              tasks: [
                "Generate a JWT for a sample user",
                "Decode token without verification",
              ],
              checklist: [
                { item: "Verify token signature", status: "pending" },
                {
                  item: "Store token in client simulation",
                  status: "pending",
                },
              ],
            },
          },
          tuesday: {
            daily_study_hours: "3 hours",
            time_split: { theory: "2 hours", practice: "1 hour" },
            theory: {
              topics: ["Password hashing with bcrypt", "Salting concept"],
              checklist: [
                {
                  item: "Explain why plain passwords are unsafe",
                  status: "pending",
                },
                { item: "Describe bcrypt work factor", status: "pending" },
              ],
            },
            practice: {
              tasks: ["Hash a password and compare with bcrypt.compare"],
              checklist: [
                {
                  item: "Test matching and non‑matching cases",
                  status: "pending",
                },
                {
                  item: "Store hashed password in MongoDB",
                  status: "pending",
                },
              ],
            },
          },
          wednesday: {
            daily_study_hours: "3 hours",
            time_split: { theory: "2 hours", practice: "1 hour" },
            theory: {
              topics: [
                "Protecting routes with middleware",
                "Role‑based access control (RBAC)",
              ],
              checklist: [
                {
                  item: "Explain middleware flow for auth",
                  status: "pending",
                },
                { item: "Define role hierarchy", status: "pending" },
              ],
            },
            practice: {
              tasks: [
                "Create auth middleware that verifies JWT",
                "Add role check for admin‑only endpoint",
              ],
              checklist: [
                {
                  item: "Reject requests without valid token",
                  status: "pending",
                },
                {
                  item: "Allow admin actions only for admin role",
                  status: "pending",
                },
              ],
            },
          },
          thursday: {
            daily_study_hours: "3 hours",
            time_split: { theory: "2 hours", practice: "1 hour" },
            theory: {
              topics: [
                "Helmet for HTTP header security",
                "CORS configuration",
              ],
              checklist: [
                { item: "List common Helmet protections", status: "pending" },
                { item: "Explain same‑origin policy", status: "pending" },
              ],
            },
            practice: {
              tasks: [
                "Integrate helmet middleware",
                "Configure CORS to allow specific origin",
              ],
              checklist: [
                {
                  item: "Test API with curl from allowed origin",
                  status: "pending",
                },
                {
                  item: "Observe blocked request from disallowed origin",
                  status: "pending",
                },
              ],
            },
          },
          friday: {
            daily_study_hours: "3 hours",
            time_split: { theory: "2 hours", practice: "1 hour" },
            theory: {
              topics: [
                "Refresh tokens concept",
                "Token revocation strategies",
              ],
              checklist: [
                {
                  item: "Explain short‑lived access tokens",
                  status: "pending",
                },
                {
                  item: "Describe storing revocation list",
                  status: "pending",
                },
              ],
            },
            practice: {
              tasks: [
                "Implement a simple refresh token endpoint",
                "Store refresh tokens in DB",
              ],
              checklist: [
                {
                  item: "Issue new access token using refresh token",
                  status: "pending",
                },
                {
                  item: "Invalidate refresh token on logout",
                  status: "pending",
                },
              ],
            },
          },
          saturday: {
            daily_study_hours: "3 hours",
            time_split: { theory: "2 hours", practice: "1 hour" },
            theory: {
              topics: ["Security testing basics", "OWASP Top 10 overview"],
              checklist: [
                {
                  item: "Identify common injection attacks",
                  status: "pending",
                },
                { item: "Discuss rate limiting", status: "pending" },
              ],
            },
            practice: {
              tasks: [
                "Add express-rate-limit middleware",
                "Run a simple injection test",
              ],
              checklist: [
                {
                  item: "Observe blocked excessive requests",
                  status: "pending",
                },
                { item: "Document mitigation steps", status: "pending" },
              ],
            },
          },
          sunday: { status: "OFF" },
        },
        projects: [
          {
            name: "Secure Book API",
            description:
              "Adds JWT authentication, password hashing, role‑based access, and security hardening to the persisted Book API.",
            skills_gained: [
              "JWT",
              "bcrypt",
              "Auth middleware",
              "Helmet",
              "CORS",
              "Rate limiting",
            ],
          },
        ],
      },
      {
        phase: "Week 6 - Testing, Debugging & CI",
        duration: "1 week",
        topics: [
          "Unit testing with Jest",
          "Integration testing of Express routes",
          "Debugging with Node inspector",
          "Continuous Integration basics (GitHub Actions)",
        ],
        weekly_plan: {
          monday: {
            daily_study_hours: "3 hours",
            time_split: { theory: "2 hours", practice: "1 hour" },
            theory: {
              topics: ["Jest fundamentals", "Test suites and mocks"],
              checklist: [
                { item: "Explain describe/it structure", status: "pending" },
                { item: "Show how to mock modules", status: "pending" },
              ],
            },
            practice: {
              tasks: [
                "Write unit tests for a utility function (e.g., price calculator)",
              ],
              checklist: [
                {
                  item: "Achieve 100% coverage for function",
                  status: "pending",
                },
                { item: "Run tests with npm test", status: "pending" },
              ],
            },
          },
          tuesday: {
            daily_study_hours: "3 hours",
            time_split: { theory: "2 hours", practice: "1 hour" },
            theory: {
              topics: ["Supertest for route testing", "Testing async code"],
              checklist: [
                { item: "Explain request chaining", status: "pending" },
                { item: "Handle async assertions", status: "pending" },
              ],
            },
            practice: {
              tasks: [
                "Create integration tests for GET /books and POST /books routes",
              ],
              checklist: [
                { item: "Mock DB with in‑memory MongoDB", status: "pending" },
                { item: "Validate response structure", status: "pending" },
              ],
            },
          },
          wednesday: {
            daily_study_hours: "3 hours",
            time_split: { theory: "2 hours", practice: "1 hour" },
            theory: {
              topics: [
                "Debugging with Node --inspect",
                "Using Chrome DevTools",
              ],
              checklist: [
                { item: "Set breakpoints in VS Code", status: "pending" },
                { item: "Inspect variable state", status: "pending" },
              ],
            },
            practice: {
              tasks: ["Debug a failing route by stepping through code"],
              checklist: [
                { item: "Identify root cause of bug", status: "pending" },
                { item: "Fix bug and re‑run tests", status: "pending" },
              ],
            },
          },
          thursday: {
            daily_study_hours: "3 hours",
            time_split: { theory: "2 hours", practice: "1 hour" },
            theory: {
              topics: [
                "Continuous Integration concepts",
                "GitHub Actions workflow syntax",
              ],
              checklist: [
                { item: "Explain CI pipeline stages", status: "pending" },
                { item: "Describe yaml workflow file", status: "pending" },
              ],
            },
            practice: {
              tasks: [
                "Create a GitHub Actions workflow to run npm test on push",
              ],
              checklist: [
                {
                  item: "Validate workflow passes on repository",
                  status: "pending",
                },
                { item: "Add badge to README", status: "pending" },
              ],
            },
          },
          friday: {
            daily_study_hours: "3 hours",
            time_split: { theory: "2 hours", practice: "1 hour" },
            theory: {
              topics: [
                "Code coverage reporting",
                "Using Coveralls or Codecov",
              ],
              checklist: [
                { item: "Explain coverage thresholds", status: "pending" },
                {
                  item: "Integrate coverage upload in CI",
                  status: "pending",
                },
              ],
            },
            practice: {
              tasks: [
                "Generate coverage report with jest --coverage",
                "Upload to Codecov",
              ],
              checklist: [
                { item: "Review coverage percentages", status: "pending" },
                { item: "Set minimum coverage rule", status: "pending" },
              ],
            },
          },
          saturday: {
            daily_study_hours: "3 hours",
            time_split: { theory: "2 hours", practice: "1 hour" },
            theory: {
              topics: ["Linting with ESLint", "Prettier formatting"],
              checklist: [
                { item: "Explain linting rules", status: "pending" },
                { item: "Configure pre‑commit hook", status: "pending" },
              ],
            },
            practice: {
              tasks: [
                "Add ESLint with Airbnb style guide",
                "Run lint on codebase",
              ],
              checklist: [
                { item: "Fix all lint errors", status: "pending" },
                { item: "Commit with lint‑clean code", status: "pending" },
              ],
            },
          },
          sunday: { status: "OFF" },
        },
        projects: [
          {
            name: "CI‑Enabled Secure Book API",
            description:
              "Adds comprehensive unit/integration tests, CI pipeline, coverage reporting, and linting to ensure production‑grade quality.",
            skills_gained: [
              "Jest",
              "Supertest",
              "Debugging",
              "GitHub Actions",
              "Code coverage",
              "ESLint",
            ],
          },
        ],
      },
      {
        phase: "Week 7 - Performance Optimization & Scaling",
        duration: "1 week",
        topics: [
          "Clustering Node.js processes",
          "Caching with Redis",
          "Load balancing basics",
          "Monitoring with PM2 and health checks",
        ],
        weekly_plan: {
          monday: {
            daily_study_hours: "3 hours",
            time_split: { theory: "2 hours", practice: "1 hour" },
            theory: {
              topics: ["Node.js cluster module", "Why multi‑core matters"],
              checklist: [
                {
                  item: "Explain master vs worker processes",
                  status: "pending",
                },
                { item: "Discuss graceful shutdown", status: "pending" },
              ],
            },
            practice: {
              tasks: [
                "Create a clustered version of the API using cluster.fork()",
              ],
              checklist: [
                { item: "Run on multiple CPU cores", status: "pending" },
                { item: "Verify load is distributed", status: "pending" },
              ],
            },
          },
          tuesday: {
            daily_study_hours: "3 hours",
            time_split: { theory: "2 hours", practice: "1 hour" },
            theory: {
              topics: ["Caching strategies", "Redis data structures"],
              checklist: [
                { item: "Explain cache‑aside pattern", status: "pending" },
                { item: "Discuss TTL and expiration", status: "pending" },
              ],
            },
            practice: {
              tasks: [
                "Integrate Redis to cache GET /books responses",
                "Set TTL of 60 seconds",
              ],
              checklist: [
                {
                  item: "Measure response time before/after cache",
                  status: "pending",
                },
                {
                  item: "Invalidate cache on data change",
                  status: "pending",
                },
              ],
            },
          },
          wednesday: {
            daily_study_hours: "3 hours",
            time_split: { theory: "2 hours", practice: "1 hour" },
            theory: {
              topics: [
                "Load balancing concepts",
                "Using Nginx as reverse proxy",
              ],
              checklist: [
                { item: "Explain round‑robin algorithm", status: "pending" },
                { item: "Discuss health check endpoints", status: "pending" },
              ],
            },
            practice: {
              tasks: [
                "Write a simple health‑check route (/health)",
                "Configure Nginx to proxy to clustered nodes",
              ],
              checklist: [
                { item: "Test load balancing with curl", status: "pending" },
                {
                  item: "Observe failover when a worker stops",
                  status: "pending",
                },
              ],
            },
          },
          thursday: {
            daily_study_hours: "3 hours",
            time_split: { theory: "2 hours", practice: "1 hour" },
            theory: {
              topics: ["Process manager PM2", "Zero‑downtime reloads"],
              checklist: [
                { item: "Explain pm2 start/restart", status: "pending" },
                { item: "Discuss ecosystem file", status: "pending" },
              ],
            },
            practice: {
              tasks: [
                "Deploy the API with PM2 in cluster mode",
                "Set up log rotation",
              ],
              checklist: [
                { item: "Perform a zero‑downtime reload", status: "pending" },
                { item: "Check logs for errors", status: "pending" },
              ],
            },
          },
          friday: {
            daily_study_hours: "3 hours",
            time_split: { theory: "2 hours", practice: "1 hour" },
            theory: {
              topics: [
                "Monitoring metrics",
                "Using Prometheus & Grafana basics",
              ],
              checklist: [
                {
                  item: "Identify key metrics (CPU, latency, errors)",
                  status: "pending",
                },
                { item: "Explain exporter concept", status: "pending" },
              ],
            },
            practice: {
              tasks: [
                "Expose /metrics endpoint with prom-client",
                "Simulate load with artillery",
              ],
              checklist: [
                { item: "Collect and view metrics", status: "pending" },
                {
                  item: "Create simple Grafana dashboard",
                  status: "pending",
                },
              ],
            },
          },
          saturday: {
            daily_study_hours: "3 hours",
            time_split: { theory: "2 hours", practice: "1 hour" },
            theory: {
              topics: ["Best practices for production deployment"],
              checklist: [
                {
                  item: "Discuss environment segregation",
                  status: "pending",
                },
                { item: "Explain secret management", status: "pending" },
              ],
            },
            practice: {
              tasks: [
                "Write deployment checklist document",
                "Prepare Dockerfile for the API",
              ],
              checklist: [
                { item: "Build Docker image", status: "pending" },
                { item: "Run container locally", status: "pending" },
              ],
            },
          },
          sunday: { status: "OFF" },
        },
        projects: [
          {
            name: "Production‑Ready Scalable API",
            description:
              "Transforms the Secure Book API into a clustered, cached, Dockerized service ready for deployment behind Nginx with monitoring.",
            skills_gained: [
              "Clustering",
              "Redis caching",
              "Docker",
              "PM2",
              "Monitoring",
              "Load balancing",
            ],
          },
        ],
      },
      {
        phase: "Week 8 - Capstone Project",
        duration: "1 week",
        topics: [
          "Full‑stack integration",
          "Project planning & version control",
          "Documentation & presentation",
        ],
        weekly_plan: {
          monday: {
            daily_study_hours: "3 hours",
            time_split: { theory: "2 hours", practice: "1 hour" },
            theory: {
              topics: ["Defining project scope", "Creating issue board"],
              checklist: [
                { item: "Write project specification", status: "pending" },
                {
                  item: "Set up GitHub repo with protected branches",
                  status: "pending",
                },
              ],
            },
            practice: {
              tasks: [
                "Initialize repository, add README and contribution guide",
              ],
              checklist: [
                { item: "Commit initial codebase", status: "pending" },
                { item: "Create project board", status: "pending" },
              ],
            },
          },
          tuesday: {
            daily_study_hours: "3 hours",
            time_split: { theory: "2 hours", practice: "1 hour" },
            theory: {
              topics: [
                "Designing API for a real‑world use case (e.g., Task Manager)",
              ],
              checklist: [
                {
                  item: "Model entities and relationships",
                  status: "pending",
                },
                { item: "Define endpoint list", status: "pending" },
              ],
            },
            practice: {
              tasks: ["Create Mongoose schemas for tasks, users, projects"],
              checklist: [
                { item: "Validate schema design", status: "pending" },
                { item: "Push schema files to repo", status: "pending" },
              ],
            },
          },
          wednesday: {
            daily_study_hours: "3 hours",
            time_split: { theory: "2 hours", practice: "1 hour" },
            theory: {
              topics: ["Authentication flow for multi‑user app"],
              checklist: [
                {
                  item: "Plan JWT + refresh token strategy",
                  status: "pending",
                },
                {
                  item: "Define role permissions (admin, user)",
                  status: "pending",
                },
              ],
            },
            practice: {
              tasks: [
                "Implement auth routes and middleware",
                "Secure task routes",
              ],
              checklist: [
                { item: "Test registration & login", status: "pending" },
                { item: "Verify role restrictions", status: "pending" },
              ],
            },
          },
          thursday: {
            daily_study_hours: "3 hours",
            time_split: { theory: "2 hours", practice: "1 hour" },
            theory: {
              topics: ["Integrating Redis cache for task queries"],
              checklist: [
                { item: "Plan cache keys", status: "pending" },
                { item: "Define invalidation rules", status: "pending" },
              ],
            },
            practice: {
              tasks: [
                "Add caching layer to GET /tasks",
                "Invalidate on task update/delete",
              ],
              checklist: [
                { item: "Benchmark response times", status: "pending" },
                { item: "Document cache strategy", status: "pending" },
              ],
            },
          },
          friday: {
            daily_study_hours: "3 hours",
            time_split: { theory: "2 hours", practice: "1 hour" },
            theory: {
              topics: [
                "Dockerizing the full application",
                "Docker Compose for multi‑service",
              ],
              checklist: [
                { item: "Write Dockerfile for API", status: "pending" },
                {
                  item: "Create docker‑compose.yml with Redis and MongoDB",
                  status: "pending",
                },
              ],
            },
            practice: {
              tasks: [
                "Build and run containers",
                "Test API via localhost from container network",
              ],
              checklist: [
                { item: "Ensure data persists", status: "pending" },
                {
                  item: "Push Docker configurations to repo",
                  status: "pending",
                },
              ],
            },
          },
          saturday: {
            daily_study_hours: "3 hours",
            time_split: { theory: "2 hours", practice: "1 hour" },
            theory: {
              topics: [
                "Writing documentation with Swagger/OpenAPI",
                "Preparing presentation",
              ],
              checklist: [
                {
                  item: "Define OpenAPI spec for all endpoints",
                  status: "pending",
                },
                { item: "Create slide deck outline", status: "pending" },
              ],
            },
            practice: {
              tasks: [
                "Generate Swagger UI, host at /docs",
                "Record short demo video",
              ],
              checklist: [
                { item: "Verify docs reflect actual API", status: "pending" },
                { item: "Finalize presentation slides", status: "pending" },
              ],
            },
          },
          sunday: { status: "OFF" },
        },
        projects: [
          {
            name: "Task Manager Platform",
            description:
              "A complete production‑grade Node.js application featuring authentication, role‑based access, Redis caching, Docker deployment, automated tests, CI, and comprehensive documentation.",
            skills_gained: [
              "Full‑stack API design",
              "Advanced security",
              "Performance optimization",
              "Docker & CI/CD",
              "Documentation",
            ],
          },
        ],
      },
    ],
  };

  const handleGenerate = () => {
    if (!prompt.trim()) return;
    
    // Simulate conditional check for missing info (randomly or keyword based)
    // For demo, if prompt is short, ask for more info
    if (prompt.length < 20) {
      setShowMissingInfoModal(true);
      return;
    }

    startGeneration();
  };

  const startGeneration = () => {
    setLoading(true);
    setTimeout(() => {
      setGeneratedPlan(mockRoadmap);
      setLoading(false);
    }, 2000);
  };

  const submitMissingInfo = () => {
    setShowMissingInfoModal(false);
    startGeneration();
  };

  const handleApprove = () => {
    setShowApprovalModal(true);
  };

  const confirmApproval = () => {
    setShowApprovalModal(false);
    // Simulate success and redirect
    setLoading(true);
    setTimeout(() => {
        setLoading(false);
        navigate('/dashboard');
    }, 1000);
  };

  const [expandedPhases, setExpandedPhases] = useState({});
  const [expandedDays, setExpandedDays] = useState({});

  const togglePhase = (phaseIndex) => {
    setExpandedPhases(prev => ({
      ...prev,
      [phaseIndex]: !prev[phaseIndex]
    }));
  };

  const toggleDay = (phaseIndex, dayName) => {
    const key = `${phaseIndex}-${dayName}`;
    setExpandedDays(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const getDayName = (dayKey) => {
    const dayNames = {
      monday: 'Monday',
      tuesday: 'Tuesday',
      wednesday: 'Wednesday',
      thursday: 'Thursday',
      friday: 'Friday',
      saturday: 'Saturday',
      sunday: 'Sunday'
    };
    return dayNames[dayKey] || dayKey;
  };

  if (loading && !generatedPlan && !showApprovalModal) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center">
        <Loader2 className="w-12 h-12 text-blue-500 animate-spin mb-4" />
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Generating Your Personalized Roadmap...</h3>
        <p className="text-gray-500 mt-2">Analyzing your goals and creating the perfect learning path.</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
          <Sparkles className="text-blue-500" />
          AI Learning Planner
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">
          Turn your learning goals into actionable roadmaps in seconds.
        </p>
      </div>

      {/* 1. Prompt Section */}
      {!generatedPlan && (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            What do you want to learn?
          </label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Example: I want to learn Node.js in 8 weeks as a backend developer"
            className="w-full h-32 px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none text-gray-900 dark:text-white transition-all"
          />
          <div className="flex justify-between mt-4">
             <button 
              onClick={() => setPrompt('')}
              className="px-4 py-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 font-medium transition-colors"
            >
              Reset
            </button>
            <button
              onClick={handleGenerate}
              disabled={!prompt.trim()}
              className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <Sparkles size={18} />
              Generate Plan
            </button>
          </div>
        </div>
      )}

      {/* 2. Missing Info Modal */}
      {showMissingInfoModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-md shadow-2xl transform transition-all">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
              <AlertCircle className="text-amber-500" />
              We need a bit more detail
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Current Level</label>
                <div className="flex gap-2">
                  {['Beginner', 'Intermediate', 'Advanced'].map(l => (
                    <button
                      key={l}
                      onClick={() => setMissingInfo({...missingInfo, level: l})}
                      className={`flex-1 py-2 text-sm rounded-lg border transition-colors ${
                        missingInfo.level === l 
                          ? 'border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' 
                          : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400'
                      }`}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Duration (Weeks)</label>
                <div className="flex items-center gap-4">
                  <input 
                    type="range" 
                    min="1" max="12" 
                    value={missingInfo.duration}
                    onChange={(e) => setMissingInfo({...missingInfo, duration: parseInt(e.target.value)})}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <span className="font-semibold w-8 text-center text-gray-900 dark:text-white">{missingInfo.duration}</span>
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Primary Goal</label>
                <select 
                  value={missingInfo.goal}
                  onChange={(e) => setMissingInfo({...missingInfo, goal: e.target.value})}
                  className="w-full p-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white"
                >
                  <option value="Job">Get a Job</option>
                  <option value="Project">Build a Project</option>
                  <option value="Interview">Ace an Interview</option>
                  <option value="Hobby">Just for Fun</option>
                </select>
              </div>
            </div>
            
            <button 
              onClick={submitMissingInfo}
              className="w-full mt-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold shadow-lg transition-all"
            >
              Continue Generation
            </button>
             <button 
              onClick={() => setShowMissingInfoModal(false)}
              className="w-full mt-2 py-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 font-medium transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* 3. Generated Roadmap Review */}
      {generatedPlan && !loading && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
          
          <div className="flex justify-between items-center bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
             <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Your Learning Roadmap</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {generatedPlan?.roadmap?.length || 0} Phases • {missingInfo.duration} Weeks • {missingInfo.level}
                </p>
             </div>
             <div className="flex gap-2">
                <button 
                  onClick={() => setIsModifying(!isModifying)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${isModifying ? 'bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-300' : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400'}`}
                >
                  <Sliders size={16} />
                  {isModifying ? 'Done Editing' : 'Modify'}
                </button>
                <button 
                  onClick={handleGenerate}
                  className="flex items-center gap-2 px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors"
                >
                  <RefreshCw size={16} />
                  Regenerate
                </button>
             </div>
          </div>

          {/* 4. Modify Plan UI (Conditional) */}
          {isModifying && (
             <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900 p-6 rounded-xl space-y-4 animate-in fade-in zoom-in-95 duration-200">
               <h3 className="font-semibold text-blue-900 dark:text-blue-100 flex items-center gap-2">
                 <PenTool size={18} /> Customize Your Plan
               </h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div>
                   <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Daily Study Hours</label>
                   <input type="range" className="w-full mt-2 h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer dark:bg-blue-800" min="1" max="8" defaultValue="2" />
                   <div className="flex justify-between text-xs text-gray-500 mt-1"><span>1h</span><span>8h</span></div>
                 </div>
                 <div>
                   <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Content Type Preference</label>
                   <div className="flex gap-2 mt-2">
                      <span className="text-xs font-semibold px-2 py-1 bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700">More Video</span>
                      <input type="range" className="flex-1 h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer dark:bg-blue-800" />
                      <span className="text-xs font-semibold px-2 py-1 bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700">More Reading</span>
                   </div>
                 </div>
               </div>
               <div className="flex justify-end">
                  <button 
                    onClick={() => setIsModifying(false)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                  >
                    <Save size={16} /> Save Changes
                  </button>
               </div>
             </div>
          )}

          {/* Review Accordion - Updated for new structure */}
          <div className="space-y-4">
            {generatedPlan?.roadmap?.map((phase, phaseIdx) => (
              <div key={phaseIdx} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm transition-all">
                {/* Phase Header */}
                <button 
                  onClick={() => togglePhase(phaseIdx)}
                  className="w-full flex items-center justify-between p-5 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 hover:from-blue-100 hover:to-purple-100 dark:hover:from-gray-700 dark:hover:to-gray-600 transition-colors text-left"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 text-white flex items-center justify-center font-bold text-lg shadow-lg">
                      {phaseIdx + 1}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-1">{phase.phase}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                        <span className="flex items-center gap-1"><Calendar size={14} /> {phase.duration}</span>
                        <span className="flex items-center gap-1"><Target size={14} /> {phase.topics?.length || 0} Topics</span>
                        {phase.projects?.length > 0 && (
                          <span className="flex items-center gap-1"><PenTool size={14} /> {phase.projects.length} Project{phase.projects.length > 1 ? 's' : ''}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  {expandedPhases[phaseIdx] ? <ChevronDown size={20} className="text-gray-400" /> : <ChevronRight size={20} className="text-gray-400" />}
                </button>
                
                {expandedPhases[phaseIdx] && (
                  <div className="p-5 border-t border-gray-200 dark:border-gray-700 space-y-6">
                    {/* Topics Overview */}
                    {phase.topics && phase.topics.length > 0 && (
                      <div>
                        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                          <BookOpen size={16} className="text-blue-500" />
                          Key Topics
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {phase.topics.map((topic, tIdx) => (
                            <span key={tIdx} className="px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-lg text-sm border border-blue-200 dark:border-blue-800">
                              {topic}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Weekly Plan - Days */}
                    {phase.weekly_plan && (
                      <div>
                        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                          <Calendar size={16} className="text-purple-500" />
                          Weekly Schedule
                        </h4>
                        <div className="space-y-3">
                          {Object.entries(phase.weekly_plan).map(([dayKey, dayData]) => {
                            if (dayData.status === "OFF") {
                              return (
                                <div key={dayKey} className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600">
                                  <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
                                      <span className="text-xs font-bold text-gray-500 dark:text-gray-400">{getDayName(dayKey).substring(0, 3)}</span>
                                    </div>
                                    <div className="flex-1">
                                      <h5 className="font-medium text-gray-600 dark:text-gray-400">{getDayName(dayKey)} - Rest Day</h5>
                                    </div>
                                  </div>
                                </div>
                              );
                            }

                            const dayKeyFull = `${phaseIdx}-${dayKey}`;
                            const isDayExpanded = expandedDays[dayKeyFull];

                            return (
                              <div key={dayKey} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                                <button
                                  onClick={() => toggleDay(phaseIdx, dayKey)}
                                  className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/30 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors text-left"
                                >
                                  <div className="flex items-center gap-4 flex-1">
                                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 text-white flex items-center justify-center font-bold text-xs shadow-md">
                                      {getDayName(dayKey).substring(0, 3)}
                                    </div>
                                    <div className="flex-1">
                                      <h5 className="font-semibold text-gray-900 dark:text-white">{getDayName(dayKey)}</h5>
                                      <div className="flex items-center gap-3 mt-1 text-xs text-gray-600 dark:text-gray-400">
                                        <span className="flex items-center gap-1"><Clock size={12} /> {dayData.daily_study_hours}</span>
                                        <span className="flex items-center gap-1">
                                          <BookOpen size={12} /> {dayData.time_split?.theory}
                                        </span>
                                        <span className="flex items-center gap-1">
                                          <PenTool size={12} /> {dayData.time_split?.practice}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  {isDayExpanded ? <ChevronDown size={18} className="text-gray-400" /> : <ChevronRight size={18} className="text-gray-400" />}
                                </button>

                                {isDayExpanded && (
                                  <div className="p-4 bg-white dark:bg-gray-800 space-y-4 border-t border-gray-200 dark:border-gray-700">
                                    {/* Theory Section */}
                                    {dayData.theory && (
                                      <div className="bg-purple-50 dark:bg-purple-900/10 rounded-lg p-4 border border-purple-200 dark:border-purple-800">
                                        <div className="flex items-center gap-2 mb-3">
                                          <BookOpen size={16} className="text-purple-600 dark:text-purple-400" />
                                          <h6 className="font-semibold text-purple-900 dark:text-purple-100">Theory ({dayData.time_split.theory})</h6>
                                        </div>
                                        <div className="space-y-3">
                                          <div>
                                            <p className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">Topics:</p>
                                            <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-400">
                                              {dayData.theory.topics?.map((topic, tIdx) => (
                                                <li key={tIdx}>{topic}</li>
                                              ))}
                                            </ul>
                                          </div>
                                          {dayData.theory.checklist && dayData.theory.checklist.length > 0 && (
                                            <div>
                                              <p className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">Checklist:</p>
                                              <div className="space-y-2">
                                                {dayData.theory.checklist.map((item, cIdx) => (
                                                  <div key={cIdx} className="flex items-center gap-2 text-sm">
                                                    {item.status === "completed" ? (
                                                      <CheckCircle2 size={16} className="text-green-500" />
                                                    ) : (
                                                      <Circle size={16} className="text-gray-400" />
                                                    )}
                                                    <span className={item.status === "completed" ? "text-gray-500 line-through" : "text-gray-700 dark:text-gray-300"}>
                                                      {item.item}
                                                    </span>
                                                  </div>
                                                ))}
                                              </div>
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                    )}

                                    {/* Practice Section */}
                                    {dayData.practice && (
                                      <div className="bg-green-50 dark:bg-green-900/10 rounded-lg p-4 border border-green-200 dark:border-green-800">
                                        <div className="flex items-center gap-2 mb-3">
                                          <PenTool size={16} className="text-green-600 dark:text-green-400" />
                                          <h6 className="font-semibold text-green-900 dark:text-green-100">Practice ({dayData.time_split.practice})</h6>
                                        </div>
                                        <div className="space-y-3">
                                          <div>
                                            <p className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">Tasks:</p>
                                            <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-400">
                                              {dayData.practice.tasks?.map((task, tIdx) => (
                                                <li key={tIdx}>{task}</li>
                                              ))}
                                            </ul>
                                          </div>
                                          {dayData.practice.checklist && dayData.practice.checklist.length > 0 && (
                                            <div>
                                              <p className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">Checklist:</p>
                                              <div className="space-y-2">
                                                {dayData.practice.checklist.map((item, cIdx) => (
                                                  <div key={cIdx} className="flex items-center gap-2 text-sm">
                                                    {item.status === "completed" ? (
                                                      <CheckCircle2 size={16} className="text-green-500" />
                                                    ) : (
                                                      <Circle size={16} className="text-gray-400" />
                                                    )}
                                                    <span className={item.status === "completed" ? "text-gray-500 line-through" : "text-gray-700 dark:text-gray-300"}>
                                                      {item.item}
                                                    </span>
                                                  </div>
                                                ))}
                                              </div>
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Projects */}
                    {phase.projects && phase.projects.length > 0 && (
                      <div>
                        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                          <Target size={16} className="text-orange-500" />
                          Projects
                        </h4>
                        <div className="space-y-3">
                          {phase.projects.map((project, pIdx) => (
                            <div key={pIdx} className="bg-orange-50 dark:bg-orange-900/10 rounded-lg p-4 border border-orange-200 dark:border-orange-800">
                              <h5 className="font-semibold text-orange-900 dark:text-orange-100 mb-2">{project.name}</h5>
                              <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">{project.description}</p>
                              {project.skills_gained && project.skills_gained.length > 0 && (
                                <div>
                                  <p className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">Skills Gained:</p>
                                  <div className="flex flex-wrap gap-2">
                                    {project.skills_gained.map((skill, sIdx) => (
                                      <span key={sIdx} className="px-2 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded text-xs">
                                        {skill}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Action Footer */}
          <div className="flex justify-end pt-4 pb-12">
             <button 
               onClick={handleApprove}
               className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all text-lg font-bold flex items-center gap-2"
             >
               <CheckCircle size={20} />
               Approve Plan
             </button>
          </div>
        </div>
      )}

      {/* 5. Approval Flow Modal */}
      {showApprovalModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
           <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 w-full max-w-lg shadow-2xl animate-in fade-in zoom-in-95 duration-200">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Great Choice! 🚀</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">Let's integrate this plan with your schedule so you stay on track.</p>
              
              <div className="space-y-4 mb-8">
                 <div 
                   onClick={() => setApprovalIntegrations(prev => ({...prev, dashboard: !prev.dashboard}))}
                   className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${approvalIntegrations.dashboard ? 'border-green-500 bg-green-50 dark:bg-green-900/20' : 'border-gray-200 dark:border-gray-700'}`}
                 >
                    <div className="flex items-center gap-3">
                       <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">ET</div>
                       <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white">EduTalks Dashboard</h4>
                          <p className="text-xs text-gray-500">Add to your learning widgets</p>
                       </div>
                    </div>
                    {approvalIntegrations.dashboard && <CheckCircle className="text-green-500" fill="currentColor" />}
                 </div>

                 <div 
                   onClick={() => setApprovalIntegrations(prev => ({...prev, calendar: !prev.calendar}))}
                   className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${approvalIntegrations.calendar ? 'border-green-500 bg-green-50 dark:bg-green-900/20' : 'border-gray-200 dark:border-gray-700'}`}
                 >
                    <div className="flex items-center gap-3">
                       <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold">G</div>
                       <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white">Google Calendar</h4>
                          <p className="text-xs text-gray-500">Schedule daily sessions</p>
                       </div>
                    </div>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${approvalIntegrations.calendar ? 'border-green-500 bg-green-500 text-white' : 'border-gray-300 dark:border-gray-600'}`}>
                       {approvalIntegrations.calendar && <CheckCircle size={14} />}
                    </div>
                 </div>

                 <div 
                   onClick={() => setApprovalIntegrations(prev => ({...prev, drive: !prev.drive}))}
                   className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${approvalIntegrations.drive ? 'border-green-500 bg-green-50 dark:bg-green-900/20' : 'border-gray-200 dark:border-gray-700'}`}
                 >
                    <div className="flex items-center gap-3">
                       <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600 font-bold">D</div>
                       <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white">Google Drive</h4>
                          <p className="text-xs text-gray-500">Create resource folder</p>
                       </div>
                    </div>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${approvalIntegrations.drive ? 'border-green-500 bg-green-500 text-white' : 'border-gray-300 dark:border-gray-600'}`}>
                       {approvalIntegrations.drive && <CheckCircle size={14} />}
                    </div>
                 </div>
              </div>

              <div className="flex gap-3">
                 <button 
                   onClick={() => setShowApprovalModal(false)}
                   className="flex-1 py-3 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors"
                 >
                   Back
                 </button>
                 <button 
                   onClick={confirmApproval}
                   className="flex-[2] py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-lg transition-all flex items-center justify-center gap-2"
                 >
                   Start Learning <ArrowRight size={18} />
                 </button>
              </div>
           </div>
        </div>
      )}

      {/* Loading Overlay for Approval */}
      {showApprovalModal === false && loading && generatedPlan && (
         <div className="fixed inset-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md flex flex-col items-center justify-center z-[60]">
             <Loader2 className="w-16 h-16 text-green-500 animate-spin mb-4" />
             <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Setting up everything...</h2>
             <p className="text-gray-500 dark:text-gray-400 mt-2">Connecting to your tools and creating the dashboard.</p>
         </div>
      )}

    </div>
  );
};

export default AiPlanner;
