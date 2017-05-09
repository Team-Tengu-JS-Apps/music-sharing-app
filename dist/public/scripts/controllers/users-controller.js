'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.usersController = undefined;

var _data = require('data');

var _templates = require('templates');

var usersController = function () {

    function all(context) {
        var users = void 0;

        _data.dataService.users.get().then(function (resUsers) {
            users = resUsers;
            return _templates.templateLoader.get('users');
        }).then(function (template) {
            context.$element().html(template(users));
        });
    }

    function register(context) {
        _templates.templateLoader.get('register').then(function (template) {
            context.$element().html(template());

            $('#register-user-form').bootstrapValidator({
                live: 'enabled',
                trigger: null
            });

            $('#btn-register').on('click', function (event) {
                event.preventDefault();

                var bootstrapValidator = $("#register-user-form").data('bootstrapValidator');

                if (!bootstrapValidator.isValid()) {
                    toastr.warning('Unable to register user!');
                    return;
                }

                var user = {
                    username: $('#tb-reg-username').val(),
                    password: $('#tb-reg-pass').val()
                };

                _data.dataService.users.register(user).then(function (resp) {
                    toastr.success('Registered successfully');
                    return new Promise(function (resolve, reject) {
                        setTimeout(function () {
                            resolve(resp);
                        }, 500);
                    });
                }, function (resp) {
                    toastr.error(resp.responseJSON);
                    return Promise.reject();
                }).then(function (res) {
                    context.redirect('#/');
                    document.location.reload(true);
                });
            });
        });
    }

    function signOut() {
        _data.dataService.users.signOut().then(function () {
            document.location = '#/';
            document.location.reload(true);
        });
    }

    function signIn() {
        var user = {
            username: $('#tb-username').val(),
            password: $('#tb-password').val()
        };

        _data.dataService.users.signIn(user).then(function (user) {
            document.location = '#/';
            document.location.reload(true);
        }, function (err) {
            $('#container-sign-in').trigger("reset");
            toastr.error(err.responseJSON);
        });
    }

    return {
        all: all,
        register: register,
        signOut: signOut,
        signIn: signIn
    };
}();

exports.usersController = usersController;
//# sourceMappingURL=users-controller.js.map