'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.youTubeController = undefined;

var _data = require('data');

var _templates = require('templates');

var _controllerHelpers = require('controller-helpers');

var youTubeController = function () {

    function query(context) {
        var songUrl = $('#tb-song-url').val();
        var songId = _controllerHelpers.controllerHelpers.parseIdFromYoutubeURL(songUrl);

        _templates.templateLoader.get('youtube-query').then(function (template) {
            context.$element().find('#content-underdog-query').html(template());
        }).then(function () {
            return _data.dataService.ytData.query(songId);
        }).then(function (resp) {
            return new Promise(function (resolve, reject) {
                // ux-driven delay :) so we can have a look at the progress bar
                setTimeout(function (x) {
                    return resolve(resp);
                }, 1000);
            });
        }).then(function (resp) {
            return new Promise(function (resolve, reject) {
                var status = _controllerHelpers.controllerHelpers.evaluateUnderdogStatus(resp).underdogStatus;
                var isValid = !!status;
                return isValid ? resolve(status) : reject('This song doesn\'t qualify as an "Underdog"');
            });
        }).then(function (stat) {
            var song = {
                title: $('#tb-song-title').val(),
                url: $('#tb-song-url').val(),
                description: $('#tb-song-description').val(),
                underdog: stat
            };

            _data.dataService.songs.add(song).then(function (resp) {
                toastr.success('Song "' + song.title + '" added. Underdog status ' + stat + '!');
                context.redirect('#/songs');
            });
        }).catch(function (err) {
            toastr.error(typeof err === 'string' ? err : err.responseJSON);
            $("#song-yt-query").hide();
        });
    }

    return {
        query: query
    };
}();

exports.youTubeController = youTubeController;
//# sourceMappingURL=youtube-controller.js.map