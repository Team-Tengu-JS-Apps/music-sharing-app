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

            if (req.body.delete) {
                var id = +req.body.id;
                var songs = user.songs;
                var songIndex = songs.findIndex(x => x.id === id);
                if (songIndex < 0) {
                    res.status(404)
                        .json('The user has no song with such ID');
                    return;
                }

                songs.splice(songIndex, 1);
                db.save();

                res.status(201)
                    .json({
                        result: `Song with ID ${id} removed successfully!`
                    });

                return;
            }

            if (req.body.comments) {
                var id = +req.body.id;
                var songs = db('users').map((s) => s.songs)
                    .reduce((arr, x) => x.concat(arr), []);
                var songIndex = songs.findIndex(x => x.id === id);
                if (songIndex < 0) {
                    res.status(404)
                        .json('Cannot get comments, no such song exists in the DB');
                    return;
                }

                res.status(201)
                    .json({
                        result: songs[songIndex].comments || []
                    });

                return;
            }

            if (req.body.comment) {
                var id = +req.body.id;
                var song = db('users').map((s) => s.songs)
                    .reduce((arr, x) => x.concat(arr), [])
                    .find(x => x.id === id);

                if (!song) {
                    res.status(404)
                        .json('Song with such id does not exist in DB');
                    return;
                }
                song.comments = song.comments || [];
                song.comments.push(req.body.comment);

                db.save();

                res.status(201)
                    .json({
                        result: `Comment for song with ID ${id} added successfully!`
                    });

                return;
            }

            if (req.body.stars) {
                var id = +req.body.id;
                var stars = +req.body.stars;

                if (user.availableStars < stars) {
                    res.status(400)
                        .json('This user has no more stars to add for the day.');
                    return;
                }

                var song = db('users').map((s) => s.songs)
                    .reduce((arr, x) => x.concat(arr), [])
                    .find(x => x.id === id);

                if (!song) {
                    res.status(404)
                        .json('Song with such id does not exist in DB');
                    return;
                }
                song.stars = song.stars || 0;
                song.stars += stars;
                user.availableStars -= stars;

                db.save();

                res.status(201)
                    .json({
                        result: `${stars} stars added to song with ID ${id}!`
                    });

                return;
            }

            var song = {
                id: idGenerator.next(),
                title: req.body.title,
                url: req.body.url,
                description: req.body.description || '',
                stars: 0,
                comments: []
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
        })
        .get('/:id', function(req, res) {
            var user = req.user;
            if (!user) {
                res.status(401)
                    .json('Not authorized User');
                return;
            }
            var id = +req.params.id;

            var song = db('users').map((s) => s.songs)
                .reduce((arr, x) => x.concat(arr), [])
                .find(x => x.id === id);

            if (!song) {
                res.status(404)
                    .json('Song with such id does not exist in DB');
                return;
            }

            res.json({
                result: song
            });
        })
        .get('/top/:count', function (req, res) {
            var user = req.user;
            if (!user) {
                res.status(401)
                    .json('Not authorized User');
                return;
            }

            var topResults = +req.params.count;


            var allSongs = db('users').map((s) => s.songs)
                .reduce((arr, x) => x.concat(arr), []);
            var sortedByStars = allSongs.sort((x, y) => x.stars < y.stars);
            var topSongs = sortedByStars.slice(0, topResults);

            res.json({
                result: topSongs
            });
        });

    return router;
};
