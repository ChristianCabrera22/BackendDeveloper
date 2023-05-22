const express = require("express")
const {Router} = express
const router = Router()
const uuid4 = require("uuid")
const ProductManager = require('../ProductManager')

// let products = [
//     { id: 1234, name: "Pure de tomate", price: 180},
//     { id: 1234, name: "FIdeos", price: 250},
//     { id: 1234, name: "Arroz", price: 80}
// ] //db simulada

// let ProductMet = new ProductManager()
// let products = ProductMet.getProducts()
// console.log(products)

router.use(express.json())

//todos los productos
router.get('/', (req, res)=>{
    let ProductMet = new ProductManager()
    const resp = ProductMet.getProducts()
    resp.then(pr => {
        let products = JSON.parse(pr,null,2)
        req.query.limit ? 
        res.send({data:products.slice(0, req.query.limit), message:"Query limit="+req.query.limit}) : res.send({data:products, message:"All Products send"})

    }).catch(err => {
        console.log(err)
    })
})


router.get('/:id', (req, res)=>{
    let id = req.params.id
    let ProductMet = new ProductManager()
    const resp = ProductMet.getProducts()
    resp.then(pr => {
        let products = JSON.parse(pr,null,2)
        let idFound = products.find((elem)=> {
            return elem.id == id
        })
        idFound ? res.send({data:idFound, message:"Product found"}) : res.send({message:"Product no found"})

    }).catch(err => {
        console.log(err)
    })

})

router.get("/deleteProduct/:id", (req, res)=> {
    let id = req.params.id
    let ProductMet = new ProductManager()
    ProductMet.deleteProduct(id)
    res.send({data:id, message:"Products remove"})
})

router.post('/createProduct', (req, res)=> {
    // body
    let id = uuid4()
    let pr = req.body
    let ProductMet = new ProductManager()
    pr.id = id
    ProductMet.addProduct(pr)
    res.send({data:pr, message:'Products save'})
})


// router.put("/updateProduct/:id", (req, res)=> {
//     let id = req.params.id
//     let infoNew = req.body

//     let arrayUpdated = products.map((ele)=>{
//         if(ele.id == id){
//             return {...ele, infoNew} 
//         } else {
//             return ele
//         }
//     })
//     console.log(arrayUpdated)
//     products = arrayUpdated
//     res.send({data:products, message:"Products update ok"})
// })

module.exports = router