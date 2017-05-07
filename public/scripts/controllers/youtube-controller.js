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
                return new Promise((resolve, reject) => {
                    // ux-driven delay :) so we can have a look at the progress bar
                    setTimeout(x => resolve(resp), 1000);
                });
            })
            .then(function (resp) {
                return new Promise(function (resolve, reject) {
                    const status = controllerHelpers.evaluateUnderdogStatus(resp).underdogStatus;
                    const isValid = !!status;
                    return isValid ? resolve(status) : reject(`This song doesn't qualify as an "Underdog"`);
                });
            })
            .then(function (stat) {
                const song = {
                    title: $('#tb-song-title').val(),
                    url: $('#tb-song-url').val(),
                    description: $('#tb-song-description').val(),
                    underdog: stat
                };

                dataService.songs.add(song)
                    .then(function (resp) {
                        toastr.success(`Song "${song.title}" added. Underdog status ${stat}!`);
                        context.redirect('#/songs');
                    });
            })
            .catch(function (err) {
                toastr.error((typeof err === 'string') ? err : err.responseJSON);
                $("#song-yt-query").hide();
            });
    }

    return {
        query
    };
}();

export {youTubeController};
