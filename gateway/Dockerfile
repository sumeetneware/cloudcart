
FROM node:20-alpine AS frontend-builder

WORKDIR /frontend

COPY frontend/cloudcart-ui/package*.json ./

RUN npm install

COPY frontend/cloudcart-ui/ .

# Production build
RUN npm run build




FROM nginx:alpine

# Remove default Nginx website
RUN rm -rf /usr/share/nginx/html/*

# Copy React production build
COPY --from=frontend-builder /frontend/dist /usr/share/nginx/html

# Copy CloudCart Nginx configuration
COPY gateway/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]