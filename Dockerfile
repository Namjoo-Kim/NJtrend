FROM node:16.16.0 as builder

# 작업 폴더를 만들고 npm 설치
WORKDIR /usr/src/app
ENV PATH /usr/src/app/node_modules/.bin:$PATH
COPY package.json /usr/src/app/package.json
COPY . /usr/src/app

RUN apt-get update && \
    apt-get install -y nano

RUN npm install --silent
# RUN npm install react-scripts@2.1.3 -g --silent
# RUN npm install -g typescript

# RUN npm install antd  
# RUN npm install http-proxy-middleware
RUN npm install group-by-with-sum
# RUN npm install aos

RUN npx update-browserslist-db@latest

RUN npm install -g serve 
RUN npm run build

EXPOSE 3000
# 소스를 작업폴더로 복사하고 앱 실행

CMD ["npx", "serve","-l","3000","-s","build"]
# CMD ["npm", "start"]
# CMD ["npm", "start","--host", "0.0.0.0", "--port", "3000"]