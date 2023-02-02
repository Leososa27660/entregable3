import express from 'express';
import ProductManager from './ProductManager.js';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

//Creamos la instancia de la clase
const productManager = new ProductManager(path.join(dirname, 'productos.json'));

app.use(express.urlencoded({extended: true}));



app.get('/products', async (req, res) => {
    const products = await productManager.getAll();
    
    res.send(products);
})





app.get('/products/:pid', (req, res)=> {
    (async () => {
        let array = await productManager.getById(1).then((res) => res);
        if(array.length <= 0) {
            res.status(404).send("No hay productos");
        }
        else {
            res.send(array);
        }
    })();
});



app.listen(8080,()=>console.log("Listening on 8080"))