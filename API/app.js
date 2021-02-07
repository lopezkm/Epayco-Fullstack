const express       = require('express');
const logger        = require('morgan');
const bodyParser    = require('body-parser');
const http          = require('http');
const routes 	     = require('./routes/index.js');


const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', routes);


const port = parseInt(process.env.PORT, 10) || 3001;
app.set('port', port);

const server = http.createServer(app);
server.listen(port);

module.exports = app;