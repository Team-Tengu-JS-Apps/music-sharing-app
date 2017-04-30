import {dataService} from 'data';
import {homeController} from 'home-controller';
import {usersController} from 'users-controller';
import {videosController} from 'videos-controller';

(function () {

    const sammyApp = Sammy('#content', function () {

        this.get('#/', homeController.all);

        this.get('#/users', usersController.all);
        this.get('#/users/register', usersController.createRegisterForm);

        this.get('#/videos', videosController.all);
        this.get('#/videos/add', videosController.add);

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