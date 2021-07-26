'use strict'

var Invoice = require('../models/invoice.model');
var Cart = require('../models/shoppingCart.model');
var User = require('../models/user.model');

function CheckIn (req, res){
    var userId = req.params.idU;
    var cartId = req.params.idC;
    var invoice = new Invoice();
    var today = new Date();

    User.findById(userId, (err, userFind)=>{
        if(err){
            res.status(500).send({message: 'Error general'});
        }else if(userFind){
            Cart.findById(cartId, (err, cartFind)=>{
                if(err){
                    res.status(500).send({message: 'Error general2'});
                }else if(cartFind){
                    invoice.nameUser = userFind.name + ', ' + userFind.lastname;
                    var fecha = today.getDate() + '-' + (today.getMonth()+1) + '-' + today.getFullYear();
                    var hora = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
                    var FechayHora = fecha + ' at ' + hora;
                    invoice.date = FechayHora;
                    invoice.details = cartFind.slice();

                    invoice.save((err, invoiceSave)=>{
                        if(err){
                            return res.status(500).send({message: 'Error general al guardar', err});
                        }else if(invoiceSave){
                            User.findByIdAndUpdate(userId, {$push:{invoices: invoiceSave._id}}, {new: true}, (err, userPush)=>{
                                if(err){
                                    return res.status(500).send({message: 'Error general'});
                                }else if(userPush){
                                    Cart.findByIdAndRemove(cartId, (err, cartRemoved)=>{
                                        if(err){
                                            return res.status(500).send({message: 'Error en el servidor'});
                                        }else if(cartRemoved){
                                            return res.send({message: 'Factura almacenada', cartRemoved, userPush});
                                        }else{
                                            return res.status(404).send({message: 'No hay registro o ya se limpio el carrito de compras'});
                                        }
                                    })
                                }else{
                                    return res.status(404).send({message: 'No se pusheo el carro'});
                                }
                            }).populate('invoices')
                        }else{
                            return res.status(404).send({message: 'Error al almacenar factura'});
                        }
                    }).populate('details')
                }else{
                    res.status(404).send({message: 'No hay registro del carrito de compras'});
                }
            })
        }else{
            res.status(404).send({message: 'No hay registro del usuario'});
        }
    })
}

function getInvoice(req, res){
    let invoiceId = req.params.id;

    Invoice.findById(invoiceId).exec((err, invoiceFind)=>{
        if(err){
            return res.status(500).send({message: 'Error en el servidor'});
        }else if(invoiceFind){
            return res.status(200).send({message: 'Producto encontrado', invoiceFind}.populate('invoice'))
        }else{
            return res.status(404).send({message: 'No hay registro de producto'})
        }
    }).populate('details')
}

function getInvoices(req, res){
    let userId = req.params.idU;

    if(userId != req.user.sub){
        return res.status(500).send({message: 'No tienes permiso para realizar esta acción'});
    }else{
        User.findById(userId, (err, invoicesFind)=>{
            if(err){
                res.status(500).send({message: 'Error general'});
            }else if(invoicesFind){
                res.status(200).send({message: 'Facturas:', invoicesFind});
            }else{
                res.status(418).send({message: 'Error al buscar usuario o facturas'});
            }
        }).populate('invoices')
    }
}

module.exports = {
    CheckIn,
    getInvoice,
    getInvoices
}