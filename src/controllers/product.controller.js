import ProductModel from "../models/product.model.js"

export default class ProductController {
    getProducts(req, res, next) {
        let products = ProductModel.getAll();
        res.render('index', { products })
    };

    getAddProducts(req, res, next) {
        res.render(
            'new-product', {
                errorMessage: null,
                userEmail: req.session.userEmail
            }
        )
    };

    postAddProducts(req, res, next) {
        const { name, desc, price } = req.body;
        const imageUrl = 'images/' + req.file.filename;
        ProductModel.add(name, desc, price, imageUrl );
        let products = ProductModel.getAll();
        res.render('index', { products, userEmail: req.session.userEmail });
    }

    getUpdateView(req, res, next) {
        const id = req.params.id;
        const productFound = ProductModel.getById(id);

        if(productFound) {
            res.render(
                'update-product', {
                    product: productFound,
                    errorMessage: null,
                    userEmail: req.session.userEmail
                }
            )
        }
        else {
            res.status(401).send('Product not found')
        }
    }

    postUpdateProduct(req, res, next) {
        ProductModel.update(req.body);
        let products = ProductModel.getAll();
        res.render('index', { products })
    }

    deleteProduct(req, res, next) {
        const id = req.params.id;
        console.log(id);
        const productFound = ProductModel.getById(id);

        if(!productFound) {
            return res.status(401).send('Product not found')
        }
        ProductModel.delete(id)
        let products = ProductModel.getAll();
        res.render('index', { products })
    }
}