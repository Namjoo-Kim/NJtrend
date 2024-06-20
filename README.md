# 0. 운영 주소
https://trendata.duckdns.org/

# 1. 설치
## 1.1 세팅
Node.js 등 기본 세팅을 설치한다. (NPM 등이 가능한 환경)  
(https://ssungkang.tistory.com/entry/React-React-%EC%8B%9C%EC%9E%91%ED%95%98%EA%B8%B0-create-react-app)

## 1.2 템플릿 설치
### 1.2.1 리액트 설치
npm install -g create-react-app
### 1.2.2 프로젝트 설치
npx create-react-app 프로젝트명  
타입스크립트 버전을 원한다면  
npx create-react-app 프로젝트명  --template typescript  

## 1.3 ANTD(차트 템플릿) 설치
npm install antd  

## 1.4 실행
npm install  
npm start  

# 2. dockerfile
## 2.1 작성
FROM node:16.16.0 as builder  

WORKDIR /usr/src/app  
ENV PATH /usr/src/app/node_modules/.bin:$PATH  
COPY package.json /usr/src/app/package.json  

RUN npm install --silent  
RUN npm install -g typescript  
RUN npm install antd   
RUN npm install http-proxy-middleware  
RUN npm install group-by-with-sum  


EXPOSE 3000  
COPY . /usr/src/app  
CMD ["npm", "start"]  

운영서버로 빌드하고 싶으면 밑을 추가 및 변경  
RUN npm install -g serve    
RUN npm run build  
CMD ["npm", "start"] -> CMD ["npx", "serve","-l","3000","-s","build"]  

## 2.2 프록시 설정   
"proxy": "http://127.0.0.1:8000"  
->  
"proxy": "http://fastapi:8000"  
로 설정 후 빌드

# 3. 빌드 및 실행
## 3.1 빌드
armm 버전 (m1)  
docker build -t namjoo11/njtrend .    

amd64 버전  
docker build --platform linux/amd64 -t namjoo11/njtrend_amd64 . 
## 3.2 run
docker run --name react -dp 3000:3000 namjoo11/njtrend  

확인   
docker exec -it react /bin/bash  

# 4. github.io
package.json 에서 다음을 추가
"homepage": "http://namjoo-kim.github.io/NJtrend/",  

routes.tsx 다음을 추가
basename={process.env.PUBLIC_URL}

npm run deploy

# 5. 외부 호스트 설정
./node_modules/react-scripts/config/webpackDevServer.config.js

allowedHosts: [
    'localhost',
    'njtrend.duckdns.org',
],

을 추가