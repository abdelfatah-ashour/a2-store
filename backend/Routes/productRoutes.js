const Router = require('express').Router();
const {
    getProducts,
    createProduct,
    editProduct,
    deleteProduct,
} = require('../Controllers/productControllers');
const { isAuth, isAdmin } = require('../Controllers/authControllers');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function (req, file, cb) {
        cb(
            null,
            Date.now() +
                '-' +
                file.originalname +
                '.' +
                require('mime').extension(file.mimetype)
        );
    },
});

const upload = multer({
    storage: storage,
    limits: { fileSize: '1MB' },
}).single('photo');

Router.route('/product').get(getProducts);

// next Routes for Admin only
Router.route('/product/create').post(upload, createProduct);
Router.route('/product/update/:productID').post(isAuth, isAdmin, editProduct);
Router.route('/product/delete/:productID').post(isAuth, isAdmin, deleteProduct);

module.exports = Router;
