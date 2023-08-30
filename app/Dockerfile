# Use the official Node.js image as the base image
FROM node:14

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install the application dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . ./

# Expose the port your application uses
EXPOSE 3000

# Command to run your application when the container starts
CMD [ "node", "app.js" ]


