FROM node:20
WORKDIR /app
COPY . .
RUN npm i
EXPOSE 8080
CMD ["npm", "start"]
