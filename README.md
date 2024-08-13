# upgrad-eshop React App

## 'git clone'

Clones the repository to your system. Use 'git clone https://github.com/cmsupriya/upgrad-eshop' to clone the app.

In the project directory, you can run:

### `npm install`

Installs 'node_modules' in the app from 'package.json' file required to run the app.

### `npm start`

Runs the app in the development mode. The page will reload when you make changes.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

# Backend Java Application

React app uses the ecommerce-upgrad-master backend java application for API integration.

## Notes: 

1. While calling the Java signin POST API (http://localhost:8080/api/auth/signin), the auth token is being returned in the response header in controllers/AuthController.java file (line: 71).

2. But the auth token is inaccessible in the response header. To make it accessible, added below line of code to the backend java application in controllers/AuthController.java file.\

#### responseHeaders.set("Access-Control-Expose-Headers", "x-auth-token");