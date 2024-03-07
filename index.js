import express from "express";
import ProductController from "./src/controllers/product.controller.js";
import expressEjsLayouts from "express-ejs-layouts";
import path from 'path';
import { uploadFile } from "./src/middlewares/file-upload.middleware.js"
import validationMiddleware from "./src/middlewares/validation.middleware.js";
import UserController from "./src/controllers/user.controller.js";
import session from "express-session";
import { auth } from "./src/middlewares/auth.middleware.js";
import cookieParser from "cookie-parser";
import { setLastVisit } from "./src/middlewares/lastVisit.middleware.js";
const app = express();

app.use(express.static('public'));
app.use(cookieParser());
app.use(setLastVisit)
app.use(session({
    secret:'SecretKey',
    resave: false,
    saveUninitialized: true,
    cookie:{secure:false},
  })
)

const productController = new ProductController();
const userController = new UserController();

app.use(expressEjsLayouts);
app.use(express.json());
app.use(express.urlencoded({ extended: true} ));
app.set('view engine', 'ejs');
app.set('views', path.join(path.resolve(), 'src', 'views'));

app.get('/', auth, productController.getProducts);
app.get('/update-product/:id', auth, productController.getUpdateView);
app.get('/new-product', auth, productController.getAddProducts);

app.post('/delete-product/:id', auth, productController.deleteProduct);
app.post('/', auth, uploadFile.single('imageUrl'), validationMiddleware, productController.postAddProducts);
app.post('/update-product', auth, productController.postUpdateProduct);

app.get('/register', userController.getRegister)
app.get('/login', userController.getLogin)
app.post('/register', userController.postRegister)
app.post('/login', userController.postLogin)
app.get('/logout', userController.logout)


app.listen(3400, () => {
    console.log('Server listening on port 3400');
})