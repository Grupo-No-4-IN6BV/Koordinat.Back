'use strict'

var Product = require('../models/product.model');
var Category = require('../models/category.model');
var Business = require('../models/business.model');
var Cart = require('../models/shoppingCart.model');

function saveProduct(req, res){
    
    var product = new Product();
    var params = req.body;
    var businessId =  req.params.idB;
    
    Business.findById(businessId, (err, businessFind)=>{
        if(err){
            res.status(500).send({message: 'Error general'});
        }else if(businessFind){
            if(params.name && params.price){
                Product.findOne({name: params.name}, (err, productFind)=>{
                    if(err){
                        return res.status(500).send({message: 'Error general'})
                    }else if(productFind){
                        return res.send({message: 'Producto ya fue añadido intentelo'});
                    }else{
                        if(params.category){
                            Category.findOne({_id: params.category}, (err, categoryFind)=>{
                                if(err){
                                    return res.status(500).send({message: 'Error general'})   
                                }else if(categoryFind){
                                    if(params.stock){
        
                                        product.name = params.name;
                                        product.price = params.price;
                                        product.stock = params.stock;
                                        product.business = businessFind.id;
                                        product.category = categoryFind.id;
                                        product.description = params.description;
                                        product.img1 = params.img1
                                        product.img2 = params.img2
                                        product.img3 = params.img3
                                        product.img4 = params.img4
                                        product.img5 = params.img5                               
        
                                        product.save((err, productSaved)=>{
                                            if(err){
                                                return res.status(500).send({message: 'Error genera'})
                                            }else if (productSaved){
                                                return res.send({message: 'Producto añadido exitosamente', productSaved})
                                            }else{
                                                return res.status(500).send({message: 'Producto no añadido'})
                                            }
                                        })
                                    }else{
        
                                        product.name = params.name;
                                        product.price = params.price;
                                        product.stock = 0;
                                        product.business = businessFind.id;
                                        product.category = categoryFind.id;
                                        product.description = params.description;
                                        product.img1 = params.img1
                                        product.img2 = params.img2
                                        product.img3 = params.img3
                                        product.img4 = params.img4
                                        product.img5 = params.img5    
        
                                        product.save((err, productSaved)=>{
                                            if(err){
                                                return res.status(500).send({message: 'Error general'})
                                            }else if (productSaved){
                                                return res.send({message: 'Producto creado exitosamente', productSaved})
                                            }else{
                                                return res.status(500).send({message: 'Producto no creado'})
                                            }
                                        })
                                    }
                                }else{
                                    return res.send({message: 'No se encontro categoria'})
                                }
                            }).populate('business');
                        }else{
                            var categoryD = 'default';
        
                            Category.findOne({name: categoryD}, (err, categoryFind)=>{
                                if(err){
                                    return res.status(500).send({message: 'Error general'})
                                }else if(categoryFind){
                                    if(params.stock){
                                        product.name = params.name;
                                        product.price = params.price;
                                        product.stock = params.stock;
                                        product.business = businessFind.id;
                                        product.category = categoryFind.id;
                                        product.description = params.description;
                                        product.img1 = params.img1
                                        product.img2 = params.img2
                                        product.img3 = params.img3
                                        product.img4 = params.img4
                                        product.img5 = params.img5    
                                        product.save((err, productSaved)=>{
                                            if(err){
                                                return res.status(500).send({message: 'Error general'})
                                            }else if (productSaved){
                                                return res.send({message: 'Producto creado exitosamente', productSaved})
                                            }else{
                                                return res.status(500).send({message: 'Producto no creado'})
                                            }
                                        })
                                    }else{
        
                                        product.name = params.name;
                                        product.price = params.price;
                                        product.stock = 0;
                                        product.business = businessFind.id;
                                        product.category = categoryFind.id;
                                        product.description = params.description;
                                        product.img1 = params.img1
                                        product.img2 = params.img2
                                        product.img3 = params.img3
                                        product.img4 = params.img4
                                        product.img5 = params.img5    
        
                                        product.save((err, productSaved)=>{
                                            if(err){
                                                return res.status(500).send({message: 'Error general'})
                                            }else if (productSaved){
                                                return res.send({message: 'Producto creado exitosamente', productSaved})
                                            }else{
                                                return res.status(500).send({message: 'Producto no creado'})
                                            }
                                        })
                                    }
                                }else{
                                    return res.status(404).send({message: 'No se encontro categoria'})
                                }
                            }).populate('business');
                        }
                    }
                })
            }else{
                return res.status(401).send({message: 'Por favor llenar los campos obligatorios'})
            }
        }else{
            res.status(404).send({message: 'No hay registros de dicha empresa'});
        }
    })
}

function updateProduct(req, res){
    let productId = req.params.id;
    let update = req.body;
            if(update.category){
                Category.findOne({_id: update.category}, (err, categoryFind)=>{
                    if(err){
                        return res.status(500).send({message: 'Error en el servidor1'});
                    }else if(categoryFind){
                        update.category = categoryFind._id;
                                Product.findByIdAndUpdate({_id: update._id}, update, {new: true}, (err, productUpdate)=>{
                                    if(err){
                                        return res.status(500).send({message: 'Error general3'});
                                    }else if(productUpdate){
                                        return res.send({message: 'Producto actualizado', productUpdate});
                                    }else{
                                        return res.status(404).send({message: 'No hay registro de producto para actualizar'}); 
                                    }
                                }).populate('category')
                    }else{
                        return res.status(404).send({message: 'No se encontro categoria'})
                    }
                })
            }else{
                Product.findOne({name: update.name}, (err, productFind)=>{
                    if(err){
                        res.status(500).send({message: 'Error en el servidor4'})
                    }else if(productFind){
                        res.status(200).send({message: 'Producto ya existente'})
                    }else{
                        Product.findByIdAndUpdate(productId, update, {new: true}, (err, productUpdate)=>{
                            if(err){
                                console.log(err)
                                return res.status(500).send({message: 'Error general5', err});
                                
                            }else if(productUpdate){
                                return res.send({message: 'Producto actualizado', productUpdate}.populate('product'));
                            }else{
                                return res.status(404).send({message: 'No hay registro de producto para actualizar'}); 
                            }
                        }).populate('category')
                    }
                })
            } 
    
}



function removeProduct(req, res){
    console.log('entra');
    let productId = req.params.id;

    Product.findByIdAndRemove(productId, (err, productRemoved)=>{
        if(err){
            return res.status(500).send({message: 'Error en el servidor'});
        }else if(productRemoved){
            return res.send({message: 'Producto eliminado', productRemoved});
        }else{
            return res.status(404).send({message: 'Registro de producto no encontrado o anteriormente eliminado'});
        }
    })
}

function getProduct(req, res){
    let productId = req.params.id;

    Product.findById(productId).exec((err, product)=>{
        if(err){
            return res.status(500).send({message: 'Error en el servidor'});
        }else if(product){
            return res.status(200).send({message: 'Producto encontrado', product})
        }else{
            return res.status(404).send({message: 'No hay registro de producto'})
        }
    })
}


function getProductNews(req, res){
    Product.find({}).sort({$natural:-1}).limit(8).exec((err, productsFind)=>{
        if(err){
            return res.status(500).send({message: 'Error en el servidor'});
        }else if(productsFind){
            return res.status(200).send({message: 'Producto encontrado', productsFind})
        }else{
            return res.status(404).send({message: 'No hay registro de producto'})
        }
    })
}

function getProducts(req, res){
    Product.find({}).exec((err, productsFind)=>{
        if(err){
            return res.status(500).send({message: 'Error en el servidor'});
        }else if(productsFind){
            return res.send({message: 'Productos encontrados:', productsFind});
        }else{
            return res.send({message: 'No hay registros de productos'});
        }
    })
}

function spentProducts(req, res){
    let businessId = req.params.idB;
    Product.find({business: businessId}).exec((err, products)=>{
        if(err){
            return res.status(500).send({message: 'Error en el servidor'});
        }else if(products){
            return res.send({message: 'Productos encontrados:', products});
        }else{
            return res.status(200).send({message: 'No hay registros'});
        }
    })
}


function controlStock(req, res){
    let productId = req.params.id;
    let update = req.body;

    if(update.name || update.price || update.category || update.solds){
        return res.status(404).send({message:'No puedes actualizar estos campos en esta función'}); 
    }else if(update.stock){
        Product.findByIdAndUpdate(productId, update, {new:true}, (err, productUpdate)=>{
            if(err){
                return res.status(500).send({message: 'Error general al actualizar'});
            }else if(productUpdate){
                return res.send({message: 'Stock actualizado', productUpdate});
            }else{
                return res.status(401).send({message: 'No se actualizó el stock'});
            } 
        })
    }else {
        return res.status(404).send({message:'Solo se puede modificar el campo stock'});
    }
}


function searchProduct(req, res){
    var params = req.body;

    if(params.search){
        Product.find({name: params.search}, (err, productFind)=>{
            if(err){
                return res.status(500).send({message: 'Error general'});
            }else if(productFind){
                return res.send({message: 'Se encontraron estos productos: ', productFind});
            }else {
                return res.status(404).send({message: 'No hay productos con esa descripción'});
            }
        })
    }else {
        return res.status(403).send({message: 'Ingresar nombre del producto que busca'})
    }
}

function orders(req, res){
    let idBussines = req.params.idB;
    Cart.find({idBusinnes: idBussines, condition: false}, (err, orders)=>{
        if(err){
            return res.status(500).send({message: 'Error general'});
        }else if(orders){
            return res.send({message: 'pedidos encontrados', orders})
        }else{
            return res.send({message: 'no se encontraron los datos'})
        }
    })
}

function delOrder(req, res){
    var params = req.body;
    var stockNew;

    Product.findById(params.idProducto, (err, product)=>{
        if(err){
            return res.status(500).send({message: 'Error general'});
        }else if(product){
            stockNew = product.stock - params.cantidad;
            Product.findByIdAndUpdate(product._id, {stock: stockNew}, {new:true}, (err, productUpdate)=>{
                if(err){
                    return res.status(500).send({message: 'Error general al actualizar'});
                }else if(productUpdate){
                    Cart.findByIdAndDelete(params._id, (err, cartDel)=>{
                        if(err){
                            return res.status(500).send({message: 'Error general'}); 
                        }else if(cartDel){
                            return res.send({message: 'Pedido Completado', productUpdate});
                        }else{
                            return res.send({message: 'no se encontro el pedido'})
                        }
                    })
                }else{
                    return res.status(401).send({message: 'No se actualizó el stock'});
                } 
            })
        }else{
            return res.send({message: 'no se encontro el producto'})
        }
    })
}

module.exports = {
    orders,
    saveProduct,
    updateProduct,
    removeProduct,
    getProductNews,
    getProducts,
    spentProducts,
    controlStock,
    searchProduct,
    getProduct,
    delOrder
    
}