const test = require('node:test');
const assert = require('node:assert/strict');
const request = require('supertest');
const app = require('../src/app');

test('GET /health returns 200 and healthy status', async () => {
  const res = await request(app).get('/health');
  assert.equal(res.status, 200);
  assert.equal(res.body.status, 'UP');
  assert.equal(res.body.service, 'node-app');
  assert.ok(res.body.timestamp);
});

test('GET /api/products returns array of sample products', async () => {
  const res = await request(app).get('/api/products');
  assert.equal(res.status, 200);
  assert.ok(Array.isArray(res.body));
  assert.ok(res.body.length >= 3);
  assert.equal(res.body[0].id, 1);
  assert.ok(res.body[0].name);
});

test('GET /api/products/:id returns specific product', async () => {
  const res = await request(app).get('/api/products/1');
  assert.equal(res.status, 200);
  assert.equal(res.body.id, 1);
  assert.equal(res.body.name, 'Cloud Server Standard');
});

test('GET /api/products/:id returns 404 for invalid product id', async () => {
  const res = await request(app).get('/api/products/9999');
  assert.equal(res.status, 404);
  assert.equal(res.body.error, 'Product not found');
});

test('GET /unknown-path returns 404', async () => {
  const res = await request(app).get('/unknown-path');
  assert.equal(res.status, 404);
  assert.equal(res.body.error, 'Route not found');
});
