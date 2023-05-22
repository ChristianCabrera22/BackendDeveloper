const fs = require("fs");

class ProductManager {
  constructor() {
    this.path = "./products.json" //ruta de mi archivo
  }

    async getProducts() {
        let archivo = await fs.promises.readFile(this.path,"utf-8");
        return archivo
    }

    async addProduct(product) {
      let archivo = await fs.promises.readFile(this.path,"utf-8")
      let archivoReal = JSON.parse(archivo)
      archivoReal.push(product)
      await fs.promises.writeFile(this.path, JSON.stringify(archivoReal, null, 2), "utf-8")
    }

    async deleteProduct(id) {
      let archivo = await fs.promises.readFile(this.path,"utf-8")
      let products = JSON.parse(archivo)
      console.log(products)
      const index = products.findIndex((product) => product.id === parseInt(id));
      console.log(index)
      if (index !== -1) {
        products.splice(index, 1);
        await fs.promises.writeFile(
          this.path,
          JSON.stringify(products, null, 2),
          "utf-8"
        );
      } else {
        console.log(`No se encontró un producto con el ID ${id}.`)
      }
    }

  // async updateProduct(id, updates) {
  //   await this.getProducts();
  //   const productIndex = this.products.findIndex((product) => product.id === id);
  //   if (productIndex === -1) {
  //     throw new Error(`Product with id ${id} not found`);
  //   }
  //   const updatedProduct = Object.assign({}, this.products[productIndex], updates);
  //   this.products[productIndex] = updatedProduct;
  //   await fs.writeFile(this.path, JSON.stringify(this.products, null, 2), "utf-8");
  // }


}

// const productManager = new ProductManager();

/* 
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
*/
module.exports=ProductManager