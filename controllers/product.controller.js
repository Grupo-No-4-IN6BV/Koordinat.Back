'use strict'

var Product = require('../models/product.model');
var Category = require('../models/category.model');

function saveProduct(req, res){
    var product = new Product();
    var params = req.body;

    if(params.name && params.price){
        Product.findOne({name: params.name}, (err, productFind)=>{
            if(err){
                return res.status(500).send({message: 'Error general'})
            }else if(productFind){
                return res.send({message: 'Producto ya fue añadido intentelo'});
            }else{
                if(params.category){
                    Category.findOne({name: params.category}, (err, categoryFind)=>{
                        if(err){
                            return res.status(500).send({message: 'Error general'})   
                        }else if(categoryFind){
                            if(params.stock){

                                product.name = params.name;
                                product.price = params.price;
                                product.stock = params.stock;
                                product.category = categoryFind.id;
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
                                product.category = categoryFind.id;
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
                    })
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
                                product.category = categoryFind.id;
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
                                product.category = categoryFind.id;
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
                    }) 
                }
            }
        })
    }else{
        return res.status(401).send({message: 'Por favor llenar los campos obligatorios'})
    }
}


function updateProduct(req, res){
    let productId = req.params.id;
    let update = req.body;


    if(update.stock || update.solds){
        return res.status(404).send({message: 'No puedes actualizar los paramatros de stock y solds'})
    }else{
        if(update.name || update.price || update.category){
            if(update.category){
                Category.findOne({name: update.category}, (err, categoryFind)=>{
                    if(err){
                        return res.status(500).send({message: 'Error en el servidor'});
                    }else if(categoryFind){
                        update.category = categoryFind.id;
    
                        Product.findOne({name: update.name}, (err, productFind)=>{
                            if(err){
                                return res.status(500).send({message: 'Error en el servidor'})
                            }else if(productFind){
                                return res.status(200).send({message: 'Producto ya existente'})
                            }else{
                                Product.findByIdAndUpdate(productId, update, {new: true}, (err, productUpdate)=>{
                                    if(err){
                                        return res.status(500).send({message: 'Error general'});
                                    }else if(productUpdate){
                                        return res.send({message: 'Producto actualizado', productUpdate}).populate('product');
                                    }else{
                                        return res.status(404).send({message: 'No hay registro de producto para actualizar'}); 
                                    }
                                }).populate('category')
                            }
                        })
                    }else{
                        return res.status(404).send({message: 'No se encontro categoria'})
                    }
                })
            }else{
                Product.findOne({name: update.name}, (err, productFind)=>{
                    if(err){
                        res.status(500).send({message: 'Error en el servidor'})
                    }else if(productFind){
                        res.status(200).send({message: 'Producto ya existente'})
                    }else{
                        Product.findByIdAndUpdate(productId, update, {new: true}, (err, productUpdate)=>{
                            if(err){
                                return res.status(500).send({message: 'Error general'});
                            }else if(productUpdate){
                                return res.send({message: 'Producto actualizado', productUpdate}.populate('product'));
                            }else{
                                return res.status(404).send({message: 'No hay registro de producto para actualizar'}); 
                            }
                        }).populate('category')
                    }
                })
            } 
          
        }else{
        return res.status(404).send({message: 'Ingresar algún campo para actualizar'});
        }
    }
}


function removeProduct(req, res){
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

    Product.findById(productId).exec((err, productFind)=>{
        if(err){
            return res.status(500).send({message: 'Error en el servidor'});
        }else if(productFind){
            return res.status(200).send({message: 'Producto encontrado', product}.populate('product'))
        }else{
            return res.status(404).send({message: 'No hay registro de producto'})
        }
    }).populate('category')
}


function getProducts(req, res){
    Product.find({}).populate('category').exec((err, productsFind)=>{
        if(err){
            return res.status(500).send({message: 'Error en el servidor'});
        }else if(productsFind){
            return res.send({message: 'Productos encontrados:', products});
        }else{
            return res.status(200).send({message: 'No hay registros de productos'});
        }
    })
}

function spentProducts(req, res){
    Product.find({stock: 0}).exec((err, products)=>{
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

module.exports = {
    saveProduct,
    updateProduct,
    removeProduct,
    getProduct,
    getProducts,
    spentProducts,
    controlStock,
    searchProduct
}