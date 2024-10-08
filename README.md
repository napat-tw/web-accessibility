# Web Accessibility Project

## Overview

This project is a demonstration of web accessibility using React. It features a registration form that captures user information with appropriate ARIA roles and validation feedback for users of assistive technologies. The goal is to showcase best practices in web accessibility.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Running Tests](#running-tests)
  - [Unit Tests with Jest](#unit-tests-with-jest)
  - [Cypress Tests](#cypress-tests)
- [Contributing](#contributing)

## Features

- Semantic HTML and proper use of ARIA roles
- Form validation with live error messages for accessibility
- Support for screen readers
- Responsive design for various screen sizes
- Lazy loading of modal components
- Accessibility testing using Jest and Cypress

## Technologies Used

- React
- TypeScript
- Jest
- Cypress

## Installation

To get started with this project, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/web-accessibility.git
   cd web-accessibility
   ```

2. Install the dependencies using npm:
   ```bash
   npm install
   ```

## Running the Application

Once the installation is complete, you can start the application:

```bash
npm start
```

The application will be available at http://localhost:3000.

## Running Tests

### Unit Tests with Jest

To run the unit tests using Jest, execute the following command:

```bash
npm test
```

This command will run all tests in the __tests__ folder and any files with a .test.tsx or .test.ts suffix.

### Cypress Tests

To run Cypress tests, follow these steps:

1. Open Cypress by running:

```bash
npx cypress open
```

This will open the Cypress Test Runner.

2. Select a test file to run in the Cypress UI, which will open a new browser window to run the tests.

To run all Cypress tests in headless mode (without the UI), use the following command:

```bash
npx cypress run
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any features or improvements.
