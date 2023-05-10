const express = require('express')

const app = express()
const handlebars = require('express-handlebars')

app.engine('handlebars',handlebars.engine()) //agarrate la cabeza
app.set('views',__dirname+'/views') //seteamos la carpeta de vista
app.set('view engine','handlebars') //seteamos el motor que vamos a usar

app.use('/users', routerUser)
app.use(express.static(__dirname+'/public'))

let users = [
    {
        name: "Chistian",
        apellido: "Cabrera",
        edad: "33",
        mail: "asdds@asd.com",
        telefono: "12345678"
    },
    {
        name: "Mateo",
        apellido: "Cabrera",
        edad: "5",
        mail: "asdds@asd.com",
        telefono: "12345678"
    },
    {
        name: "Abril",
        apellido: "Cabrera",
        edad: "7",
        mail: "asdds@asd.com",
        telefono: "12345678"
    }
]
app.get('/',(req,res)=>{

    res.render('index',users[Math.floor(Math.random() * users.length)])

})

app.get('/testHand',(req,res)=>{
let user = {
    name: "Christian",
    lastname: "Cabrera",
    role:"user"
}

    res.render('users',{
        user:user,
        IsAdmin: user.role === "admin"
    })

})

app.listen(8080, ()=>{
    console.log("servidor ok")
})