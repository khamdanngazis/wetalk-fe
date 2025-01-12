# Use the official Apache HTTPD image
FROM httpd:2.4

# Copy the dist folder (React app output) into the Apache web directory
COPY dist/ /usr/local/apache2/htdocs/

# Copy the custom .htaccess to handle SPA routing
COPY .htaccess /usr/local/apache2/htdocs/

# Expose port 80 for the Apache server
EXPOSE 80
