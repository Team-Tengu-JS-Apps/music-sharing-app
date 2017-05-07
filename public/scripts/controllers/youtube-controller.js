import {dataService} from 'data';
import {templateLoader} from 'templates';
import {controllerHelpers} from 'controller-helpers';

const youTubeController = function () {

    function query(context) {
        let songUrl = $('#tb-song-url').val();
        const songId = controllerHelpers.parseIdFromYoutubeURL(songUrl);

        templateLoader.get('youtube-query')
            .then(function (template) {
                context.$element().find('#content-underdog-query').html(template());
            })
            .then(function () {
                return dataService.ytData.query(songId);
            })
            .then(function (resp) {
                return new Promise(function (resolve, reject) {
                    const isValid = controllerHelpers.evaluateUnderdogStatus(resp);
                    return isValid ? resolve() : reject();
                });
            })
            .then(function () {
                const song = {
                    title: $('#tb-song-title').val(),
                    url: $('#tb-song-url').val(),
                    description: $('#tb-song-description').val()
                };

                dataService.songs.add(song)
                    .then(function (resp) {
                        toastr.success(`Song "${song.title}" added!`);
                        // context.redirect('#/songs');
                    });
            })
            .catch(function (err) {
                toastr.error(err.responseJSON);
            });
    }

    return {
        query
    };
}();

export {youTubeController};
