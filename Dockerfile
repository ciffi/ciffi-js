FROM node:10-alpine

RUN apk add --no-cache bash

RUN npm install -g npm

RUN npm install -g ciffi@latest

RUN ciffi -v

USER node

RUN touch ~/.bashrc
RUN echo "if [ -f /usr/local/lib/node_modules/ciffi/ciffi.bash ]; then" >> ~/.bashrc
RUN echo "  . /usr/local/lib/node_modules/ciffi/ciffi.bash" >> ~/.bashrc
RUN echo "fi" >> ~/.bashrc
RUN npm completion >> ~/.bashrc

USER root