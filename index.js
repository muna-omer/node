const express = require('express');
const app= express();
const mongoose = require('mongoose');
const Product =require('./models/productModel');

app.use(express.json());
app.use(express.urlencoded({extended: false}));


app.get('/', (req,res) => {
    res.send('Hello Mrs');
})


app.get('/products', async(req,res) => {
    try {
        const products = await Product.find({})
        res.status(200).json(products)
    } catch (error) {
        console.log(error.message)
    }
})

app.get('/products/:id', async(req,res) => {
    try {
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);

    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.post('/product', async (req,res) => {
    try {
    const product = await  Product.create(req.body)
    res.status(200).json(product)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})


app.put('/products/:id', async(req,res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        if(!product){
            return res.status(404).json({message: `cannot find any product with Id ${id}`})
        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({message: error.message}) 
    }
})


app.delete('/products/:id', async(req,res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        if(!product){
            return res.status(404).json({message: `cannot find any product with Id ${id}`})
        } 
        res.status(200).json(product); 
    }catch (error) {
            res.status(500).json({message: error.message}) 
        }
})

app.listen(1000, ()=> {
    console.log('app is listening on port 1000')

});



mongoose.
connect('mongodb+srv://muna:12345@cluster0.au5qw8q.mongodb.net/node-api?retryWrites=true&w=majority&appName=Cluster0')
.then(() => {
    console.log('connected to mongodb');
})
.catch((error) => {
    console.log(error)
})

//mongoose.connect(mongodb)

// mongoose.connect('mongodb://localhost/playground')
// .then( () => 
//     console.log('connected to MongoDB')
// )
// .catch((error) => 
//     console.log(error)
// )