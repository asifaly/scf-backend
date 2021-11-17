FROM node:16-alpine as base

# RUN mkdir -p /usr/app
# WORKDIR /usr/app
# COPY package.json tsconfig.json ./
# COPY src ./src
# ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.9.0/wait /wait
# RUN chmod +x /wait
# RUN npm install 

# EXPOSE 4000
# CMD /wait && npm start

WORKDIR /home/node/app
COPY package*.json ./
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.9.0/wait /wait
RUN chmod +x /wait
RUN npm i
COPY . .

FROM base as production
ENV NODE_PATH=./dist
RUN npm run build

