import mongoose from 'mongoose';

const URI = 'localhost:27017';

(async () => {
    try {
        await mongoose.connect(URI);
        console.log('Conectado a la base de datos correctamente.');
    } catch (error) {
        console.log('Error de conexión a la base de datos.');
        console.log(error)
    }
})();