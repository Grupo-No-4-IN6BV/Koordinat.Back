'user strict'

var Category = require('../models/category.model');
var User = require('../models/user.model');

function creatDefault(req, res){
    let category = new Category();
    
    Category.name = 'default';

    Category.findOne({name: category.name}, (err, categoryFind)=>{
        if(err){
            return res.status(500).send({message: 'Error general al '})
        }else if(categoryFind){
            return console.log({message: 'Categoria default creado correctamente'});
        }else{
            category.save((err, categorySaved)=>{
                if(err){
                    return res.status(500).send({message: 'Errorgeneral al guardar categorria'})
                }else if(categorySaved){
                    return console.log('Categoria default creado correctamente');
                }else{
                    return res.status(500).send({message: 'Categoria no creado'})
                }
            })
        }
    })
}

function saveCategory(req, res){
    var category  = new Category();
    var params = req.body;

    if(params.name){
        Category.findOne({name: params.name}, (err, categoryFind)=>{
            if(err){
                return res.status(500).send({message: 'Error gneral al guardar categoria'})
            }else if(categoryFind){
                res.send({message: 'Categoria solicitado ya existe'});
            }else{
                category.name = params.name;
                category.description = params.description
                category.image = params.image
                category.save((err,categorySaved)=>{
                    if(err){
                        return res.status(500).send({message: 'Error general al guardar cartegoria'});
                    }else if(categorySaved){
                        return res.send({message: 'Categoria creado exitosamente', categorySaved});
                    }else{
                        return res.status(403).send({message: 'No se puedo crear Categoria'});
                    }
                })
            }
        })
    }else{
        res.status(404).send({message: 'Ingresar campos requerido'});
    }

}

function searchCategory(req, res){
    var params = req.body;

        if(params.search){
            Category.find({$or:[{name: params.search}]}, (err, resultsSearch)=>{
                if(err){
                    return res.status(500).send({message: 'Error General'});
                }else if(resultsSearch){
                    return res.send({resultsSearch})
                }else{
                    return res.status(404).send({message: 'No hay registros de categoria por mostrar'});
                }
        })
    }else{
        return res.status(403).send({message: 'Ingresar nombre categoria que desea ver'})
    }
}

function updateCategory(req, res){
    let categoryId = req.params.idC;
    let update =req.body;

    Category.findByIdAndUpdate(categoryId, update, {new: true}, (err, updateCategory)=>{
        if(err){
            return res.status(500).send({message: 'Error general al guardar categoria'})
        }else if(updateCategory){
            return res.send({message: 'Categoria Actualizada corectamente', updateCategory})
        }else{
            return res.status(401).send({message: 'No se puedo actualizar categoria'});
        }
    })
}

function removeCategory(req, res){
    let categoryId = req.params.idC;
    Category.findByIdAndRemove(categoryId, (err, categoryPull)=>{
        if(err){
            return res.status(500).send({message: 'Error general durante la eliminación', err})
        }else if(categoryPull){
            return res.send({message: 'Categoria eliminada de manera exitosa', categoryPull});
        }else{
            return res.status(404).send({message: 'Categoria no encontrada o ya eliminada'})
        }
    })
}

function getCategories(req, res){
    Category.find({}).exec((err, categories) => {
        if(err){
            return res.status(500).send({message: "Error al buscar las Categorias"})
        }else if(categories){
            return res.send({message: "Las categorias han sido encontradas", categories})
        }else{
            return res.status(204).send({message: "No se encontraron las categorias"})
        }
    })
}


module.exports={
    getCategories,
    creatDefault,
    saveCategory,
    searchCategory,
    updateCategory,
    removeCategory
}