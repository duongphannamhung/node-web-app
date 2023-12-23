'use strict';

const express = require('express');
const app = express();
const port = process.env.PORT || 6969;

const expressHandlerbars = require('express-handlebars');
const {createStarList} = require('./controllers/handlebarsHelper');
const { createPagination } = require('express-handlebars-paginate');

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

// routes
app.use('/', require('./routes/indexRouter'));
app.use('/products', require('./routes/productRouter'));

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