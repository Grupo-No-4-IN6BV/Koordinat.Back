'use strict'

var Wish = require('../models/wishList.model');
var User = require('../models/user.model');
var Product = require('../models/product.model');

/*function addWish (req, res){  //NO LE HAGAN CASO, ME BUGIE CUANDO LO HICE
    var userId = req.params.idU;
    var productId = req.params.idP;
    var params = req.body;
    var wishl = new Wish();

    User.findById(userId, (err, userFind)=>{
        if(err){
            return res.status(500).send({message: 'Error general en la busqueda de usuario'});
        }else if(userFind){
            Product.findById(productId, (err, productFind)=>{
                if(err){
                    return res.status(500).send({message: 'Error general en la busqueda del producto'});
                }else if(productFind){
                    wishl.producto = productFind;
                    wishl.save((err, wishSave)=>{
                        if(err){
                            return res.status(500).send({message: 'Error general al salvar'});
                        }else if(wishSave){
                            console.log(wishSave)
                            User.findByIdAndUpdate(userId, {$push: {wishList: wishSave._id}}, {new: true}, (err, userFind2)=>{
                                if(err){
                                    return res.status(500).send({message: 'Error general con el push'});
                                }else if(userFind2){
                                    return res.send({message: 'Se actualizo el user con la wish', userFind});
                                }else{
                                    return res.status(404).send({message: 'Error general 5, creo'});
                                }
                            }).populate([
                                {
                                  path: "wishList",
                                  model: "wish",
                                  populate:{
                                    path: 'productos',
                                    model: 'product'
                                  }
                                },
                              ])
                        }else{
                            return res.status(500).send({message: 'idk'});
                        }
                    })
                }else{
                    return res.status(500).send({message: 'Maybe no hay product'});
                }
            })
        }else{
            return res.status(404).send({message: 'Maybe no existe user'});
        }
    })
} */

function wishSet (req, res){
    var userId = req.params.idU;
    var productId = req.params.idP;

    User.findById(userId, (err, userFind)=>{
        if(err){
            return res.status(500).send({message: 'Error general en la busqueda de usuario'});
        }else if(userFind){
            Product.findById(productId, (err, productFind)=>{
                if(err){
                    return res.status(500).send({message: 'Error general en la busqueda del producto'});
                }else if(productFind){
                    User.findByIdAndUpdate(userId, {$push: {wishList: productFind._id}}, {new: true}, (err, userFind2)=>{
                        if(err){
                            return res.status(500).send({message: 'Error general con el push'});
                        }else if(userFind2){
                            return res.send({message: 'Se actualizo el user con la wish', userFind2});
                        }else{
                            return res.status(404).send({message: 'Error general 5, creo'});
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
}

function removeWish (req, res){
    var userId = req.params.idU;
    var productId = req.params.idP;

    User.findByIdAndUpdate({_id: userId, wishList: productId}, {$pull: {wishList: productId}}, {new: true}, (err, wishPull)=>{
        if(err){
            return res.status(500).send({message: 'Error general en el pull'});
        }else if(wishPull){
            return res.status(500).send({message: 'Creo q se borro el producto', wishPull});
        }else{  
            return res.status(404).send({message: 'No se encontro el produc en la wish en el user'});
        }
    }).populate('product')
}

module.exports = {
   /* addWish,*/
    wishSet,
    removeWish
}