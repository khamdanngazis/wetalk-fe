# Use an official Apache image as a base
FROM httpd:2.4

# Copy the React app build files into Apache's web directory
COPY dist/ /usr/local/apache2/htdocs/

# Expose port 80
EXPOSE 80
