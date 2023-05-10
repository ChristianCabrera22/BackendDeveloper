const express = require("express")
const { Router } = express
const router = new Router()
const { v4: uuidv4 } = require('uuid'); //para generar un ID aleatorio


router.use(express.json());

const db = {}; //db simulada

// Ruta raíz POST / para crear un nuevo carrito
router.post('/', (req, res) => {
  const cartId = uuidv4(); //
  db[cartId] = { id: cartId, products: [] };
  res.status(201).json(db[cartId]); //
});

router.get('/:cid', (req, res) => {
  const cart = db[req.params.cid]; // Obtener el carrito de la base de datos
  if (!cart) {
    res.status(404).json({ message: 'Carrito no encontrado' }); 
  } else {
    res.json(cart.products);
  }
});

router.post('/:cid/product/:pid', (req, res) => {
  const cart = db[req.params.cid]; 
  if (!cart) {
    res.status(404).json({ message: 'Carrito no encontrado' }); 
  } else {
    const productId = req.params.pid;
    const product = { id: productId, quantity: 1 }; 
    const existingProduct = cart.products.find(p => p.id === productId); 
    if (existingProduct) {
      existingProduct.quantity++; // producto existe, aumentar
    } else {
      cart.products.push(product); //producto no existe, agregarlo al carrito
    }
    res.json(cart.products); // Devolver los productos
  }
});



module.exports = router