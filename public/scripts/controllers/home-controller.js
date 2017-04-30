import {templateLoader} from 'templates';

const homeController = function () {

    function all(context) {
        templateLoader.get('home')
            .then(function (template) {
                context.$element().html(template());
            });
    }

    return {
        all: all
    };
}();

export {homeController};