import multer from 'multer';
import {
    addAddress,
    addToCart,
    createUser,
    currentUserDetails,
    deleteAddress,
    deletefromCart,
    deleteUser,
    displayUser,
    login,
    logout,
    updateAddress,
    updateInCart,
    updateUser,
    userList
} from '../controllers/userController';

const userRoutes = (app) => {
    const upload = multer({ dest: './controllers/uploads/' });

    //-------------------------------- User Authentication --------------------------------

    app.route('/user/register')
        .post(upload.single('avatar'), createUser);
    app.route('/user/login')
        .post(login);
    app.route('/user/logout')
        .get(logout);

    //-------------------------------- Manage and View Users --------------------------------

    app.route('/user')
        .get(currentUserDetails);
    app.route('/user/:userId')
        .get(displayUser)
        .delete(deleteUser);
    app.route('/user/:userId')
        .put(upload.single('avatar'), updateUser)
    app.route('/users')
        .get(userList);

    //-------------------------------- Manage User Addresses --------------------------------

    app.route('/user/:userId/address')
        .put(addAddress);
    app.route('/user/:userId/address/:addressId')
        .put(updateAddress)
        .delete(deleteAddress);

    //-------------------------------- Manage User Cart --------------------------------

    app.route('/user/:userId/cart')
        .put(addToCart);
    app.route('/user/:userId/cart/:productId')
        .put(updateInCart)
        .delete(deletefromCart);
}

export default userRoutes;