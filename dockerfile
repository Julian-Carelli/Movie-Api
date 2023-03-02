FROM node:14-alpine AS development
LABEL version="1.0"
ENV NODE_ENV development

WORKDIR /app

COPY package.json .
RUN npm i 
COPY . .

EXPOSE 3000

CMD ["npm", "start"]