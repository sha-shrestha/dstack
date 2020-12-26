#!/bin/bash

PARENT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" >/dev/null 2>&1 && pwd)"

source $PARENT_DIR/variables.sh

echo Logging in to Docker as user $DOCKER_USER
$DOCKER login --username "$DOCKER_USER" --password "$DOCKER_PASS" $DOCKER_REGISTRY

$DOCKER build --progress plain --tag $IMAGE_NAME:$LATEST_TAG -f $PARENT_DIR/Dockerfile $PARENT_DIR
