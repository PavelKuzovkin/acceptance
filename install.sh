#!/bin/sh
docker build -f ./docker/Dockerfile.back --target builder .
docker build -f ./docker/Dockerfile.back --target backend -t "backend:latest" .

docker build -f ./docker/Dockerfile.front --target builder .
docker build -f ./docker/Dockerfile.front --target cabinet -t "cabinet:latest" .

docker-compose -f ./docker/docker-compose.yml stop
docker-compose -f ./docker/docker-compose.yml rm -f
docker-compose -f ./docker/docker-compose.yml up -d

mkdir -p /var/www/html
cp -R -f ./recognition/pepper-cam /var/www/html
