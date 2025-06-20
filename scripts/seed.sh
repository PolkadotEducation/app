#!/bin/bash

echo "Running seed command..."

# Load environment variables
export $(cat environments/.api | xargs)

# Run the seed command
bun run seed/cli.ts "$@"
