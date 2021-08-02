'use strict'

var Business = require('../models/business.model');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('../services/jwt');
var Cart = require('../models/shoppingCart.model');
var Product = require('../models/product.model');

function saveBusiness(req, res){

    var business = new Business();
    var params = req.body;

    if(params.name){
        Business.findOne({name: params.name}, (err, businessFind)=>{
            if(err){
                return res.status(500).send({message: 'Error general al guardar la empresa'});
            }else if(businessFind){
                res.send({message: 'Esta empresa ya existe'});
            }else{
                 bcrypt.hash(params.password, null, null, (err, passwordHash) => {
                    if(err){
                        return res.status(404).send({message: "La encriptación de la contraseña falló", err})
                    }else if(passwordHash){
                        business.password = passwordHash;
                        business.name = params.name;
                        business.email = params.email;
                        business.description = params.description;
                        business.phone = params.phone;
                        business.image = params.image;

                        business.save((err, businessSaved)=>{
                            if(err){
                                return res.status(500).send({message: 'Error general al guardar la empresa'})
                            }else if(businessSaved){
                                return res.send({message: 'La empresa ha sido creada exitosamentee', businessSaved})
                            }else {
                                return res.status(403).send({message: 'La empresa no ha sido creada'}) 
                            }
                        })
                    }else{
                        return res.status(401).send({message: "la contraseña no encriptada"})
                    }
                })
            }
        })
    }else {
        return res.status(404).send({message: 'Por favor llenar todos los campos requeridos'});
    }
}


function getBusiness(req, res){
    let businessId = req.params.idB; 

    Business.findOne({_id: businessId}, (err, businessFind)=>{
        if(err){
            return res.status(500).send({message: "Ocurrio un error al realizar la busqueda de la empresa"})
        }else if(businessFind){
            return res.send({message: "La empresa ha sido encontrada exitosamente", businessFind})
        }else{
            return res.status(204).send({message: "No se ha encontrado ninguna empresa"})
        }
    }).populate('products')
}


function getInterprises(req, res){
    Business.find({}).exec((err, interprises) => {
        if(err){
            return res.status(500).send({message: "Error al buscar las empresas"})
        }else if(interprises){
            return res.send({message: "Las empresas han sido encontradas", interprises})
        }else{
            return res.status(204).send({message: "No se encontraron las empresas"})
        }
    })
}


function searchBusiness(req, res){
    var params = req.body;

        if(params.search){
            Business.find({$or:[{name: params.search}]}, (err, resultsSearch)=>{
            if(err){
                return res.status(500).send({message: 'Error General al buscar'});
            }else if(resultsSearch){
                return res.send({resultsSearch})
            }else{
                return res.status(404).send({message: 'No hay registros de empresas por mostrar'});
            }
        })
    }else{
        return res.status(403).send({message: 'Ingresar nombre para buscar alguna empresa'})
    }
}


function updateBusiness(req, res){
    let businessId = req.params.idB;
    let update = req.body;
    
    Business.findByIdAndUpdate(businessId, update, {new: true}, (err, updateBusiness)=>{
        if(err){
            return res.status(500).send({message: 'Error general al actualizar la empresa'});
        }else if(updateBusiness){
            return res.send({message: 'Empresa actualizada exitosamente', updateBusiness});
        }else{
            return res.status(401).send({message: 'No se pudo actualizar la empresa'});
        }
    })
   
}


function removeBuss(req, res){
    let userId = req.params.id;
    let params = req.body;
        if(!params.password){
            return res.status(401).send({message: 'Por favor ingresa la contraseña para poder eliminar tu cuenta'});
        }else{
            Business.findById(userId, (err, businessFind)=>{
                if(err){
                    return res.status(500).send({message: 'Error general'})
                }else if(businessFind){
                    bcrypt.compare(params.password, businessFind.password, (err, checkPassword)=>{
                        if(err){
                            return res.send({message: 'Error general al verificar contraseña'})
                        }else if(checkPassword){
                            Business.findByIdAndRemove(userId, (err, businessElimined)=>{
                                if(err){
                                    return res.status(500).send({message: 'Error al verificar contraseña'})
                                }else if(businessElimined){
                                    Product.deleteMany({business: userId}, (err, eliminedProd)=>{
                                        if(err){
                                            return res.status(500).send({message: 'Error general'})
                                        }else if(eliminedProd){
                                            return  res.send({message: 'El Usuario se elimino correctamente', businessElimined});
                                        }else{
                                            return res.send({message: 'no se eliminaron los productos'})
                                        }
                                    })
                                    
                                }else{
                                    return res.send({message: 'Usuario no encontrado o ya eliminado'})
                                }
                            })
                        }else{
                            return res.status(403).send({message: 'Contraseña incorrecta'})
                        }
                    })
                }else{
                    return res.send({message: 'Usuario inexistente o ya eliminado'})
                }
            })
        }
}


function removeBusiness(req, res){
    let userId = req.params.idU;
    let businessId = req.params.idB;

        User.findOneAndUpdate({_id: userId, business: businessId},
            {$pull: {business: businessId}}, {new:true}, (err, businessPull)=>{
                if(err){
                    return res.status(500).send({message: 'Error general'})
                }else if(businessPull){
                    Business.findByIdAndRemove(businessId, (err, businessRemoved)=>{
                        if(err){
                            return res.status(500).send({message: 'Error general durante la eliminación', err})
                        }else if(businessRemoved){
                            return res.send({message: 'Empresa eliminada de manera exitosa', businessPull});
                        }else{
                            return res.status(404).send({message: 'Empresa no encontrada o ya eliminada'})
                        }
                    })
                }else{
                    return res.status(404).send({message: 'No se puede eliminar por falta de datos'})
                }
            })
   
}

function registerBusiness (req, res){
    var business = new Business();
    var params = req.body;

    if(params.name){
        Business.findOne({name: params.name}, (err, businessFind)=>{
            if(err){
                return res.status(500).send({message: 'Error general al guardar la empresa'});
            }else if(businessFind){
                res.send({message: 'Esta empresa ya existe'});
            }else{
                 bcrypt.hash(params.password, null, null, (err, passwordHash) => {
                    if(err){
                        return res.status(404).send({message: "La encriptación de la contraseña falló", err})
                    }else if(passwordHash){
                        business.password = passwordHash;
                        business.name = params.name;
                        business.email = params.email;
                        business.description = params.description;
                        business.phone = params.phone;
                        business.image = params.image;
                        business.lat = params.lat;
                        business.lng = params.lng;
                        business.role = 'ROLE_BUSINESS';

                        business.save((err, businessSaved)=>{
                            if(err){
                                return res.status(500).send({message: 'Error general al guardar la empresa'})
                            }else if(businessSaved){
                                return res.send({message: 'La empresa ha sido creada exitosamentee', businessSaved})
                            }else {
                                return res.status(403).send({message: 'La empresa no ha sido creada'}) 
                            }
                        })
                    }else{
                        return res.status(401).send({message: "la contraseña no encriptada"})
                    }
                })
            }
        })
    }else {
        return res.status(404).send({message: 'Por favor llenar todos los campos requeridos'});
    }
}

function getNotification(req, res){
    let businessId = req.params.idB;
    
    Cart.countDocuments({idBusinnes: businessId, }).exec((err, numberNot)=>{
        if(err){
            return res.status(500).send({message: 'Error general'})
        }else if(numberNot){
           return res.send({meesage: 'noticaciones', numberNot})
        }else{
            return res.status(404).send({message: 'Error general'})
        }
    })
}


module.exports = {
    saveBusiness,
    getBusiness,
    getInterprises,
    searchBusiness,
    updateBusiness,
    removeBusiness,
    registerBusiness,
    getNotification,
    removeBuss
}