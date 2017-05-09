'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.songsController = undefined;

var _controllerHelpers = require('controller-helpers');

var _data = require('data');

var _templates = require('templates');

var songsController = function () {
    var ERROR_MESSAGE = 'Oops! Something went wrong.';

    function get(context) {
        var result = {};
        _data.dataService.songs.get().then(function (resp) {
            result.all = resp;
            return _templates.templateLoader.get('songs-user');
        }).then(function (template) {
            context.$element().html(template(result));
        }).catch(function (err) {
            toastr.error(err.responseJSON || ERROR_MESSAGE);
        });
    }

    function all(context) {
        var result = {};
        _data.dataService.songs.all().then(function (resp) {
            var songs = resp.reduce(function (arr, x) {
                return x.concat(arr);
            }, []);
            songs = _.shuffle(songs);
            result.all = songs;
            return _templates.templateLoader.get('songs');
        }).then(function (template) {
            context.$element().html(template(result));
        }).catch(function (err) {
            toastr.error(err.responseJSON || ERROR_MESSAGE);
        });
    }

    function add(context) {
        _templates.templateLoader.get('song-add').then(function (template) {
            context.$element().html(template());
            return Promise.resolve();
        }).then(function () {
            $('#add-song-form').bootstrapValidator({
                live: 'enabled',
                trigger: null
            });
            $('#btn-song-add').on('click', function (event) {
                var bootstrapValidator = $("#add-song-form").data('bootstrapValidator');

                if (!bootstrapValidator.isValid()) {
                    toastr.warning('Unable to send form data!');
                    return;
                }

                context.redirect('#/songs/add/query');
            });
        }).catch(function (err) {
            toastr.error(err.responseJSON || ERROR_MESSAGE);
        });
    }

    function byId(context) {
        var result = {};
        var url = window.location.href;
        var id = url.substring(url.lastIndexOf('/') + 1);
        _data.dataService.tests.get(id).then(function (resp) {
            result.all = JSON.stringify(resp);
            return _templates.templateLoader.get('tests');
        }).then(function (template) {
            context.$element().html(template(result));
        }).catch(function (err) {
            toastr.error(err.responseJSON || ERROR_MESSAGE);
        });
    }

    function del(context) {
        var result = {};
        var url = window.location.href;
        var urlParts = url.split('/');
        var id = urlParts[urlParts.length - 2];
        _data.dataService.tests.del(id).then(function (resp) {
            result.all = JSON.stringify(resp);
            return _templates.templateLoader.get('tests');
        }).then(function (template) {
            context.$element().html(template(result));
        }).catch(function (err) {
            toastr.error(err.responseJSON || ERROR_MESSAGE);
        });
    }

    function comments(context) {
        var result = {};
        var url = window.location.href;
        var urlParts = url.split('/');
        var id = urlParts[urlParts.length - 2];

        _data.dataService.songs.comments(id).then(function (resp) {
            if (resp.length === 0) {
                resp = resp.concat(['Be the first to leave a comment', 'Sorry, no comment', 'First fake comment']);
            }
            result.id = id;
            result.all = resp;
            return _templates.templateLoader.get('songs-aside');
        }).then(function (template) {
            var aside = context.$element().closest('.container').find('#right');
            aside.html(template(result));
        }).then(function () {
            $(".dropdown-toggle").dropdown();
            $('.carousel').carousel();
            $('.dropdown-menu').on('click', 'a', function (event) {
                var $target = $(event.target);
                $('.stars-to-award').html($target.html());
            });
            $('#rate-song').on('click', function (event) {
                if ($(event.currentTarget).is(':checked')) {
                    var stars = $('.stars-to-award').html();
                    _data.dataService.songs.rate(id, +stars).then(function (template) {
                        toastr.success(stars + ' stars awarded to song');
                    }).catch(function (err) {
                        toastr.error(err.responseJSON || ERROR_MESSAGE);
                    });
                }
            });
        }).catch(function (err) {
            toastr.error(err.responseJSON || ERROR_MESSAGE);
        });
    }

    function comment(context) {
        var url = window.location.href;
        var urlParts = url.split('/');
        var id = urlParts[urlParts.length - 2];

        var $commentBox = $('.tb-comment');
        if (!$commentBox.length) {
            toastr.error("Unable to add a comment");
            return;
        }

        var comment = $('<div/>').text($commentBox.val()).html();

        _data.dataService.songs.comment(id, comment).then(function (resp) {
            toastr.success("Comment added successfully!");
            context.redirect('#/songs/' + id + '/comments');
        }).catch(function (err) {
            toastr.error(err.responseJSON || ERROR_MESSAGE);
        });
    }

    function rate(context) {
        var result = {};
        var url = window.location.href;
        var urlParts = url.split('/');
        var id = urlParts[urlParts.length - 2];
        _data.dataService.tests.rate(id, 1).then(function (resp) {
            result.all = JSON.stringify(resp);
            return _templates.templateLoader.get('tests');
        }).then(function (template) {
            context.$element().html(template(result));
        }).catch(function (err) {
            toastr.error(err.responseJSON || ERROR_MESSAGE);
        });
    }

    function loadTop(context) {
        var result = {};
        _templates.templateLoader.get('songs-tops').then(function (template) {
            context.$element().html(template(result));
        }).catch(function (err) {
            toastr.error(err.responseJSON || ERROR_MESSAGE);
        });
    }

    function getTop(context) {
        var result = {};
        var url = window.location.href;
        var count = url.substring(url.lastIndexOf('/') + 1);
        _data.dataService.songs.getTop(count).then(function (resp) {
            var songs = resp;
            result.all = songs;
            return _templates.templateLoader.get('songs');
        }).then(function (template) {
            context.$element().html(template(result));
        }).catch(function (err) {
            toastr.error(err.responseJSON || ERROR_MESSAGE);
        });
    }

    function embed(url) {
        var $embedContainer = $('.embed-container');
        _templates.templateLoader.get('songs-embed').then(function (template) {
            $embedContainer.addClass('loader');
            $embedContainer.html(template({ url: url }));

            return new Promise(function (resolve, reject) {
                setTimeout(function () {
                    resolve();
                }, 1000);
            });
        }).then(function () {
            $embedContainer.removeClass('loader');
        }).catch(function (err) {
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
        tops: loadTop,
        embed: embed
    };
}();

exports.songsController = songsController;
//# sourceMappingURL=songs-controller.js.map