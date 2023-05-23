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
      let products = JSON.parse(archivo)
      products.push(product)
      await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2), "utf-8")
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
        console.log(`No se encontró un producto con el ID: ${id}.`)
      }
    }

    async updateProduct(id, updates) {
      let archivo = await fs.promises.readFile(this.path,"utf-8")
      let products = JSON.parse(archivo)
      let productsUpdated = products.map((ele)=>{
        if(ele.id==id) {
          updates.id=id
          return updates
        } else {
          return ele
        }
      })
      await fs.promises.writeFile(this.path, JSON.stringify(productsUpdated, null, 2), "utf-8")
    }
}
module.exports=ProductManager