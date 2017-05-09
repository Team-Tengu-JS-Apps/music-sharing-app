"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var templateLoader = function () {
    var templatesCache = {};

    function get(templateName) {
        return new Promise(function (resolve, reject) {
            if (templatesCache[templateName]) {
                resolve(Handlebars.compile(templatesCache[templateName]));
            }

            $.get("./templates/" + templateName + ".handlebars", function (template) {
                templatesCache[templateName] = template;
                resolve(Handlebars.compile(template));
            });
        });
    }

    return { get: get };
}();

exports.templateLoader = templateLoader;
//# sourceMappingURL=templates.js.map