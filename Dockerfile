# Development Dockerfile for Angular 21
FROM node:22.12

WORKDIR /app

# Install Angular CLI globally
RUN npm install -g @angular/cli@21.0.3

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy project files
COPY . .

# Expose port
EXPOSE 4200

# Start dev server with hot reload
CMD ["ng", "serve", "--host", "0.0.0.0", "--poll", "2000"]