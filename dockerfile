FROM node:18.17.0-alpine
WORKDIR /nicasource-video-platform
COPY package*.json ./
RUN npm ci
RUN apk add --no-cache git
EXPOSE ${API_PORT}
CMD ["npm", "run", "dev"]