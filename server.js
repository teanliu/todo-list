const jsonServer = require('json-server');
const path = require('path');
const express = require('express');
const server = express();


const middlewares = jsonServer.defaults({
  static: './build',
});
const PORT = process.env.PORT || 8000;


server.use(middlewares);
server.use('/api', jsonServer.router('./db.json'));
server.use(express.static(path.join(__dirname,'build')));
// server.use((req, res, next) => {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });
server.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
server.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});

// put in package.json/ scripts
// "heroku-postbuild": "npm run build"