FROM node:20.9.0

WORKDIR /usr/src/app

COPY package*.json .
RUN npm install -g pnpm
RUN pnpm i


COPY . /usr/src/app

CMD ["pnpm", "dev"]
