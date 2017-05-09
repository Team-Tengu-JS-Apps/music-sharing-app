'use strict';

var _data = require('data');

var _homeController = require('home-controller');

var _usersController = require('users-controller');

var _songsController = require('songs-controller');

var _youtubeController = require('youtube-controller');

var _controllerHelpers = require('controller-helpers');

(function () {

    var sammyApp = Sammy('#content', function () {

        this.get('#/', _homeController.homeController.all);

        this.get('#/users', _usersController.usersController.all);
        this.get('#/users/register', _usersController.usersController.register);

        this.get('#/songs', _songsController.songsController.get);
        this.get('#/songs/all', _songsController.songsController.all);
        this.get('#/songs/add', _songsController.songsController.add);
        this.get('#/songs/:id', _songsController.songsController.byId);
        this.get('#/songs/:id/del', _songsController.songsController.del);
        this.get('#/songs/:id/comments', _songsController.songsController.comments);
        this.get('#/songs/:id/comment', _songsController.songsController.comment);
        this.get('#/songs/tops', _songsController.songsController.tops);
        this.get('#/songs/top/:count', _songsController.songsController.top);

        this.get('#/songs/add/query', _youtubeController.youTubeController.query);
    });

    $(function () {
        sammyApp.run('#/');

        if (_data.dataService.users.hasUser()) {
            $('#container-sign-out').removeClass('hidden');
            $('#main-nav').removeClass('hidden');
            $('#signed-in-user').html(localStorage.getItem('signed-in-user-username'));
            $('#btn-sign-out').on('click', function (e) {
                e.preventDefault();
                _usersController.usersController.signOut();
            });
        } else {
            $('#container-sign-in').removeClass('hidden');
            $('#btn-sign-in').on('click', function (e) {
                e.preventDefault();
                _usersController.usersController.signIn();
            });
        }

        $('#content').on('click', '.watch-song', function (event) {
            var $target = $(this);

            var waitToScroll = function waitToScroll(time) {
                return new Promise(function (resolve, reject) {
                    resolve($('html, body').animate({
                        scrollTop: 0
                    }));
                });
            };

            waitToScroll().then(function () {
                var urlOfSong = $target.data("url");
                var urlToEmbed = _controllerHelpers.controllerHelpers.convertSrcToEmbed(urlOfSong);
                _songsController.songsController.embed(urlToEmbed);
            });
        });

        var $carousel = $('.carousel');
        if ($carousel.length) {
            $carousel.carousel();
        }
    });
})();
//# sourceMappingURL=main.js.map