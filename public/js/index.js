let socket = io()
// socket.on('messages', (data)=>{
//     render(data)
// })

socket.on('products', (data)=>{
    renderListProducts(data)
})

function renderListProducts(products){
    const html=products.map(elem => {
        return (`
        <li class="list-group-item">
            <strong>${elem.title}</strong>
            <spawn>Descripcion: ${elem.description}</spawn>
            <br>
            <em>ID: ${elem.id}</em>
        </li>`)
    }).join(' ')
    document.getElementById('container-products').innerHTML = html
}



// function addMessage(e) {
//     const mensaje= {
//         autor: document.getElementById('username').value,
//         text: document.getElementById('texto').value
//     }
//     console.log(mensaje)
//     socket.emit('new-mesagge',mensaje)
//     return false
// }





// function render(data) {
//     const html=data.map(elem => {
//         return (`
//             <div>
//                 <strong> ${elem.autor}</strong>
//                 <em>${elem.text}</em>
//             </div>
//         `)
//     }).join(' ')
//     document.getElementById('container-products').innerHTML = html

// }