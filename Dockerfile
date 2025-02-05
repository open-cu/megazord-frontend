FROM node:17-alpine

WORKDIR /app

COPY . /app

ENV NODE_ENV=production

RUN npm install serve tsc -g

RUN npm install

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "serve"]