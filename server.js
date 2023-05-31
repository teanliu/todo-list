// const jsonServer = require('json-server');
// const app = jsonServer.create();
// const path = require('path');
// const express = require('express');
// const middlewares = jsonServer.defaults();
// const router = jsonServer.router('./db.json');
// const PORT = process.env.PORT || 8000;

// app.use(middlewares);
// app.use(router);
// // app.use('/db', middlewares, router);
// app.use(express.static(path.join(__dirname, 'build')));
// app.use((req, res, next) => {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });
// app.listen(PORT, () => {
//   console.log('Server is running on Heroku');
// });

const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('./db.json');
const middlewares = jsonServer.defaults({
  static: './build',
});
const PORT = process.env.PORT || 8000;

server.use(middlewares);
server.use(router);
server.listen(PORT, () => {
  console.log('Server is running');
});