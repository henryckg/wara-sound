import { cartsService } from "../repositories/index.js";
import { productsService } from "../repositories/index.js";

export const getCartById = async (req, res) => {
    const { cid } = req.params;
    const cart = await cartsService.getCart(cid)
    if(!cart){
        return res.status(404).json({message: 'Cart not found'})
    }
    res.send(cart)
}

export const createCart = async (req, res) => {
    const newCart = await cartsService.createCart()
    if(!newCart){
        return res.status(400).send({message: 'Could not create cart'})
    }
    res.status(201).send({message: 'Cart created', payload: newCart})
}

export const addProductToCart = async (req, res) => {
    const {cid, pid} = req.params;
    const product = await productsService.getProductById(pid)
    if(!product){
        return res.status(404).json({message: 'Product not found'})
    }
    const productAdded = await cartsService.addProduct(cid, pid)
    if(!productAdded){
        return res.status(404).json({message: 'Cart not found'})
    }
    res.send({message: 'Product added to cart'})
}

export const deleteProductInCart = async (req, res) => {
    const {cid, pid} = req.params;
    const result = await cartsService.deleteProductInCart(cid, pid)
    if(!result){
        return res.status(400).send({message: 'Could not delete product'})
    }
    res.send({message: 'Product deleted'})
}

export const updateCart = async (req, res) => {
    const { cid } = req.params;
    const updatedCart = req.body;
    const cart = await cartsService.updateCart(cid, updatedCart)
    if(cart.modifiedCount > 0){
        res.send({message: 'Cart updated'})
    } else {
        res.status(400).send({message: 'Could not update cart'})
    }
}

export const updateProductInCart = async (req, res) => {
    const { cid, pid } = req.params;
    const newQty = req.body.quantity
    if(!newQty){
        return res.status(400).send({message: 'Quantity is needed'})
    }
    const result = await cartsService.updateProductInCart(cid, pid, newQty)
    if(!result){
        return res.status(400).send({message: 'Could not update product'})
    }
    res.send({message: 'Product updated'})
}

export const emptyCart = async (req, res) => {
    const { cid } = req.params;
    const result = await cartsService.deleteContentInCart(cid)
    if(!result){
        return res.status(404).send({message: 'Could not delete products'})
    }
    res.send({message: 'Products deleted'})
}