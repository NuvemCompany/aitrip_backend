FROM node:20-alpine

# Install bash
RUN apk add --no-cache bash

# Set the working directory
WORKDIR /workspace

# Copy package files and install dependencies as root
COPY package.json yarn.lock ./
RUN yarn install

# Change ownership of the workspace directory
RUN chown -R node:node /workspace

# Switch to node user
USER node

# Copy the rest of the application code as node user
COPY --chown=node:node . .

# Generate Prisma Client as node user
RUN npx prisma generate

# Expose the application port
EXPOSE 3001

# Start the application
CMD ["yarn", "start:dev"]
