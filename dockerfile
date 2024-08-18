FROM node:20.10 AS builder
WORKDIR /src

# Install Ruby
RUN apt-get update
RUN apt-get install -y ruby-dev gcc g++ make
RUN gem install bundler

# Install npm deps
COPY ./package.json ./
RUN npm install

# Install ruby deps
COPY ./Gemfile ./
RUN bundle install

# Copy source files over
COPY . .

# Build JS
RUN npm run ng-build-prod

# Build Jekyll
RUN npm run jekyll-build

# ----------------------------------------

FROM httpd:2.4.57-alpine as final
WORKDIR /usr/local/apache2/

# Configure apache
RUN sed -i 's/^#LoadModule rewrite_module/LoadModule rewrite_module/' /usr/local/apache2/conf/httpd.conf
COPY ./docker/jekyll.conf /usr/local/apache2/conf/extra/jekyll.conf
RUN echo "Include conf/extra/jekyll.conf" >> /usr/local/apache2/conf/httpd.conf

COPY --from=builder /src/_site ./htdocs/documentation

EXPOSE 80
EXPOSE 443