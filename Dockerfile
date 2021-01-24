# production stage
FROM nginx:stable-alpine
ARG source
WORKDIR /app
COPY ${source:-.} /usr/share/nginx/html
COPY ${source:-default.template} /etc/nginx/conf.d/default.template
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]