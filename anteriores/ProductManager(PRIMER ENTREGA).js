class ProductManager {

    constructor (){
        this.prod = []    
    }
    getProduct = () => {
        return this.prod
    }
    addProduct= (title,description,price,img,code,stock) => {
        let codeFind = this.prod.find(producto => producto.code == code) 

        if (codeFind) {
            let  x = Math.floor(Math.random()*100);
            let id = code + x
            
        return this.prod.push(
            {
               title:title,
               description:description,
               price:price,
               img:img,
               code:id,
               stock:stock
           }
           )
        }
       else {
        return this.prod.push(
            {
               title:title,
               description:description,
               price:price,
               img:img,
               code:code,
               stock:stock
           }
           )
      
       }
       
    }
    getProducById = (code) => {
        let codeFind = this.prod.find(prod => prod.code == code)

        if (this.prod.length == 0){
            return console.log('Carrito vacio')
        }
        else if (codeFind){
           return codeFind
        }
        else{
            return console.log(`${code} :inexistente`)
        }
    }

}
let producto = new ProductManager()


//addProduct= (title,description,price,img,code,stock)
producto.addProduct('Pure de Tomate','Extracto de tomate triturado',230,'http://pureTomate.jpg',1,20)
producto.addProduct('Fideos','Mostacholes',150,'http://fideosMostacholes.jpg',42,20)
console.log(producto.getProduct())
//sd
