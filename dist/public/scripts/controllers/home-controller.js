'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.homeController = undefined;

var _templates = require('templates');

var homeController = function () {

    function all(context) {
        _templates.templateLoader.get('home').then(function (template) {
            context.$element().html(template());
        });
    }

    return {
        all: all
    };
}();

exports.homeController = homeController;
//# sourceMappingURL=home-controller.js.map