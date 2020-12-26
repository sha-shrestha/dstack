#!/bin/bash

TIMESTAMP=$(date +%Y%m%d%H%M%S)  
DOCKER=docker
IMAGE_NAME=dstack-base
TIMESTAMPED_TAG=$TIMESTAMP
LATEST_TAG=latest
DOCKER_USER=AWS
DOCKER_PASS=$(aws ecr get-login-password --region us-east-1)
DOCKER_REGISTRY=dstackai
REGISTRY_IMAGE_FULL_PATH_LATEST=$DOCKER_REGISTRY/$IMAGE_NAME:$LATEST_TAG
REGISTRY_IMAGE_FULL_PATH=$DOCKER_REGISTRY/$IMAGE_NAME:$TIMESTAMPED_TAG