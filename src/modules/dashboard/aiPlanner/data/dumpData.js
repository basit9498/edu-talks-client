export   const mockRoadmap = {
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