const express = require("express")
const app = express()
const routesProducts = require("./routes/products")
const routesCart = require("./routes/cart")
const realtimeproducts = require("./routes/realtimeproducts")
const handlebars = require('express-handlebars')
const ProductManager = require('./ProductManager')
const PORT=8080
const http = require('http');
const server = http.createServer(app);
let ProductMet = new ProductManager()



//Socket
const { Server } = require("socket.io");
const io = new Server(server);

//Public
app.use(express.static(__dirname+'/public'))

//Views
app.engine('handlebars',handlebars.engine())
app.set('view engine','handlebars')
app.set('views',__dirname+'/views')

let message = [
    { autor: 'asdasd', text: 'aadsdsd' },
    { autor: 'as3123asd', text: 'a46d' },
    { autor: '3456d', text: 'aswe23' }
]

//Init Socket in server
io.on('connection', (socket) => {
    console.log('a user connected');
    // se hace la peticion de los productos y se envia por Socket.emit
    ProductMet.getProducts()
    .then(pr => socket.emit('products', JSON.parse(pr)))
    .catch(console.log);
})

//Routes
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use("/static", express.static(__dirname+"/public"))
app.use("/api/products", routesProducts)
app.use("/api/cart", routesCart)
app.use('/realtimeproducts', realtimeproducts)

app.get('/', (req,res) => {
    res.send("Bienvenido al servidor creado para el curso Backend de Coderhouse")
})
server.listen(PORT, ()=> {
    console.log("Servidor en puerto 8080",)
    console.log("Go to: localhost:8080")
})