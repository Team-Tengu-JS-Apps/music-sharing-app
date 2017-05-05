var express = require('express'),
    idGenerator = require('../utils/id-generator')();

require('../polyfills/array');

module.exports = function (db) {
    var router = express.Router();

    router.get('/', function (req, res) {
        var user = req.user;
        if (!user) {
            res.status(401)
                .json('Not authorized User');
            return;
        }

        var songs = user.songs;

        res.json({
            result: songs
        });
    })
        .post('/', function (req, res) {
            var user = req.user;
            if (!user) {
                res.status(401)
                    .json('Not authorized User');
                return;
            }

            var song = {
                id: idGenerator.next(),
                title: req.body.title,
                url: req.body.url,
                description: req.body.description || '',
                stars: 0
            };

            user.songs = user.songs || [];
            user.songs.push(song);

            res.status(201)
                .json({
                    result: song
                });
        })
        .get('/all', function (req, res) {
            var user = req.user;
            if (!user) {
                res.status(401)
                    .json('Not authorized User');
                return;
            }

            res.json({
                result: db('users').map((s) => s.songs)
            });
        });
    return router;
};
