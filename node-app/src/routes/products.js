const express = require('express');
const router = express.Router();

const SAMPLE_PRODUCTS = [
  { id: 1, name: 'Cloud Server Standard', category: 'Compute', price: 49.99, inStock: true },
  { id: 2, name: 'Managed PostgreSQL Instance', category: 'Database', price: 99.00, inStock: true },
  { id: 3, name: 'Global CDN Acceleration', category: 'Networking', price: 29.50, inStock: true },
  { id: 4, name: 'Application Load Balancer', category: 'Networking', price: 35.00, inStock: false },
  { id: 5, name: 'Container Registry Storage', category: 'DevOps', price: 15.00, inStock: true }
];

router.get('/', (req, res) => {
  res.status(200).json(SAMPLE_PRODUCTS);
});

router.get('/:id', (req, res) => {
  const productId = parseInt(req.params.id, 10);
  const product = SAMPLE_PRODUCTS.find((p) => p.id === productId);

  if (!product) {
    return res.status(404).json({ error: 'Product not found', id: productId });
  }

  res.status(200).json(product);
});

module.exports = router;
