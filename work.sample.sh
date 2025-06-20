#!/bin/bash

REPOSITORY="${1:-all}"

if [[ "$REPOSITORY" != "api" && "$REPOSITORY" != "app" && "$REPOSITORY" != "landing-page" && "$REPOSITORY" != "all" ]]; then
  echo "Error: Invalid repository name. Use either 'api', 'app', 'landing-page', or 'all'."
  exit 1
fi

CURRENT_DIR=$(pwd)

if [[ "$REPOSITORY" == "all" ]]; then
  REPOSITORY_DIR="$CURRENT_DIR/codebase"
else
  REPOSITORY_DIR="$CURRENT_DIR/codebase/$REPOSITORY"
fi

osascript <<EOF
if application "Visual Studio Code" is running then
    tell application "Visual Studio Code" to quit
end if
EOF

tmux new-session -d -s dev
tmux split-window -h

tmux send-keys -t dev:0.0 "cd $CURRENT_DIR && docker-compose up" C-m
tmux send-keys -t dev:0.1 "cd $REPOSITORY_DIR && code ." C-m

tmux attach-session -t dev
