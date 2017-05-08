import {dataService} from 'data';
import {homeController} from 'home-controller';
import {usersController} from 'users-controller';
import {songsController} from 'songs-controller';
import {youTubeController} from 'youtube-controller';
import {controllerHelpers} from 'controller-helpers';
import {templateLoader} from 'templates';

(function () {

    const sammyApp = Sammy('#content', function () {

        this.get('#/', homeController.all);

        this.get('#/users', usersController.all);
        this.get('#/users/register', usersController.register);

        this.get('#/songs', songsController.get);
        this.get('#/songs/all', songsController.all);
        this.get('#/songs/add', songsController.add);
        this.get('#/songs/:id', songsController.byId);
        this.get('#/songs/:id/del', songsController.del);
        this.get('#/songs/:id/comments', songsController.comments);
        this.get('#/songs/:id/comment', songsController.comment);
        this.get('#/songs/top/:count', songsController.top);

        this.get('#/songs/add/query', youTubeController.query);

    });

    $(function () {
        sammyApp.run('#/');

        if (dataService.users.hasUser()) {
            $('#container-sign-out').removeClass('hidden');
            $('#main-nav').removeClass('hidden');
            $('#signed-in-user').html(localStorage.getItem('signed-in-user-username'));
            $('#btn-sign-out').on('click', function (e) {
                e.preventDefault();
                usersController.signOut();
            });
        } else {
            $('#container-sign-in').removeClass('hidden');
            $('#btn-sign-in').on('click', function (e) {
                e.preventDefault();
                usersController.signIn();
            });
        }

        $('#content').on('click', '.watch-song', function (event) {
            const $target = $(this);


            let wait = function (time) {
                return new Promise((resolve, reject) => {
                    resolve($('html, body').animate({
                        scrollTop: 0
                    }));
                });
            };

            /*$('html, body').animate({
                scrollTop: 0
            });*/
            wait()
                .then(function () {
                    const urlOfSong = $target.data("url");
                    const urlToEmbed = controllerHelpers.convertSrcToEmbed(urlOfSong);
                    songsController.embed(urlToEmbed);
                });

        });

        const $carousel = $('.carousel');
        if ($carousel.length) {
            $carousel.carousel();
        }
    });
}());