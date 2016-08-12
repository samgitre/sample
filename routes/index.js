var express = require('express');
var router = express.Router();
var products = require('../model/product-schema');
var multer = require('multer');
var upload = multer({dest : '../uploads/'});




/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Royal Boutique' });
});


/* GET Add product  page.*/
router.get('/newProduct', function(req, res, next) {
    res.render('newProduct', { title: 'Admin | Add product' });
});


// create new product
router.post('/product', function (req, res) {
    var newProduct = new products({
        title : req.body.title,
        category : req.body.category,
        color : req.body.color,
        price : req.body.price,
        quantity : req.body.quantity,
        photo :  req.file

    });
    newProduct.save(function (err) {
        if (err){
            res.send(err);
            return err;
        }
        res.json({message: 'New product created'});
    });
});


//retrieve all product
router.get('/product', function (req, res) {
    products.find(function (err, product) {
        if(err){
            res.send(err);
        }
        res.json(product);
    });
});


//retrieve product by Id
router.get('/product/:product_id', function (req, res) {
    products.findById(req.params.product_id, function (err, product) {
        if(err){
            res.send(err);
        }
        res.json(product);

    });

});


// update product by Id
router.put('/product/:product_id',function (req,res) {
    products.findById(req.params.product_id, function (err) {
        if(err){
            res.send(err);
            return err;
        }
           var body = req.body;
           // product.title = req.body.title;
           // product.category  = req.body.category;
           // product.color = req.body.color;
           // product.price = req.body.price;
           // product.quantity = req.body.quantity;
           // product.photo  =  req.file;
        body.save(function (err) {
            if(err){
                res.send(err);
            }
            res.json({message : 'Product updated successfully'});

        });
    });
});


//delete product by Id
router.delete('/product/:product_id',function (req,res) {
    products.remove({_id: req.params.product_id}, function (err, product) {
        if(err){
            res.send(err);
        }
        res.json({message : 'product deleted successfully'});
    });
});


module.exports = router;
