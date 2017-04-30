import {dataService} from 'data';
import {templateLoader} from 'templates';

const usersController = function () {

    function all(context) {
        let users;

        dataService.users.get()
            .then(function (resUsers) {
                users = resUsers;
                return templateLoader.get('users');
            })
            .then(function (template) {
                context.$element().html(template(users));
                /*$('.btn-add-friend').on('click', function () {
                    const id = $(this).parents('.user-box').attr('data-id');
                    dataService.friends.sentRequest(id);
                });*/
            });
    }

    function createRegisterForm(context) {
        templateLoader.get('register')
            .then(function (template) {
                context.$element().html(template());

                $('#btn-register').on('click', function () {
                    const user = {
                        username: $('#tb-reg-username').val(),
                        password: $('#tb-reg-pass').val()
                    };

                    dataService.users.register(user)
                        .then(function (resp) {
                            toastr.success('Registered successfully');
                            return new Promise(function (resolve, reject) {
                                setTimeout(function () {
                                    resolve(resp);
                                }, 1000);
                            });
                        }, function (resp) {
                            toastr.error(resp.responseJSON);
                            return Promise.reject();
                        })
                        .then(function (res) {
                            context.redirect('#/');
                            document.location.reload(true);
                        });
                });
            });
    }

    function signOut() {
        dataService.users.signOut()
            .then(function () {
                document.location = '#/';
                document.location.reload(true);
            });
    }

    function signIn() {
        const user = {
            username: $('#tb-username').val(),
            password: $('#tb-password').val()
        };

        dataService.users.signIn(user)
            .then(function (user) {
                document.location = '#/';
                document.location.reload(true);
            }, function (err) {
                $('#container-sign-in').trigger("reset");
                toastr.error(err.responseJSON);
            });
    }

    return {
        all,
        createRegisterForm,
        signOut,
        signIn
    };
}();

export {usersController};