import {
    productList,
    addProduct,
    displayProduct,
    updateProduct,
    deleteProduct,
    addReview,
    updateReview,
    deleteReview
} from '../controllers/productController';
import multer from 'multer';

const productRoutes = (app) => {
    const upload = multer({ dest: './controllers/uploads/' });

    app.route('/product')
        .post(upload.array("images"), addProduct);
    app.route('/products/:category')
        .get(productList);
    app.route('/product/:productId')
        .get(displayProduct)
        .put(upload.array("images"), updateProduct)
        .delete(deleteProduct);
    app.route('/product/:productId/review')
        .put(addReview);
    app.route('/product/:productId/review/:userId')
        .put(updateReview)
        .delete(deleteReview);
}

export default productRoutes;