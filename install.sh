#!/bin/sh
docker build -f ./docker/Dockerfile.back --target builder .
docker build -f ./docker/Dockerfile.back --target backend -t "backend:latest" .
