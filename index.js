const express = require("express")
const app = express()
const routesProducts = require("./routes/products")
const routesCart = require("./routes/cart")

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use("/static", express.static(__dirname+"/public"))
app.use("/api/products", routesProducts)
app.use("/api/cart", routesCart)

app.get('/', (req,res) => {
    res.send("Bienvenido al servidor")
})
app.listen(8080, ()=> {
    console.log("Servidor en puerto 8080",)
    console.log("Go to: localhost:8080")
})