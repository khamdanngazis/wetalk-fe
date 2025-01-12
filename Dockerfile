# Step 1: Use Nginx to serve the app
FROM nginx:alpine

# Copy the pre-built Vite production output into the Nginx directory
COPY ./dist /usr/share/nginx/html

# Expose port 80 for Nginx
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
