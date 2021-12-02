#!/bin/sh
docker build -f ./docker/Dockerfile.back --target builder .
docker build -f ./docker/Dockerfile.back --target backend -t "backend:latest" .

docker-compose -f ./docker/docker-compose.yml stop
docker-compose -f ./docker/docker-compose.yml rm -f
docker-compose -f ./docker/docker-compose.yml up -d

