#############
### build ###
#############

# base image
FROM node:12.16.2-alpine as builder

# create app directory
WORKDIR /usr/src/app

# install app dependencies
# if building code for production, RUN npm ci --only=production
COPY ./package*.json ./
RUN npm ci

# copy app source
COPY ./ ./

# generate build
RUN npm run build

#############
### start ###
#############

# base image
FROM node:12.16.2-alpine

# create distribution directory
WORKDIR /usr/src/app

# install app dependencies
# if building code for production, RUN npm ci --only=production
COPY ./package*.json ./
RUN npm ci

# copy artifact build from the 'build environment'
COPY --from=builder /usr/src/app/build ./build

COPY ./.env ./

# run node
CMD ["npm", "run", "start-build"]
