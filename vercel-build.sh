#!/bin/bash
set -e

# Install Sanity dependencies
cd sanity
npm ci
cd ..

# Build Next.js
npm run build