FROM node:16

# set workdir
WORKDIR /app/src

COPY package.json .
COPY yarn.lock .
RUN npm install --silent

# expose port
EXPOSE 3000