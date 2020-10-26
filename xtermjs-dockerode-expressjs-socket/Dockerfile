FROM node:8

#MAINTAINER boxlab@boxlab.com

#RUN apk --no-cache add --virtual native-deps \
 # g++ gcc libgcc libstdc++ linux-headers autoconf automake make nasm python git && \
  #npm install --quiet node-gyp -g 

# Set the working directory
WORKDIR /usr/src/app
EXPOSE 3000
# Set an entrypoint, to automatically install node modules
ENTRYPOINT ["/bin/bash", "-c", "if [[ ! -d node_modules ]]; then npm install; fi; exec \"${@:0}\";"]
CMD ["npm", "run", "start"]

# First, install dependencies to improve layer caching
#RUN apt-get update
#RUN apt-get -y install npm
COPY package.json /usr/src/app/
RUN npm install

# Add the code
COPY . /usr/src/app

# Run the tests and build, to make sure everything is working nicely
#RUN npm run build && npm run test
