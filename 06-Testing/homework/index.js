const express = require('express');
const app = express();
const { sumArray, pluck } = require('./aux');

app.use(express.json()); // for parsing application/json

app.get('/', (req, res) => {
  res.send({
    message: 'hola',
  });
});

app.get('/test', (req, res) => {
  res.send({
    message: 'test',
  });
});

app.post('/sum', (req, res) => {
  let { a, b } = req.body;
  res.send({
    result: a + b,
  });
});

app.post('/product', (req, res) => {
  res.send({
    result: req.body.a * req.body.b,
  });
});

app.post('/sumArray', (req, res) => {
  let { array, num } = req.body;
  res.send({
    result: sumArray(array, num),
  });
});

app.post('/numString', (req, res) => {
  let { string } = req.body;
  if (typeof string !== 'string' || string === '') res.sendStatus(400);
  return res.send({result: string.length});
});

app.post('/pluck', (req, res) => {
  let { array, prop } = req.body;
  if (!Array.isArray(array) || prop === '') return res.sendStatus(400);
  return res.send({result: pluck(array, prop)});
})


module.exports = app; // Exportamos app para que supertest session la pueda ejecutar
