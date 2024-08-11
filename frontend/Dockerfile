FROM node:20-alpine

# Set the working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN npm run build

# Expose the port the application runs on
EXPOSE 3000

# Command to start the application
CMD ["npm", "start"]
