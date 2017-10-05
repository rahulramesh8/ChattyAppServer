ChattyApp Server - A real time chat application.
=====================

A real-time application which has can used by multiple clients to send messages and media to each other without having to create accounts. ChattyApp is a Single Page Application (SPA) built with ReactJS. The client-side app communicates with a server via WebSockets for multi-user real-time updates

The App implements WebSockets using Node package `ws` on the server-side, and native WebSocket on client side.

The ChattyApp Client can be accessed via this link : (https://github.com/rahulramesh8/ChattyApp-)


### Screenshots







### Usage

Install the dependencies and start the server.

```
npm install
npm start
open http://localhost:3000
```

### Static Files

You can store static files like images, fonts, etc in the `build` folder.

For example, if you copy a file called my_image.png into the build folder you can access it using `http://localhost:3000/build/my_image.png`.

### Dependencies

* React
* Webpack
* [babel-loader](https://github.com/babel/babel-loader)
* [webpack-dev-server](https://github.com/webpack/webpack-dev-server)
