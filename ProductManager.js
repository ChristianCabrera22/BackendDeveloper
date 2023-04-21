const fs = require("fs/promises");

class ProductManager {
  constructor() {
    this.path = "./products.json"
    this.products = [];
    this.productId = 1;
  }

  async getProducts() {
    try {
      const data = await fs.readFile(this.path);
      this.products = JSON.parse(data);
    } catch (err) {
        // Si el archivo no existe, no hay productos todavía
        this.products = [];
    }
    return this.products;
  }

  async addProduct(product) {
    const id = this.productId++;
    product.id = id;
    await this.getProducts();
    this.products.push(product);
    await fs.writeFile(this.path, JSON.stringify(this.products), "utf-8");
  }

  async getProductById(id) {
    await this.getProducts();
    const product = this.products.find((product) => product.id === id);
    if (!product) {
      throw new Error(`Product with id ${id} not found`);
    }
    return product;
  }

  async updateProduct(id, updates) {
    await this.getProducts();
    const productIndex = this.products.findIndex((product) => product.id === id);
    if (productIndex === -1) {
      throw new Error(`Product with id ${id} not found`);
    }
    const updatedProduct = Object.assign({}, this.products[productIndex], updates);
    this.products[productIndex] = updatedProduct;
    await fs.writeFile(this.path, JSON.stringify(this.products), "utf-8");
  }

  async deleteProduct(id) {
    await this.getProducts();
    const productIndex = this.products.findIndex((product) => product.id === id);
    if (productIndex === -1) {
      throw new Error(`Product with id ${id} not found`);
    }
    this.products.splice(productIndex, 1);
    await fs.writeFile(this.path, JSON.stringify(this.products), "utf-8");
  }
}

const productManager = new ProductManager();

(async () => {
  console.log(await productManager.getProducts()); // []

  const productToAdd = {
    title: "Pure de Tomate",
    description: "Extracto de tomate triturado",
    price: 230,
    thumbnail: "http://pureTomate.jpg",
    code: "123",
    stock: 25,
  };
  await productManager.addProduct(productToAdd);
  console.log(await productManager.getProducts()); 

  const productId = 1;
  const productToUpdate = {
    price: 30000,
    stock: 10,
  };
  await productManager.updateProduct(productId, productToUpdate);
  console.log(await productManager.getProducts()); 

  await productManager.deleteProduct(productId);
  console.log(await productManager.getProducts()); // []
})();