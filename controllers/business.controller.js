'use strict'

var Business = require('../models/business.model');

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

                business.name = params.name;

                business.save((err, businessSaved)=>{
                    if(err){
                        return res.status(500).send({message: 'Error general al guardar la empresa'})
                    }else if(businessSaved){
                        return res.send({message: 'La empresa ha sido creada exitosamentee', businessSaved})
                    }else {
                        return res.status(403).send({message: 'La empresa no ha sido creada'}) 
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
            console.log(leagues)
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
    let userId = req.params.idU;
    let businessId = req.params.idB;
    let update = req.body;

    if(update.name){
        User.findOne({_id: userId, business: businessId}, (err, userBusiness)=>{
            if(err){
                return res.status(500).send({message: 'Error general al actualizar'});
            }else if(userBusiness){
                Business.findByIdAndUpdate(businessId, update, {new: true}, (err, updateBusiness)=>{
                    if(err){
                        return res.status(500).send({message: 'Error general al actualizar la empresa'});
                    }else if(updateBusiness){
                    User.findOne({_id: userId, business: leagueId}, (err, userBusinessAct)=>{
                        if(err){
                            return res.status(500).send({message: 'Error general al actualizar la empresa 2'});
                        }else if(userBusinessAct){
                            return res.send({message: 'Empresa actualizada exitosamente', userBusinessAct});
                        }
                    })
                    }else{
                        return res.status(401).send({message: 'No se pudo actualizar la empresa'});
                    }
                })
            }else{
                return res.status(404).send({message: 'La empresa no existe o ya ha sido actualizada'});
            }
        }).populate('products')
    }else{
        return res.status(404).send({message: 'Por favor ingresa los datos mínimos para poder actualizar la empresa'});
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
            }).populate('leagues')
   
}

function registerBusiness (req, res){
    var business = new Business();
    var params = req.body;

    if(params.name && params.email && params.address && params.phone){
        Business.findOne({name: params.name}, (err, businessFind)=>{
            if(err){
                return res.status(404).send({message: 'Ocurrio un error en la busqueda'})
            }else if(businessFind){
                return res.send({message: "Este nombre ya esta registrado"})
            }else{
                business.name = params.name;
                business.email = params.email;
                business.description = params.description;
                business.address = params.address;
                business.phone = params.phone;
                business.save((err, businessSave)=>{
                    if(err){
                        return res.status(404).send({message: "Error general"})
                    }else if(businessSave){
                        return res.send({message: "Empresa registrada correctamente: ", businessSave})
                    }else{
                        return res.status(403).send({message: "Error al registrarse"})
                    }
                })
            }
        })
    }else{
        return res.status(404).send({message: "Ingrese los datos minimos: Nombre, correo, dirección y número"})
    }
}


module.exports = {
    saveBusiness,
    getBusiness,
    getInterprises,
    searchBusiness,
    updateBusiness,
    removeBusiness,
    registerBusiness 
}