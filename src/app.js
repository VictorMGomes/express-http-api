const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

class App {
    constructor(){
        this.app = express();
        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.app.use(logger('dev'));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(cookieParser());
        this.app.use(express.static(path.join(__dirname, '../public')));
        this.app.use( (req, res, next) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
            res.header("Access-Control-Allow-Headers", "Access, Content-type, Authorization, Accept, Origin, X-Requested-With");
            this.app.use(cors());
            next();
        });
    }

    routes() {
        this.app.use('/', indexRouter);
        this.app.use('/users', usersRouter);     
    }  

}

module.exports = new App;
