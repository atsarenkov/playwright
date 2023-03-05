#!/bin/sh

echo "Running $TAG tests"

npm ci

npx playwright install $BROWSER

npx playwright test \
  --config=$CONFIG-tests.config.ts \
  --grep $TAG \
  --project=$BROWSER