# Use Nginx to serve static files
FROM nginx:alpine

# Copy built React app to Nginx's public folder
COPY build/ /usr/share/nginx/html

# Copy custom Nginx config (optional)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3600

CMD ["nginx", "-g", "daemon off;"]

