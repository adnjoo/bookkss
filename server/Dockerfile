# Use the official Node.js 14 image as the base image
FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

RUN npx prisma generate

# Copy the rest of the application code to the container
COPY . .

# Build the TypeScript code
RUN npm run build

# Expose the port the app will run on
EXPOSE 3000

# Start the Express server
CMD ["npm", "start"]
