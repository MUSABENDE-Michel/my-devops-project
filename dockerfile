# Use a lightweight Node image
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all project files
COPY . .

# Build the Vite app
RUN npm run build

# Expose port
EXPOSE 4173

# Start the production server
CMD ["npm", "run", "preview"]
