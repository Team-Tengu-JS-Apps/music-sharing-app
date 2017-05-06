import {dataService} from 'data';
import {homeController} from 'home-controller';
import {usersController} from 'users-controller';
import {songsController} from 'songs-controller';

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
        this.get('#/songs/:id/rate', songsController.rate);

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
    });
}());