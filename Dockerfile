FROM node:20-alpine

WORKDIR /app

COPY . /app

ENV NODE_ENV=production

RUN npm install serve vite typescript -g

RUN npm install --include=dev

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "serve"]