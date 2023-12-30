'use strict';
require('dotenv').config();

const express = require('express');
const app = express();
const port = process.env.PORT || 6969;

const expressHandlerbars = require('express-handlebars');
const {createStarList} = require('./controllers/handlebarsHelper');
const { createPagination } = require('express-handlebars-paginate');
const session = require('express-session'); 
const redisStore = require('connect-redis').default;
const {createClient} = require('redis');
const redisClient = createClient({
    url : process.env.REDIS_URL,
});

redisClient.connect().catch(console.error);

app.use(express.static(__dirname + '/public'));

app.engine('hbs', expressHandlerbars.engine({
    layoutDir: __dirname + '/views/layouts',
    partialDir: __dirname + '/views/partials',
    extname: 'hbs',
    defaultLayout: 'layout',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true
    },
    helpers: {
        createStarList: createStarList,
        createPagination: createPagination,
    }
}));

app.set('view engine', 'hbs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// cau hinh
app.use(session({
    secret: process.env.SESSION_SECRET,
    store: new redisStore({ client: redisClient }),
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        maxAge: 20 * 60 * 1000 // 20 minutes
    }
}));


app.use((req,res,next) => {
    let Cart = require('./controllers/cart');
    req.session.cart = new Cart(req.session.cart ? req.session.cart : {});
    res.locals.quantity = req.session.cart.quantity;

    next();
});

// routes
app.use('/', require('./routes/indexRouter'));
app.use('/products', require('./routes/productRouter'));
app.use('/users', require('./routes/usersRouter'));

app.use((req, res, next) => {
    res.status(404).render('error', { message: 'Page Not Found'});
});

app.use((error, req, res, next) => {
    console.log(error);
    res.status(500).render('error', { message : 'Internal Server Error'});
});

// start server
app.listen(port, () => {
    console.log(`server is running on port ${port}`);
})