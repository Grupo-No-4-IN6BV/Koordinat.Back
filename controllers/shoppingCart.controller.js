'use strict'

var Product = require('../models/product.model');
var User = require('../models/user.model');
var Cart = require('../models/shoppingCart.model');

/*function agregarItem(req, res){
    var userId = req.params.idU;
    var productId = req.params.idP;
    var params = req.body;
    var carts = new Cart();

    Product.findById(productId).exec((err, productFind)=>{
        if(err){
            return res.status(401).send({message: "Existió un error"})
        }else if(productFind){
            if(productFind.stock == 0){
                return res.status(404).send({message: "No hay productos en existencia"})
            }else if(productFind.stock < params.cantidad){
                return res.status(404).send({message: "No hay suficientes productos, seleccione menos"})
            }else{
                Cart.findOneAndUpdate({usuario: userId}, {$push: 
                    {productos: {productoId: productId, stock: params.cantidad, subtotal: productFind.price * params.cantidad}}},
                    {new: true}, (err, cartFind)=>{
                        if(err){
                            return res.status(401).send({message: "Existió un error con el producto"})
                        }else if(cartFind){
                            let semitotal = productFind.price * params.cantidad;
                            return res.status(401).send({message: "carru", cart})
                        }else{
                            return res.status(401).send({message: "Existió un error carrito"})
                        }})
            }
        }else{
            return res.status(404).send({message: "No se encontro este producto"})
        }
                  
    })
}

function saveCart (req, res){
    var userId = req.params.idU;
    var productId = req.params.idP;
    var cart = new Cart();
    var params = req.body;

    User.findById(userId, (err, userFind)=>{
        if(err){
            return res.status(500).send({message: 'Error general en la busqueda de usuario'});
        }else if(userFind){
            Product.findById(productId, (err, productFind)=>{
                if(err){
                    return res.status(500).send({message: 'Error general en la busqueda del producto'});
                }else if(productFind){
                    if(productFind.stock == 0){
                        return res.status(404).send({message: "Ya no hay productos en existencia"})
                    }else if(productFind.stock < params.cantidad){
                        return res.status(404).send({message: "No hay suficientes productos, seleccione menos"})
                    }else{
                        User.findByIdAndUpdate(userId, {$push: {cartShopping: {idProducto: productId, producto: productFind.name, cantidad: params.cantidad}}}, {new:true}, (err, userPush)=>{
                            if(err){
                                return res.status(500).send({message: 'Error general con el push'});
                            }else if(userPush){
                                return res.send({message: 'Se actualizo el user con el carrito', userPush});
                            }else{
                                return res.status(404).send({message: 'Error general, creo'});
                            }
                        })
                    }
                }else{
                    return res.status(404).send({message: 'Este producto no existe'});
                }
            })
        }else{
            return res.status(404).send({message: 'Este usuario no existe'});
        }
    })
}*/

/*function item (req, res){
    var carrito = new Cart();
    var params = req.body;
    var userId = req.params.idU;

    User.findById(userId, (err, userFind)=>{
        if(err){    
            res.status(500).send({message: 'Error general'});
        }else if (userFind){
            Product.find({name: params.nameP}, (err, productFind)=>{
                if(err){
                    return res.status(500).send({message: 'Error general2'});
                }else if(productFind){
                    carrito.idProducto = productFind._id;
                    carrito.nombre = productFind.name;
                    carrito.cantidad = params.cantidad;
                            User.findByIdAndUpdate(userId, {$push:{cartShopping: carrito}}, {new: true}, (err, userPush)=>{
                                if(err){
                                    return res.status(500).send({message: 'Error general4'});
                                }else if(userPush){
                                    return res.send({message: 'se agrego', userPush});
                                }else{
                                    return res.status(500).send({message: 'no hubo push'});
                                }
                            }).populate('cart')
                }else{  
                    return res.status(404).send({message: 'No se encontro el producto'});
                }
            })
        }else{
            res.status(404).send({message: 'No se encontro el user'});
        }
    })
}*/

/*function add2 (req, res){
    var userId = req.params.idU;
    var productoId = req.params.idP;
    var params = req.body;

    User.findById(userId, (err, userFind)=>{
        if(err){
            return res.status(500).send({message: 'Error general en la busqueda de usuario'});
        }else if(userFind){
            Product.findById(productoId, (err, productFind)=>{
                if(err){
                    return res.status(500).send({message: 'Error general en la busqueda del producto'});
                }else if(productFind){
                    User.findByIdAndUpdate(userId, {$push: {cartShopping: {idProducto: productFind._id, producto: productFind.name, cantidad: params.cantidad}}}, {new:true}, (err, cartSave)=>{
                        if(err){
                            return res.status(500).send({message: 'Error general con el push'});
                        }else if(cartSave){
                            return res.send({message: 'Se actualizo el carrito', cartSave});
                        }else{
                            return res.status(404).send({message: 'Error general'});
                        }
                    }).populate('product')
                }else{
                    return res.status(500).send({message: 'Maybe no hay product'});
                }
            })
        }else{
            return res.status(404).send({message: 'Maybe no existe user'});
        }
    })
}*/

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