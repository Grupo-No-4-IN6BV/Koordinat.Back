'use strict'

var Product = require('../models/product.model');
var User = require('../models/user.model');
var Cart = require('../models/shoppingCart.model');

function shopping (req, res){
    var params = req.body;
    var userId = req.params.id;
    var carrito = new Cart();

    User.findById(userId, (err, userFind)=>{
        if(err){
            res.status(500).send({message: 'Error general'});
        }else if(userFind){
            Product.findOne({name: params.nombreProducto}, (err, productFind)=>{
                if(err){
                    res.status(500).send({message: 'Error general2'});
                }else if(productFind){
                    if(productFind.stock == 0){
                        return res.status(404).send({message: "No hay productos en existencia"})
                    }else if(productFind.stock < params.cantidad){
                        return res.status(404).send({message: "No hay suficientes productos, seleccione menos"})
                    }else{
                       carrito.idProducto = productFind.id;
                       carrito.producto = productFind.name;
                       carrito.cantidad = params.cantidad;
                       carrito.subtotal = params.cantidad*productFind.price;
                       carrito.save((err, cartSave)=>{
                           if(err){
                                return res.status(500).send({message: 'Error general al guardar', err});
                           }else if(cartSave){
                                User.findByIdAndUpdate(userId, {$push:{cartShopping: cartSave._id}}, {new: true}, (err, userPush)=>{
                                    if(err){
                                        return res.status(500).send({message: 'Error general4'});
                                    }else if(userPush){
                                        return res.send({message: 'Se pusheo correctamente', userPush});
                                    }else{
                                        return res.status(404).send({message: 'No se pusheo el carro'});
                                    }
                                }).populate('carts')
                           }else{
                                return res.status(404).send({message: 'Error con guardar el carro'});
                           }
                       })
                    }
                }else{
                    res.status(404).send({message: 'No hay producto'});
                }
            })
        }else{
            res.status(404).send({message: 'No se encontró el usuario'});
        }
    })
}

function removeItem(req, res){
    var userId = req.params.idU;
    var itemId = req.params.idI;

    User.findByIdAndUpdate({_id: userId, cartShopping: itemId}, {$pull: {cartShopping: itemId}}, (err, itemPull)=>{
        if(err){
            return res.status(500).send({message: 'Error general con el pull', err});
        }else if(itemPull){
            Cart.findByIdAndRemove(itemId, (err, itemRemove)=>{
                if(err){
                    return res.status(500).send({message: 'Error general con el remove', err});
                }else if(itemRemove){
                    return res.send({message: 'Item eliminado', itemPull});
                }else{
                    return res.status(404).send({message: 'No se encontro el user'});
                }
            })
        }else{
            return res.status(404).send({message: 'No se encontro el item'});
        }
    }).populate('cart')
}


module.exports = {
    shopping,
    removeItem
}