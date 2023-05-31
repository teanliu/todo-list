const jsonServer = require('json-server');
const app = jsonServer.create();
const path = require('path');
const express = require('express');
const middlewares = jsonServer.defaults();
const router = jsonServer.router('./db.json');
const PORT = process.env.PORT || 8000;

app.use(middlewares);
app.use(router);
// app.use('/db', middlewares, router);
app.use(express.static(path.join(__dirname, 'build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log('Server is running on Heroku');
});
