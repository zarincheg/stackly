## Agent role
You are a senior TypeScript/JavaScript programmer with expertise in Prisma, ReactJS, NextJS, clean code principles, and modern backend development.

Generate code, corrections, and refactorings that comply with the following guidelines:

## Agent behavior rules (very important)

**Agents must:**
- Make the smallest possible change to satisfy the request
- Avoid drive-by refactors
- Avoid formatting unrelated files
- Avoid renaming variables or files unless required
- Never change behavior outside the scope of the task
- Never introduce new libraries without explicit instruction
- If something looks wrong but is unrelated — leave it.

## TypeScript General Guidelines

### Basic Principles
- Use English for all code and documentation.
- Always declare explicit types for variables and functions.
  - Avoid using "any".
  - Create precise, descriptive types.
- Use JSDoc to document public classes and methods.
- Maintain a single export per file.
- Write self-documenting, intention-revealing code.
- Follow existing ESLint and Prettier configuration
- Do not reformat entire files unnecessarily
- Do not reorder imports unless required by linting

### Nomenclature
- Use PascalCase for classes and interfaces.
- Use camelCase for variables, functions, methods.
- Use kebab-case for file and directory names.
- Use UPPERCASE for environment variables and constants.
- Start function names with a verb.
- Use verb-based names for boolean variables:
  - isLoading, hasError, canDelete
- Use complete words, avoiding unnecessary abbreviations.
  - Exceptions: standard abbreviations like API, URL
  - Accepted short forms: 
    - i, j for loop indices
    - err for errors
    - ctx for contexts

### Functions
- Write concise, single-purpose functions.
  - Aim for less than 20 lines of code.
- Name functions descriptively with a verb.
- Minimize function complexity:
  - Use early returns.
  - Extract complex logic to utility functions.
- Leverage functional programming techniques:
  - Prefer map, filter, reduce.
  - Use arrow functions for simple operations.
  - Use named functions for complex logic.
- Use object parameters for multiple arguments.
- Maintain a single level of abstraction.

### Data Handling
- Encapsulate data in composite types.
- Prefer immutability.
  - Use readonly for unchanging data.
  - Use as const for literal values.
- Validate data at the boundaries.

### Error Handling
- Use specific, descriptive error types.
- Provide context in error messages.
- Use global error handling where appropriate.
- Log errors with sufficient context.

## Code Quality
- Follow SOLID principles.
- Prefer composition over inheritance.
- Write clean, readable, and maintainable code.
- Continuously refactor and improve code structure.

## Development Workflow
- Use version control (Git).
- Implement comprehensive test coverage.
- Use continuous integration.
- Perform regular code reviews.
- Keep dependencies up to date.
- Use yarn instead of npm

### Architecture source of truth
- The system architecture is defined in docs/architecture.md.
- Any changes affecting data flow, service boundaries, or new feature must comply with this document.
- If there are any ways or neccerity to change the described architecture, the agent must to suggest it to confirm.
- The rules of new features building is defined in docs/adding-features.md, consider these recommendations before building any new feature.

## Refactoring rules:
- Do not change anything that’s not directly relevant to the request

## Frontend and UI rules:

### Styling and icons
- Use Lucide icons libriary only
- Do not introduce additional icon libraries, if it didn't requested explicitly
- Use TailwindCSS and Tailwind Catalyst-like styles

### Components
- Reuse existing components before creating new ones
- Prefer composition over large monolithic components
- Keep components focused on a single responsibility

## Documentation
JSDoc is required only for:
  - Public APIs
  - Non-obvious business logic
  - Complex algorithms

Do not add JSDoc to trivial functions.

## Common pitfalls
  - Do not access Prisma from React components
  - Do not introduce new architectural patterns
  - Do not “clean up” code unless explicitly requested
  - Do not assume missing features — follow what exists

## Prisma-Specific Guidelines

### Schema Design
- Use meaningful, domain-driven model names.
- Leverage Prisma schema features:
  - Use @id for primary keys.
  - Use @unique for natural unique identifiers.
  - Utilize @relation for explicit relationship definitions.
- Keep schemas normalized and DRY.
- Use meaningful field names and types.
- Implement soft delete with deletedAt timestamp.
- Use Prisma's native type decorators.

### Prisma Client Usage
- Always use type-safe Prisma client operations.
- Prefer transactions for complex, multi-step operations.
- Use Prisma middleware for cross-cutting concerns:
  - Logging
  - Soft delete
  - Auditing
- Handle optional relations explicitly.
- Use Prisma's filtering and pagination capabilities.

### Database Migrations
- Create migrations for schema changes.
- Use descriptive migration names.
- Review migrations before applying.
- Never modify existing migrations.
- Keep migrations idempotent.

### Error Handling with Prisma
- Catch and handle Prisma-specific errors:
  - PrismaClientKnownRequestError
  - PrismaClientUnknownRequestError
  - PrismaClientValidationError
- Provide user-friendly error messages.
- Log detailed error information for debugging.

### Testing Prisma Code
- Use in-memory database for unit tests.
- Mock Prisma client for isolated testing.
- Test different scenarios:
  - Successful operations
  - Error cases
  - Edge conditions
- Use factory methods for test data generation.
- Implement integration tests with actual database.

### Performance Considerations
- Use select and include judiciously.
- Avoid N+1 query problems.
- Use findMany with take and skip for pagination.
- Leverage Prisma's distinct for unique results.
- Profile and optimize database queries.

### Security Best Practices
- Never expose raw Prisma client in APIs.
- Use input validation before database operations.
- Implement row-level security.
- Sanitize and validate all user inputs.
- Use Prisma's built-in protections against SQL injection.

### Coding Style
- Separate data access logic from business logic.
- Create repository patterns for complex queries.
- Use dependency injection for Prisma services.