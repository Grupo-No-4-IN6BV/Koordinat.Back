'use strict'

var User = require('../models/user.model');
var Product = require('../models/product.model');


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
                    User.find({_id: userId, wishList: productFind._id}, (err, find)=>{
                        if(err){
                             return res.status(500).send({message: 'Error general', err});
                        }else if(find){
                             if(find == ''){
                                 console.log('No esta este producto en tu wish')
                                 User.findByIdAndUpdate(userId, {$push: {wishList: productFind._id}}, {new: true}, (err, userFind2)=>{
                                     if(err){
                                         return res.status(500).send({message: 'Error general con el push'});
                                     }else if(userFind2){
                                         return res.send({message: 'Se actualizo el user con la wish', userFind2});
                                     }else{
                                         return res.status(404).send({message: 'Error general 5, creo'});
                                     }
                                 }).populate('wishList')
                             }else{
                                console.log('Ya existe este producto en tu wish')
                                return res.status(500).send({message: 'Ya existe este producto en tu wish'});
                             }
                        }else{
                             return res.status(404).send({message: 'No se encontro'});
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
}

function removeWish (req, res){
    var userId = req.params.idU;
    var productId = req.params.idP;

    User.findByIdAndUpdate({_id: userId, wishList: productId}, {$pull: {wishList: productId}}, {new: true}, (err, wishPull)=>{
        if(err){
            return res.status(500).send({message: 'Error general en el pull'});
        }else if(wishPull){
            return res.send({message: 'Creo q se borro el producto', wishPull});
        }else{  
            return res.status(404).send({message: 'No se encontro el produc en la wish en el user'});
        }
    }).populate('wishList')
}

module.exports = {
   /* addWish,*/
    wishSet,
    removeWish
}