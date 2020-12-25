var Product = require('../models/product.model');
const limit = 12;
module.exports = {

    index: (req, res) => {
        Product.find()
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            console.log('err: ' + err);
        })
    },

    type: (req, res) => {
        const type = req.params.type
      
        Product.find({type : type})
        .then(data => {
            res.json(data)
        })
    },

    id: (req, res) => {
        const id = req.params.id;
        Product.find({_id  : id})
        .exec( (err,data) => {
            if(err){
                console.log("errrr");
            }else{
                res.json(data);
            }
        })
    },

    paginationType: (req, res) => {
        const type = req.params.type;
        const page = req.params.page;
        var start = limit * (page-1);
        Product.find({type  : type}).skip(start).limit(limit)
        .exec( (err,data) => {
            if(err){
                console.log("errrr");
            }else{
                res.json(data);
            }
        })
    },

    search: (req, res) => {
        const keyword = req.params.keyword.toLowerCase();
        Product.find({name:{'$regex' : keyword, '$options' : 'i'}})
        .exec( (err,data) => {
            if(err){
                console.log("errrr");
            }else{
                res.json(data);
            }
        })
    },

    paginationSearch: (req, res) => {
        const keyword = req.params.keyword.toLowerCase();
        const page = req.params.page;
        var start = limit * (page-1);
        Product.find({name:{'$regex' : keyword, '$options' : 'i'}}).skip(start).limit(limit)
        .exec( (err,data) => {
            if(err){
                console.log("errrr");
            }else{
                res.json(data);
            }
        })
    },

    sortIncreaseOfPaginationSearch: (req, res) => {
        const keyword = req.params.keyword.toLowerCase();
        const page = req.params.page;
        var start = limit * (page-1);
        Product.find({name:{'$regex' : keyword, '$options' : 'i'}}).skip(start).limit(limit)
        .then(data => {
            const dt = [];
        
                data.map(value => {
                    const newDT = {
                        _id: value._id,
                        name: value.name,
                        prices: value.prices[0],
                        images: value.images,
                        type: value.type,
                    } 
                    dt.push(newDT)
                })
                function compare(a, b) {
                    var typeA = a.prices;
                    var typeB = b.prices;
                  
                    let comparison = 0;
                    if (typeA > typeB) {
                      comparison = 1;
                    } else if (typeA < typeB) {
                      comparison = -1;
                    }
                    else {
                        comparison = 0;
                    }
                    return comparison;
                }
        
                res.json(dt.sort(compare));
        })
    },

    sortDecreaseOfPaginationSearch: (req, res) => {
        const keyword = req.params.keyword.toLowerCase();
        const page = req.params.page;
        var start = limit * (page-1);
        Product.find({name:{'$regex' : keyword, '$options' : 'i'}}).sort({prices: [-1]}).skip(start).limit(limit)
        .then(data => {
            const dt = [];
        
                data.map(value => {
                    const newDT = {
                        _id: value._id,
                        name: value.name,
                        prices: value.prices[0],
                        images: value.images,
                        type: value.type,
                    } 
                    dt.push(newDT)
                })
                function compare(a, b) {
                    var typeA = a.prices;
                    var typeB = b.prices;
                  
                    let comparison = 0;
                    if (typeA > typeB) {
                      comparison = -1;
                    } else if (typeA < typeB) {
                      comparison = 1;
                    }
                    else {
                        comparison = 0;
                    }
                    return comparison;
                }
        
                res.json(dt.sort(compare));
        })
    },

    typeIncreaseOfPagination: (req, res) => {
        const type = req.params.type;
        const page = req.params.page;
        var start = limit * (page-1);
        Product.find({type: type}).skip(start).limit(limit)
        .then(data => {
            const dt = [];
        
                data.map(value => {
                    const newDT = {
                        _id: value._id,
                        name: value.name,
                        prices: value.prices[0],
                        images: value.images,
                        type: value.type,
                    } 
                    dt.push(newDT)
                })
                function compare(a, b) {
                    var typeA = a.prices;
                    var typeB = b.prices;
                  
                    let comparison = 0;
                    if (typeA > typeB) {
                      comparison = 1;
                    } else if (typeA < typeB) {
                      comparison = -1;
                    }
                    else {
                        comparison = 0;
                    }
                    return comparison;
                }
        
                res.json(dt.sort(compare));
        })
    },

    typeDecreaseOfPagination: (req, res) => {
        const type = req.params.type;
        const page = req.params.page;
        var start = limit * (page-1);
        Product.find({type: type}).skip(start).limit(limit)
        .then(data => {
            const dt = [];
        
                data.map(value => {
                    const newDT = {
                        _id: value._id,
                        name: value.name,
                        prices: value.prices[0],
                        images: value.images,
                        type: value.type,
                    } 
                    dt.push(newDT)
                })
                function compare(a, b) {
                    var typeA = a.prices;
                    var typeB = b.prices;
                  
                    let comparison = 0;
                    if (typeA > typeB) {
                      comparison = -1;
                    } else if (typeA < typeB) {
                      comparison = 1;
                    }
                    else {
                        comparison = 0;
                    }
                    return comparison;
                }
        
                res.json(dt.sort(compare));
        })
    },

    similarProducts: (req, res) => {
        const id = req.body.id;
        const arr = req.body.arr;
        const type = req.body.type;
        Product.find({type: type})
        .then(product => {
            let data = [];
            for(let i in arr) {
                data.push(product[arr[i]]);
            }
            res.json(data);
        })
    },

    addProduct: (req, res) => {
        Product.create({
            name: req.body.name,
            prices: req.body.prices,
            sizes: req.body.sizes,
            images: req.body.images,
            type: req.body.type,
            description: req.body.description,
            number: req.body.quantum
        })
        .then(() => {
            res.json({success: true});
        })
    },

    updateProduct: (req, res) => {
        const condition = {
            _id: req.body.id
        };

        const action = {
            name: req.body.name,
            prices: req.body.prices,
            sizes: req.body.sizes,
            type: req.body.type,
            number: req.body.quantum,
            description: req.body.description,
        }

        Product.updateOne(condition, action)
        .then(() => {
            res.json({success: true});
        })

    },

    deleteProduct: (req, res) => {
        const productId = req.body.productId;
        Product.deleteOne({_id: productId})
        .then(() => {
            res.send(200);
        })
    },

    updateImages: (req, res) => {
        const condition = {
            _id: req.body.id
        };

        const action = {
            images: req.body.images,
        }

        Product.updateOne(condition, action)
        .then(() => {
            res.json({success: true});
        })

    }
}

