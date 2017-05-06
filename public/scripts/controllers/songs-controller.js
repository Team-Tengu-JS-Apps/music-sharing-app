import {controllerHelpers} from 'controller-helpers';
import {dataService} from 'data';
import {templateLoader} from 'templates';

const songsController = (function () {

    function get(context) {
        let result = {};
        dataService.songs.get()
            .then(function (resp) {
                console.log(resp);
                result.all = resp;
                return templateLoader.get('songs-user');
            })
            .then(function (template) {
                context.$element().html(template(result));
            })
            .catch(function (err) {
                toastr.error(err.responseJSON);
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
                toastr.error(err.responseJSON);
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
                $('#btn-song-add').on('click', function () {
                    const song = {
                        title: $('#tb-song-title').val(),
                        url: $('#tb-song-url').val(),
                        description: $('#tb-song-description').val()
                    };

                    dataService.songs.add(song)
                        .then(function (resp) {
                            toastr.success(`Song "${song.title}" added!`);
                            context.redirect('#/songs');
                        });
                });
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
                toastr.error(err.responseJSON);
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
                toastr.error(err.responseJSON);
            });
    }

    function comments(context) {
        let result = {};
        const url = window.location.href;
        const urlParts = url.split('/');
        const id = urlParts[urlParts.length - 2];
        dataService.tests.comments(id)
            .then(function (resp) {
                result.all = JSON.stringify(resp);
                return templateLoader.get('tests');
            })
            .then(function (template) {
                context.$element().html(template(result));
            })
            .catch(function (err) {
                toastr.error(err.responseJSON);
            });
    }

    function comment(context) {
        let result = {};
        const url = window.location.href;
        const urlParts = url.split('/');
        const id = urlParts[urlParts.length - 2];
        dataService.tests.comment(id, "Fake Comment")
            .then(function (resp) {
                result.all = JSON.stringify(resp);
                return templateLoader.get('tests');
            })
            .then(function (template) {
                context.$element().html(template(result));
            })
            .catch(function (err) {
                toastr.error(err.responseJSON);
            });
    }

    return {
        get: get,
        all: all,
        add: add,
        byId: byId,
        del: del,
        comments: comments,
        comment: comment
    };
}());

export {songsController};
