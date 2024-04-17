# Use a lightweight Node.js base image
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the built Next.js application to the container
Copy . .
# Install production dependencies
RUN npm install 
Run npm run build
# Expose the default Next.js port
EXPOSE 3000

# Run the Next.js application
CMD ["npx","serve@latest", "out"]