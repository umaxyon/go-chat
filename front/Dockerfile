FROM node:16.14.2
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile & yarn add @next/swc-linux-x64-gnu

EXPOSE 3000

CMD ["yarn", "build"]
