#!/bin/bash

PARENT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" >/dev/null 2>&1 && pwd)"

source $PARENT_DIR/variables.sh

$DOCKER tag $IMAGE_NAME:$LATEST_TAG $REGISTRY_IMAGE_FULL_PATH
$DOCKER tag $IMAGE_NAME:$LATEST_TAG $REGISTRY_IMAGE_FULL_PATH_LATEST_MASTER

$DOCKER login -u "$DOCKER_USER" -p "$DOCKER_PASS" $DOCKER_REGISTRY
$DOCKER push $REGISTRY_IMAGE_FULL_PATH
$DOCKER push $REGISTRY_IMAGE_FULL_PATH_LATEST_MASTER
