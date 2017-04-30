import {controllerHelpers} from 'controller-helpers';
import {dataService} from 'data';
import {templateLoader} from 'templates';

const videosController = (function () {

    function all(context) {
        let videos;
        const category = context.params.category || null;
        dataService.videos.get()
            .then(function (resVideos) {
                videos = _.chain(resVideos)
                    .groupBy(controllerHelpers.groupByCategory)
                    .map(controllerHelpers.parseGroups).value();

                return templateLoader.get('videos');
            })
            .then(function (template) {
                context.$element().html(template(videos));
            })
            .catch(function (err) {
                toastr.error(err.message);
            });
    }

    function add(context) {
        templateLoader.get('videos-add')
            .then(function (template) {
                context.$element()
                    .html(template());
                return Promise.resolve(true);
            })
            .then(function () {
                $('#btn-video-add').on('click', function () {
                    const video = {
                        title: $('#tb-video-title').val(),
                        url: $('#tb-video-url').val(),
                        description: $('#tb-video-description').val()
                    };

                    dataService.videos.add(video)
                        .then(function (resp) {
                            toastr.success(`Video "${video.title}" added!`);
                            context.redirect('#/videos');
                        });
                });
            });
    }

    return {
        all: all,
        add: add
    };
}());

export {videosController};
