import {controllerHelpers} from 'controller-helpers';
import {dataService} from 'data';
import {templateLoader} from 'templates';

const songsController = (function () {
    const ERROR_MESSAGE = 'Oops! Something went wrong.';

    function get(context) {
        let result = {};
        dataService.songs.get()
            .then(function (resp) {
                result.all = resp;
                return templateLoader.get('songs-user');
            })
            .then(function (template) {
                context.$element().html(template(result));
            })
            .catch(function (err) {
                toastr.error(err.responseJSON || ERROR_MESSAGE);
            });
    }

    function all(context) {
        let result = {};
        dataService.songs.all()
            .then(function (resp) {
                let songs = resp.reduce((arr, x) => x.concat(arr), []);
                songs = _.shuffle(songs);
                result.all = songs;
                return templateLoader.get('songs');
            })
            .then(function (template) {
                context.$element().html(template(result));
            })
            .catch(function (err) {
                toastr.error(err.responseJSON || ERROR_MESSAGE);
            });
    }

    function add(context) {
        templateLoader.get('song-add')
            .then(function (template) {
                context.$element()
                    .html(template());
                return Promise.resolve();
            })
            .then(function () {
                $('#add-song-form')
                    .bootstrapValidator({
                        live: 'enabled',
                        trigger: null
                    });
                $('#btn-song-add').on('click', function (event) {
                    const bootstrapValidator = $("#add-song-form").data('bootstrapValidator');

                    if (!bootstrapValidator.isValid()) {
                        toastr.warning(`Unable to send form data!`);
                        return;
                    }

                    context.redirect('#/songs/add/query');
                });


            })
            .catch(function (err) {
                toastr.error(err.responseJSON || ERROR_MESSAGE);
            });
    }

    function byId(context) {
        let result = {};
        const url = window.location.href;
        const id = url.substring(url.lastIndexOf('/') + 1);
        dataService.tests.get(id)
            .then(function (resp) {
                result.all = JSON.stringify(resp);
                return templateLoader.get('tests');
            })
            .then(function (template) {
                context.$element().html(template(result));
            })
            .catch(function (err) {
                toastr.error(err.responseJSON || ERROR_MESSAGE);
            });
    }

    function del(context) {
        let result = {};
        const url = window.location.href;
        const urlParts = url.split('/');
        const id = urlParts[urlParts.length - 2];
        dataService.tests.del(id)
            .then(function (resp) {
                result.all = JSON.stringify(resp);
                return templateLoader.get('tests');
            })
            .then(function (template) {
                context.$element().html(template(result));
            })
            .catch(function (err) {
                toastr.error(err.responseJSON || ERROR_MESSAGE);
            });
    }

    function comments(context) {
        let result = {};
        const url = window.location.href;
        const urlParts = url.split('/');
        const id = urlParts[urlParts.length - 2];

        dataService.songs.comments(id)
            .then(function (resp) {
                if (resp.length === 0) {
                    resp = resp.concat(['Be the first to leave a comment', 'Sorry, no comment', 'First fake comment']);
                }
                result.id = id;
                result.all = resp;
                return templateLoader.get('songs-aside');
            })
            .then(function (template) {
                const aside = context.$element()
                    .closest('.container')
                    .find('#right');
                aside.html(template(result));
            })
            .then(function () {
                $(".dropdown-toggle").dropdown();
                $('.carousel').carousel();
                $('.dropdown-menu').on('click', 'a', function (event) {
                    const $target = $(event.target);
                    $('.stars-to-award').html($target.html());
                });
                $('#rate-song').on('click', function (event) {
                    if ($(event.currentTarget).is(':checked')) {
                        const stars = $('.stars-to-award').html();
                        dataService.songs.rate(id, +stars)
                            .then(function (template) {
                                toastr.success(`${stars} stars awarded to song`);
                            })
                            .catch(function (err) {
                                toastr.error(err.responseJSON || ERROR_MESSAGE);
                            });
                    }
                });
            })
            .catch(function (err) {
                toastr.error(err.responseJSON || ERROR_MESSAGE);
            });
    }

    function comment(context) {
        const url = window.location.href;
        const urlParts = url.split('/');
        const id = urlParts[urlParts.length - 2];

        const $commentBox = $('.tb-comment');
        if (!$commentBox.length) {
            toastr.error("Unable to add a comment");
            return;
        }

        const comment = $('<div/>').text($commentBox.val()).html();

        dataService.songs.comment(id, comment)
            .then(function (resp) {
                toastr.success("Comment added successfully!");
                context.redirect(`#/songs/${id}/comments`);
            })
            .catch(function (err) {
                toastr.error(err.responseJSON || ERROR_MESSAGE);
            });
    }

    function rate(context) {
        let result = {};
        const url = window.location.href;
        const urlParts = url.split('/');
        const id = urlParts[urlParts.length - 2];
        dataService.tests.rate(id, 1)
            .then(function (resp) {
                result.all = JSON.stringify(resp);
                return templateLoader.get('tests');
            })
            .then(function (template) {
                context.$element().html(template(result));
            })
            .catch(function (err) {
                toastr.error(err.responseJSON || ERROR_MESSAGE);
            });
    }

    function getTop(context) {
        let result = {};
        const url = window.location.href;
        const count = url.substring(url.lastIndexOf('/') + 1);
        dataService.songs.getTop(count)
            .then(function (resp) {
                let songs = resp;
                result.all = songs;
                return templateLoader.get('songs');
            })
            .then(function (template) {
                context.$element().html(template(result));
            })
            .catch(function (err) {
                toastr.error(err.responseJSON || ERROR_MESSAGE);
            });
    }

    function embed(url) {
        const $embedContainer = $('.embed-container');
        templateLoader.get('songs-embed')
            .then(function (template) {
                $embedContainer.addClass('loader');
                $embedContainer.html(template({url: url}));

                return new Promise(function (resolve, reject) {
                    setTimeout(function () {
                        resolve();
                    }, 2000);
                });
            })
            .then(function () {
                $embedContainer.removeClass('loader');
            })
            .catch(function (err) {
                toastr.error('Unable to embed video');
            });
    }

    return {
        get: get,
        all: all,
        add: add,
        byId: byId,
        del: del,
        comments: comments,
        comment: comment,
        rate: rate,
        top: getTop,
        embed: embed
    };
}());

export {songsController};
