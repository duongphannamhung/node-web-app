'use strict';

const express = require('express');
const app = express();
const port = process.env.PORT || 6969;

const expressHandlerbars = require('express-handlebars');
app.use(express.static(__dirname + '/public'));

app.engine('hbs', expressHandlerbars.engine({
    layoutDir: __dirname + '/views/layouts',
    partialDir: __dirname + '/views/partials',
    extname: 'hbs',
    defaultLayout: 'layout'
}));

app.set('view engine', 'hbs');

app.get("/createTables", (req, res) => {
    let models = require('./models');
    models.sequelize.sync().then(() => {
        res.send('tables created!');
    })
})
app.get('/', (req, res) => {
    res.render('index');
})
app.get('/:page', (req, res) => {
    res.render(req.params.page);
})

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
})