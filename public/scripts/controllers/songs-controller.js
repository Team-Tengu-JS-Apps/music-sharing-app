import {controllerHelpers} from 'controller-helpers';
import {dataService} from 'data';
import {templateLoader} from 'templates';

const songsController = (function () {

    function all(context) {
        let result = {};
        const category = context.params.category || null;
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
                toastr.error(err.message);
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

    return {
        all: all,
        add: add
    };
}());

export {songsController};
