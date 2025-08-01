# Polkadot Education Front-End Application

Empowering Enterprises with Blockchain Knowledge

Polkadot Education is a mobile-first responsive web app designed to provide comprehensive blockchain and Web3 education tailored for enterprises and institutions. Our goal is to guide users from the basics to advanced knowledge of Polkadot through an engaging and practical learning journey.

[Website](https://polkadot.education) · [Support](mailto:support@polkadot.education)

---

## Get Started

This repository contains the front-end application for Polkadot Education. Follow the instructions below to set up and run the project locally.

### 1. Clone the Repository

First, clone this repository to your local machine.
Use the `--recursive` flag to clone the [api](https://github.com/PolkadotEducation/api) and the [landing-page](https://github.com/PolkadotEducation/landing-page) repositories as submodules:

```bash
git clone --recursive https://github.com/PolkadotEducation/app.git
cd app
```

### 2. Install Dependencies

Install the required dependencies using [Bun](https://bun.sh/):

```bash
bun install
```

### 3. Start the Services

To start the services, run:

```bash
bun run compose up
```

After starting the services, open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Commands

The project has the following commands:

- `bun run build`: Builds the project
- `bun run build-storybook`: Builds the storybook
- `bun run compose up`: Starts containers
- `bun run compose down`: Stops and removes containers
- `bun run compose-all up`: Starts all containers (including landing-page)
- `bun run compose-all down`: Stops and removes all containers (including landing-page)
- `bun run db:reset`: Drops database and runs the seed
- `bun run db:drop:all`: Drops the database
- `bun run db:drop:courses`: Drops just the courses
- `bun run db:seed:all`: Runs the whole seed
- `bun run db:seed:courses`: Runs the seed for courses only
- `bun run format`: Runs Prettier
- `bun run format:fix`: Fixes Prettier errors
- `bun run lint`: Runs ESLint
- `bun run lint:fix`: Fixes ESLint errors
- `bun run pull`: Pulls the main repository and all submodules
- `bun run storybook`: Runs the storybook
- `bun run test`: Runs Cypress tests
- `bun run test:open`: Runs Cypress tests in Launchpad mode
- `bun run type-check`: Runs TypeScript check
- `bun run wait`: Waits for the API to start

## Project Structure

The project structure is organized as follows:

- `.github/` and `.storybook/`: Configuration files and workflows for continuous integration and Storybook.
- `api/`: Modules related to backend API communication.
- `app/`: Main application components.
- `components/`: Reusable UI components.
- `context/`: React context implementation for state management.
- `hooks/`: Custom React hooks.
- `lib/`: Helper functions and libraries.
- `public/assets/`: Public files such as images and other assets.
- `stories/`: Storybook files.
- `submodules/`: Complementary repositories.
- `types/`: TypeScript type definitions.

## Contributing

We welcome contributions to the Polkadot Education project! If you have suggestions, improvements, or bug fixes, please submit a pull request or open an issue in the appropriate repository:

- [app](https://github.com/PolkadotEducation/app/issues)
- [api](https://github.com/PolkadotEducation/api/issues)
- [landing-page](https://github.com/PolkadotEducation/landing-page/issues)

## Contact

For any questions or support, please contact us at [support@polkadot.education](mailto:support@polkadot.education).

---

© Polkadot Education
