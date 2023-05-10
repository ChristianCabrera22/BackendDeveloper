const fs = require('fs')

let date = new Date()

fs.writeFile('./hora.txt',`la fecha es ${new Date()}`,'utf-8', (err) => err? console.log('Error al crear'):console.log('archivo creado'))
fs.readFile('./hora.txt','utf-8',(err,data)=> err? console.log("no se encontro archivo"):console.log(data))