# Use an official Node runtime as a parent image
FROM node:16.18-bullseye-slim

# Set the working directory in the container
WORKDIR /usr/src/app/client

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

# Expose the port that the client will run on
EXPOSE 8080

# Define the command to run your client (for example, if using create-react-app)
CMD ["npm", "run", "start"]