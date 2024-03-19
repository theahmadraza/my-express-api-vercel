const connectDB = require("./db");
const express = require("express");
const cors = require('cors');
const AuthRoutes = require("./routes/Auth");
const ProductRoutes = require('./routes/ProductDetail')
const path = require('path');
const IsAuthorized = require("./middlewares/isAuthorized");


require('dotenv').config()


const start = async () => {
    try {
        await connectDB("mongodb+srv://ahmadraza:iVpYTDd8dmbyMLtZ@car-app.di4iqmx.mongodb.net/");
        console.log("Db connected Successfully");
        const app = express();
        app.use(express.json());
        app.use(cors())
        app.use(function (req, res, next) {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Credentials, true')
            res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept, X-Requested-With, Authorization');
            res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
            next();
        });
        app.use("/images",express.static("images"));
        app.use('/auth', AuthRoutes);
        app.use('/product', IsAuthorized ,ProductRoutes)
        // app.use('/images', express.static(path.join(process.cwd(), 'images')));

        app.listen(process.env.PORT, () => {
            console.log(`listining the port at ${process.env.PORT}`);
        });
    } catch (error) {
        console.log(error);
        console.log("Failed to connect to the database, server is not running.");
    }
};
start();