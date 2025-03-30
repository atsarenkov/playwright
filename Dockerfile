FROM mcr.microsoft.com/playwright:v1.51.1
COPY . /playwright
WORKDIR /playwright
RUN npx playwright install chrome && npx playwright install msedge