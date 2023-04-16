import express from 'express';
import bodyparser from 'body-parser';
import fileUpload from  "express-fileupload";
import connectDB from './config/database';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import auth from './middleware/auth';
import cors from 'cors';
import userRoutes from './routes/userRoutes';
import productRoutes from './routes/productRoutes';
import orderRoutes from './routes/orderRoutes';
require('dotenv').config({ path: './config/config.env'});
const app = express();

// mongo connection
connectDB();

// bodyparser setup
app.use(express.json({limit: "150mb", extended: true}))
app.use(express.urlencoded({limit: "150mb", extended: true, parameterLimit: 50000}))
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

app.use(fileUpload());

// cors
const corsOptions = {
    origin: process.env.FRONTEND_URL,
    credentials: true,
    optionSuccessStatus: 200
}
app.use(cors(corsOptions));

app.use(cookieParser());
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URL,
    })
}))

app.use(auth.initialize);
app.use(auth.session);
app.use(auth.setUser);

userRoutes(app);
productRoutes(app);
orderRoutes(app);

app.listen(process.env.PORT, () =>
    console.log(`Server running on port ${process.env.PORT}`)
);