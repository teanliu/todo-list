const jsonServer = require('json-server');
const path = require('path');
const express = require('express');
const app = jsonServer.create();
const router = jsonServer.router('./db.json');
const middlewares = jsonServer.defaults();
const PORT = process.env.PORT || 8000;


app.use('/db', middlewares, router);
app.use(express.static(path.join(__dirname, 'build')));
// app.use(
//   jsonServer.rewriter({
//     '/api/*': '/$1',
//   }),
// );

app.get('/login', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log('Server is running on Heroku...');
});
