#!/bin/bash

# Production Deployment Script for SmartVault

echo " Starting SmartVault Production Deployment..."

if [ ! -f .env.production ]; then
    echo " Error: .env.production file not found!"
    echo " Please copy .env.example to .env.production and fill in your values"
    exit 1
fi

# Load environment variables
export $(cat .env.production | grep -v '#' | awk '/=/ {print $1}')

echo " Building Docker image..."
docker build -t smartvault:latest .

if [ $? -ne 0 ]; then
    echo "Docker build failed!"
    exit 1
fi

echo " Stopping existing containers..."
docker-compose down

echo " Starting production containers..."
docker-compose up -d

echo " Waiting for application to start..."
sleep 10

echo "Checking container health..."
docker-compose ps

echo "Checking application logs..."
docker-compose logs --tail=20 smartvault

echo "Deployment completed!"
echo "Application should be available at http://localhost:3000"
echo "Check logs with: docker-compose logs -f smartvault"
