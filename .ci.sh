#!/bin/sh

npm ci

if [ $PROJECT != "api" ]
then
  BROWSER=$PROJECT
  npx playwright install $BROWSER
fi  

npx playwright test --project=$PROJECT