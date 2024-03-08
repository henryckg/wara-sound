import Products from "../dao/mongo/products.mongo.js";
import Carts from "../dao/mongo/carts.mongo.js";
import ProductRepository from "./products.repository.js";
import CartRepository from "./carts.repository.js";

export const productsService = new ProductRepository(new Products())
export const cartsService = new CartRepository(new Carts())