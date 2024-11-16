FROM node:18-alpine
RUN apk add --no-cache python3 make g++ 
WORKDIR /app
COPY package.json .
COPY .env .
RUN npm install
COPY . .
EXPOSE 3003
CMD ["npm", "start"]
