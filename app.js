var express = require('express'),
    bodyParser = require('body-parser'),
    low = require('lowdb');

var app = express(),
    db = low('data/data.json');

db._.mixin(require('underscore-db'));

app.use(bodyParser.json());
app.use(express.static('public'));
app.use('/libs', express.static('node_modules'));

var usersRouter = require('./routers/usersRouter')(db);
var songsRouter = require('./routers/songsRouter')(db);

require('./utils/authorized-user')(app, db);

app.use('/api/users', usersRouter);
app.use('/api/songs', songsRouter);

var port = process.env.PORT || 3013;

app.listen(port, function () {
    console.log('Server is running at http://localhost:' + port);
});
