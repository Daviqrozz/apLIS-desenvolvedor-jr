FROM php:8.3-cli

WORKDIR /var/www

RUN docker-php-ext-install mysqli

COPY src ./src

EXPOSE 8000

CMD ["php", "-S", "0.0.0.0:8000", "src/index.php"]
