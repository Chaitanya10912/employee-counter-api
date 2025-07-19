FROM node:18-alpine
WORKDIR /employee-counter-api
COPY employee-counter-api/package*.json ./
RUN npm install
COPY employee-counter-api/ .
EXPOSE 3000
CMD ["node", "index.js"]
