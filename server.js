var express = require("express")
var app = express()
require('./dbConnection');
const router = require("./routers/router");

var port = process.env.port || 3000;

app.use(express.static(__dirname + '/public'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/cat', router)

app.get('/', (req, res) => {
    res.render('index.html');
});
app.listen(port, () => {
    console.log('express server started');
});
