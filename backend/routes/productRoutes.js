const express=require('express')
const route=express.Router();
const {createProduct,getProducts,getProduct,updateProduct,deleteProduct}=require('../controllers/productController')

route.get('/products',getProducts)
route.get('/products/:id',getProduct)
route.post('/products',createProduct)
route.put('/products/:id',updateProduct)
route.delete('/products/:id',deleteProduct)

module.exports=route;