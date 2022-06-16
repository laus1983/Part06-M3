const session = require('supertest-session');
const app = require('../index.js'); // Importo el archivo de entrada del server de express.
//const {expect} = require('chai');
const agent = session(app);

describe('Test de APIS', () => {
  describe('GET /', () => {
    it('responds with 200', () => agent.get('/').expect(200));
    it('responds with and object with message `hola`', () =>
        agent.get('/').then((res) => {
          expect(res.body.message).toEqual('hola');
        }));
  });

  describe('GET /test', () => {
    it('responds with 200', () => agent.get('/test').expect(200));
    it('responds with and object with message `test`', () =>
      agent.get('/test').then((res) => {
        expect(res.body.message).toEqual('test');
      }));
  });

  describe('POST /sum', () => {
    it('responds with 200', () => agent.post('/sum').expect(200));
    it('responds with the sum of 2 and 3', () =>
      agent.post('/sum')
        .send({a: 2, b: 3})
        .then((res) => {
          expect(res.body.result).toEqual(5);
        })
    );
  });

  describe('POST /product', () => {
    it('responds with 200', () => agent.post('/product').expect(200));
    it('responds with the product of 2 and 3', () =>
      agent.post('/product')
        .send({a: 2, b: 3})
        .then((res) => {
          expect(res.body.result).toEqual(6);
        })
    );
  });

  describe('POST /sumArray', () => {
    it('responds with 200', () => agent.get('/test').expect(200));
    it('responds with and object with message `test`', () =>
      agent.post('/sumArray')
        .send({array: [2,5,7,10,11,15,20], num: 13})
        .then((res) => {
          expect(res.body.result).toEqual(true);
      }));
  });

  describe('POST /numString', () => {
    it('responds with 200', () => agent.post('/numString').send({string: 'luis'}).expect(200));
    it('responds with 400 if query parameter is a number', () => agent.post('/numString').send({string: 1}).expect(400));
    it('responds with 400 if query parameter is empty', () => agent.post('/numString').send({string: ''}).expect(400));
    it('responds with 4', () =>
      agent.post('/numString').send({string: 'hola'}).then((res) => expect(res.body.result).toEqual(4)));
});

describe('POST /pluck', () => {
  let array = [{title: 'title1', stock: 10}, {title: 'title2', stock: 20}, {title: 'title3', stock: 30}];
  it('responds with 400 is array is not an array', () => agent.post('/pluck').send({array: 123, prop: 'title'}).expect(400));
  it('responds with 400 if empty string', () => agent.post('/pluck').send({array: array, prop: ''}).expect(400));
  it('responds with 200', () => agent.post('/pluck').send({array: array, prop: 'title'}).expect(200));
  it('responds with titles', () =>
    agent.post('/pluck').send({array: array, prop: 'title'}).then((res) => expect(res.body.result).toEqual(['title1', 'title2', 'title3'])));
});

});

