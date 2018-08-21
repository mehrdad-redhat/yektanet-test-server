require('rootpath')();
let express = require('express');
let app = express();
let cors = require('cors');
let bodyParser = require('body-parser');


app.use(cors());
app.use(bodyParser.json());

app.use('/products', require('./controllers/products.controller'));

let port=3000;

app.listen(port, function () {
	console.log('Server listening on port ' + port);
});