#!/bin/bash
set -e

# Install Sanity dependencies
echo "Installing Sanity dependencies..."
cd sanity
npm ci --no-audit --prefer-offline
cd ..

# Install root dependencies
echo "Installing root dependencies..."
npm ci --no-audit --prefer-offline

# Build Sanity Studio
echo "Building Sanity Studio..."
cd sanity
npm run build
cd ..

# Build Next.js
echo "Building Next.js application..."
npm run build

echo "Build completed successfully!"