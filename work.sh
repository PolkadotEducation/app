#!/bin/bash

PACKAGE="${1:-all}"

if [[ "$PACKAGE" != "api" && "$PACKAGE" != "app" && "$PACKAGE" != "landing-page" && "$PACKAGE" != "all" ]]; then
  echo "Error: Invalid package name. Use either 'api', 'app', 'landing-page', or 'all'."
  exit 1
fi

CURRENT_DIR=$(pwd)

if [[ "$PACKAGE" == "all" ]]; then
  PACKAGE_DIR="$CURRENT_DIR/packages"
else
  PACKAGE_DIR="$CURRENT_DIR/packages/$PACKAGE"
fi

osascript <<EOF
if application "Visual Studio Code" is running then
    tell application "Visual Studio Code" to quit
end if
EOF

tmux new-session -d -s dev
tmux split-window -h

tmux send-keys -t dev:0.0 "cd $CURRENT_DIR && docker-compose up" C-m
tmux send-keys -t dev:0.1 "cd $PACKAGE_DIR && cursor ." C-m

tmux attach-session -t dev
