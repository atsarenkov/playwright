FROM mcr.microsoft.com/playwright:v1.37.0
COPY . /playwright
WORKDIR /playwright
RUN npx playwright install chrome && npx playwright install msedge
CMD ["npx", "playwright", "test"]