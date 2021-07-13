'user strict'

var User = require('../models/user.model');
var category =require('../models/category.model')
var bcrypt = require('bcrypt-nodejs');
var jwt = require('../services/jwt');

var fs =require('fs');
var path = require('path');


function saveUser(req, res){
    var user = new User();
    var params = req.body;

    if(params.name && params.username && params.password && params.email){
        User.findOne({username: params.username}, (err, userFind) => {
            if(err){
                return res.status(404).send({message: 'Error general al buscar usuario'})
            }else if(userFind){
                return res.send({message: "Nombre de usuario no disponible"})
            }else{
                bcrypt.hash(params.password, null, null, (err, passwordHash) => {
                    if(err){
                        return res.status(404).send({message: "La encriptación de la contraseña falló", err})
                    }else if(passwordHash){
                        user.password = passwordHash;
                        user.name = params.name;
                        user.username = params.username;
                        user.email = params.email;
                        user.role = 'ROLE_USER';
                        
                        user.save((err, userSaved) => {
                            if(err){
                                return res.status(404).send({message: "ocurrio un error al intentar guardar el usuario"})
                            }else if(userSaved){
                                return res.send({message: "Usuario creado satisfactoriamente",userSaved})
                            }else{
                                return res.status(403).send({message: "Error al intentar guardar Datos"})
                            }
                        })
                    }else{
                        return res.status(401).send({message: "la contraseña no encriptada"})
                    }
                })
            }
        })
    }else{
        return res.status(404).send({message: "Ingrese los datos minimos: Username, name, password, email."})
    }
}

function getUsers(req, res){
    User.find({}).populate('categories').exec((err, users) => {
        if(err){
            return res.status(500).send({message: "Error al buscar los usuarios"})
        }else if(users){
            console.log(users)
            return res.send({message: "Usuarios encontrados", users})
        }else{
            return res.status(204).send({message: "No se encontraron usuarios"})
        }
    })
}

function updateUser(req, res){
    let userId = req.params.id;
    let update = req.body;

    if(userId != req.user.sub){
        return res.status(401).send({ message: 'No posees permisos necesarios para realizar esta acción'});
    }else{
        if(update.password || update.role){
            return res.status(401).send({ message: 'No se puede actualizar la contraseña ni el rol desde esta función'});
        }else{
            if(update.username){
                User.findOne({username: update.username.toLowerCase()}, (err, userFind)=>{
                    if(err){
                        return res.status(500).send({ message: 'Error general al buscar'});
                    }else if(userFind){
                        if(userFind._id == req.user.sub){
                            User.findByIdAndUpdate(userId, update, {new: true}, (err, userUpdated)=>{
                                if(err){
                                    return res.status(500).send({message: 'Error general al actualizar'});
                                }else if(userUpdated){
                                    return res.send({message: 'Usuario actualizado exitosamente', userUpdated})
                                }else{
                                    return res.send({message: 'No se pudo actualizar al usuario'});
                                }
                            }).populate('categories')
                        }else{
                            return res.send({message: 'Nombre de usuario ya en uso'});
                        }
                    }else{
                        User.findByIdAndUpdate(userId, update, {new: true}, (err, userUpdated)=>{
                            if(err){
                                return res.status(500).send({message: 'Error general al actualizar'});
                            }else if(userUpdated){
                                return res.send({message: 'Usuario actualizado exitosamente', userUpdated})
                            }else{
                                return res.send({message: 'No se pudo actualizar al usuario'});
                            }
                        }).populate('categories')
                    }
                })
            }else{
                User.findByIdAndUpdate(userId, update, {new: true}, (err, userUpdated)=>{
                    if(err){
                        return res.status(500).send({message: 'Error general al actualizar'});
                    }else if(userUpdated){
                        return res.send({message: 'Usuario actualizado exitosamente', userUpdated})
                    }else{
                        return res.send({message: 'No se pudo actualizar al usuario'});
                    }
                }).populate('categories')
            }
        }
    }
    
}

function removeUser(req, res){
    let userId = req.params.id;
    let params = req.body;

    if(userId != req.user.sub){
        return res.send({message: 'No posees permisos necesarios para realizar esta acción'})
    }else{
        if(!params.password){
            return res.status(401).send({message: 'Por favor ingresa la contraseña para poder eliminar tu cuenta'});
        }else{
            User.findById(userId, (err, userFind)=>{
                if(err){
                    return res.status(500).send({message: 'Error general'})
                }else if(userFind){
                    bcrypt.compare(params.password, userFind.password, (err, checkPassword)=>{
                        if(err){
                            return res.send({message: 'Error general al verificar contraseña'})
                        }else if(checkPassword){
                            User.findByIdAndRemove(userId, (err, userFind)=>{
                                if(err){
                                    return res.status(500).send({message: 'Error al verificar contraseña'})
                                }else if(userFind){
                                    return  res.send({message: 'El Usuario se elimino correctamente', userRemoved:userFind});
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
}

module.exports ={
    saveUser,
    getUsers,
    updateUser,
    removeUser
}