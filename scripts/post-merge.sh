#!/usr/bin/env bash
# post-merge.sh -- run automatically after task agent merges
set -e
echo "Running post-merge setup..."
npm install
echo "Post-merge complete."
