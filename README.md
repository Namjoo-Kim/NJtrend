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

EXPOSE 3000
COPY . /usr/src/app
CMD ["npm", "start"]

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


<!-- # Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/). -->
