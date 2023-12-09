'use strict';

const express = require('express');
const app = express();
const port = process.env.PORT || 6969;

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.send('Hello to Eshop');
})

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
})