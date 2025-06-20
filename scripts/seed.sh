#!/bin/bash

echo "Running seed command..."

# Load environment variables
export MONGODB_URI=mongodb://127.0.0.1:27017/doteducation

# Run the seed command
bun run seed/cli.ts "$@"
