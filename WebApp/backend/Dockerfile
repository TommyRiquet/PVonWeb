FROM node:16

WORKDIR /
COPY package-lock.json .
COPY package.json .
RUN npm ci --legacy-peer-deps
COPY . .
CMD npm start


