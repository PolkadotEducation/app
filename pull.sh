#!/bin/bash

BRANCH_NAME=${1:-main}
PACKAGES_DIR="packages"
PACKAGES=("api" "app" "landing-page")

cd ${PACKAGES_DIR}

for PACKAGE in "${PACKAGES[@]}"; do
  if [ -d ${PACKAGE} ]; then
    cd ${PACKAGE} && git pull origin $BRANCH_NAME && cd ..
  fi
done
