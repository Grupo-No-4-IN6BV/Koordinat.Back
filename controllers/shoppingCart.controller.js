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
                        Cart.find({idUsuario: userFind._id, idProducto: productFind._id }, (err, find)=>{
                            if(err){
                                return res.status(500).send({message: 'Error general', err});
                           }else if(find){
                               console.log(find)
                                if(find == ''){
                                    console.log('No esta este producto en tu carrito')
                                    carrito.idUsuario = userFind.id;
                                    carrito.idProducto = productFind.id;
                                    carrito.producto = productFind.name;
                                    carrito.cantidad = params.cantidad;
                                    carrito.subtotal = params.cantidad * productFind.price;
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
                                }else{
                                    console.log(find.producto)
                                    console.log('Ya existe este producto en tu carrito')
                                    let update = find['producto']
                                    console.log(update)
                                    Cart.findByIdAndUpdate(find._id, update, {new: true}, (err, cartUpdate)=>{
                                        if(err){
                                            return res.status(500).send({message: 'Error general al actualizar'});
                                        }else if(cartUpdate){
                                            User.findOne({_id: userId}, (err, userAct)=>{
                                                if(err){
                                                    return res.status(500).send({message: 'Error general'});
                                                }else if(userAct){
                                                    return res.send({message: 'Se actualizo el carrito', userAct});
                                                }else{
                                                    return res.status(404).send({message: 'No se encontro el usuario'});
                                                }
                                            })
                                        }else{
                                            return res.status(404).send({message: 'No se encontro el carrito'});
                                        }
                                    })
                                }
                           }else{
                                return res.status(404).send({message: 'No se encontro'});
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

function updateCantidad (req, res){
    var userId = req.params.idU;
    var cartId = req.params.idC;
    var update = req.body;

    if(update.producto || update.idProducto || update.subtotal){
        return res.status(500).send({message: 'Sólo puedes actualizar la cantidad'});
    }else{
        if(update.cantidad <= 1){
            return res.status(500).send({message: 'Ponga una cantidad mayor a 1'});
        }else{
            User.findOne({_id: userId, cartShopping: cartId}, (err, userCart)=>{
                if(err){
                    return res.status(500).send({message: 'Error general'});
                }else if(userCart){
                    Cart.findByIdAndUpdate(cartId, update, {new: true}, (err, cartUpdate)=>{
                        if(err){
                            return res.status(500).send({message: 'Error general al actualizar'});
                        }else if(cartUpdate){
                            User.findOne({_id: userId, cartShopping: cartId}, (err, userAct)=>{
                                if(err){
                                    return res.status(500).send({message: 'Error general'});
                                }else if(userAct){
                                    return res.send({message: 'Se actualizo el carrito', userAct});
                                }else{
                                    return res.status(404).send({message: 'No se encontro el usuario'});
                                }
                            }).populate('cartShopping')
                        }else{
                            return res.status(404).send({message: 'No se encontro el carrito'});
                        }
                    })
                }else{
                    return res.status(404).send({message: 'No se encontro el usuario o el carro'});
                }
            })
        }
    }
}
module.exports = {
    shopping,
    removeItem,
    updateCantidad
}