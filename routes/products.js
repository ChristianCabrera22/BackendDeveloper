const express = require("express")
const {Router} = express
const router = Router()
const { uuid } = require('uuidv4');
const ProductManager = require('../ProductManager')

router.use(express.json())

//all products
router.get('/', (req, res)=>{ // localhost:8080/api/products
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


router.get('/:id', (req, res)=>{  // localhost:8080/api/products/id (code)
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

router.delete("/deleteProduct/:id", (req, res)=> { // localhost:8080/api/products/deleteProduct/id (code)
    let id = req.params.id
    let ProductMet = new ProductManager()
    ProductMet.deleteProduct(id)
    res.send({data:id, message:"Products remove"})
})

router.post('/createProduct', (req, res)=> { //localhost:8080/api/products/createProduct
    // body
    let id = uuid() //le agrega un ID automatico
    let pr = req.body
    let ProductMet = new ProductManager()
    pr.id = id
    ProductMet.addProduct(pr)
    res.send({data:pr, message:'Products save'})
})


router.put("/updateProduct/:id", (req, res)=> { // localhost:8080/api/products/updateProduct/id (code)
    let id = req.params.id
    let updates = req.body
    let ProductMet = new ProductManager()
    const resp = ProductMet.getProducts()
    resp.then(pr => {
        let products = JSON.parse(pr,null,2)
        let idFound = products.find((elem)=> {
            return elem.id == id
        })
        if (idFound) {
            ProductMet.updateProduct(id,updates)
            res.send({data:idFound, message:"Product update"})


        } else {
            res.send({message:"Product no found"})
        }

    }).catch(err => {
        console.log(err)
    })
})

module.exports = router