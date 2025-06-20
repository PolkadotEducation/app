# **Polkadot Education**

**Empowering Enterprises with Blockchain Knowledge**

Polkadot Education is a mobile-first responsive web app designed to provide comprehensive blockchain and Web3 education tailored for enterprises and institutions. Our goal is to guide users from the basics to advanced knowledge of Polkadot through an engaging and practical learning journey.

[Website](https://polkadot.education) · [Support](mailto:support@polkadot.education)

---

# Get Started

This repository provides the setup and configuration needed to get started with local development for Polkadot Education, including app, api, and database.

Follow the instructions below to set up and run the project using Docker Compose.

## Quickstart Development Setup

### 1. Clone the repository

First, clone this repository to your local machine:

```bash
git clone https://github.com/PolkadotEducation/app.git
cd app
```

### 2. Start Development Environment

To start all services, use Docker Compose:

```bash
bun run dev
```

Or directly with Docker Compose:
```bash
docker compose up
```

**Optional**: Run without the landing page
If you want to run the setup without the landing page service, use the slim profile:
```bash
bun run dev:slim
```

### 3. Shutdown Development Environment
To stop all containers, networks, and volumes created by Docker Compose, run:
```bash
docker compose down
```

### 4. (Optional) Setup a script to start working
We provide a sample script to start working right away for MacOS users with tmux and Visual Studio Code.
Create a copy of the sample script (and edit it according to your needs):
```bash
cp work.sample.sh work.sh
```

Start working in your desired package (choose between `api`, `app`, `landing-page`, and `all` — default is `all`):
```bash
./work.sh <package>
```

Pull all the recent changes from the codebase:
```bash
./pull.sh
```

Ps.: run `chmod +x <script.sh>` if you're having `permission denied` issues

## Database Management

The monorepo includes database seeding and management commands. You can run these from the root directory:

```bash
# Seed all data
bun run db:seed:all

# Seed only courses
bun run db:seed:courses

# Reset database (drop all + seed all)
bun run db:reset

# Drop all data
bun run db:drop:all

# Drop only courses
bun run db:drop:courses

# Update correct choices for lessons
bun run db:seed:courses:choices
```

## Development Workflow

### Starting Development
```bash
# Start all services
bun run dev

# Start without landing page
bun run dev:slim
```

### Database Operations
```bash
# Reset and seed database
bun run db:reset

# Seed only courses
bun run db:seed:courses
```

### Building and Testing
```bash
# Build all packages
bun run build

# Run tests
bun run test

# Run linting
bun run lint
```

# Contributing
We welcome contributions to the Polkadot Education project!

If you have suggestions, improvements, or bug fixes, please submit a pull request or open an issue in the appropriate package:
- app: https://github.com/PolkadotEducation/app/issues
- api: https://github.com/PolkadotEducation/api/issues
- landing-page: https://github.com/PolkadotEducation/landing-page/issues

# Contact
For any questions or support, please contact us at [support@polkadot.education](mailto:support@polkadot.education)
