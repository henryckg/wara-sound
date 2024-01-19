import { Router } from "express";
import { productModel } from "../dao/models/products.model.js";
import { cartModel } from "../dao/models/carts.model.js";

const viewRouter = Router()

viewRouter.get('/', async (req, res) => {
    try {
        const products = await productModel.find().lean()
        res.render('home', {products, title: 'WaraSound'})
    } catch (error) {
        res.render('error', {error: 400, message: "400 Bad Request"})
    }
})

viewRouter.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts', {title: 'WaraSound | Real-Time Products'})
})

viewRouter.get('/chat', (req, res) => {
    res.render('chat')
})

viewRouter.get('/products', async (req, res) => {
    const {page = 1, limit = 10, sort = '', query = ''} = req.query
    const [code, value] = query.split(':')
    const data = await productModel.paginate({[code]:value}, {
        limit,
        page,
        sort: sort ? {price : sort} : {}
    })
    
    if(page <= data.totalPages && page > 0){
        data.validPage = true
    }
    res.render('products', data)
})

viewRouter.get('/carts/:cid', async (req, res) => {
    const {cid} = req.params
    const cart = await cartModel.findOne({_id: cid}).populate('products.product')
    res.render('cart', cart)
})

export default viewRouter