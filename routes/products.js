const express = require("express")
const {Router} = express
const router = Router()
const uuid4 = require("uuid")

let products = []

router.use(express.json())

router.get("/productos", (req, res)=>{
    res.send({data:products, message:"Products send"})
})

router.post('/createProduct', (req, res)=> {
    // body
    let id = uuid4()
    let pr = req.body
    pr.id = id
    products.push(pr)
    res.send({data:pr, message:'Products save'})
})

router.delete("/deleteProduct/:id", (req, res)=> {
    console.log(req.params)
    let id = req.params.id
    const arrayNew = products.filter(()=> {
        return Element.id !== id
    })
    console.log(arrayNew)
    products = arrayNew
    res.send({data:products, message:"Products remove"})
})

router.put("/updateProduct/:id", (req, res)=> {
    let id = req.params.id
    let infoNew = req.body

    let arrayUpdated = products.map((ele)=>{
        if(ele.id == id){
            return {...ele, infoNew} 
        } else {
            return ele
        }
    })
    console.log(arrayUpdated)
    products = arrayUpdated
    res.send({data:products, message:"Products update ok"})
})

module.exports = router