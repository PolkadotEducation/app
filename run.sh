#!/bin/bash

BRANCH_NAME=${1:-main}
PACKAGES_DIR="packages"
PACKAGES=("api" "app" "landing-page")

if [ ! -d ${PACKAGES_DIR} ]; then
  mkdir ${PACKAGES_DIR}
fi

cd ${PACKAGES_DIR}

for PACKAGE in "${PACKAGES[@]}"; do
  if [ -d ${PACKAGE} ]; then
    cd ${PACKAGE} && git pull origin $BRANCH_NAME && cd ..
  else
    branch_name=$BRANCH_NAME
    git clone -b $branch_name https://github.com/PolkadotEducation/${PACKAGE}.git
  fi
done
