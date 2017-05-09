'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var controllerHelpers = function () {
    var MIN_VALUE_VIEWS_LOW = 500000;
    var MAX_VALUE_VIEWS_LOW = 1000000;
    var MIN_VALUE_LIKES_LOW = 500;
    var MAX_VALUE_LIKES_LOW = 1000;
    var MIN_VALUE_VIEWS_MEDIUM = 100000;
    var MAX_VALUE_VIEWS_MEDIUM = MIN_VALUE_VIEWS_LOW;
    var MIN_VALUE_LIKES_MEDIUM = 100;
    var MAX_VALUE_LIKES_MEDIUM = MIN_VALUE_LIKES_LOW;
    var MAX_VALUE_VIEWS_HIGH = MIN_VALUE_VIEWS_MEDIUM;
    var MAX_VALUE_LIKES_HIGH = MIN_VALUE_LIKES_MEDIUM;

    var underdogStatus = {
        LOW: 1,
        MEDIUM: 2,
        HIGH: 3
    };

    function parseIdFromYoutubeURL(url) {
        url = url || '';
        return url.split('v=').pop();
    }

    function evaluateUnderdogStatus(resp) {
        if ((typeof resp === 'undefined' ? 'undefined' : _typeof(resp)) !== 'object' || !resp.items) {
            throw Error('Failed to evaluate the Underdog status');
        }

        var stats = resp.items[0].statistics;
        var viewCount = +stats.viewCount;
        var likeCount = +stats.likeCount;

        var result = {};
        if (viewCount > MIN_VALUE_VIEWS_LOW && viewCount < MAX_VALUE_VIEWS_LOW || likeCount > MIN_VALUE_LIKES_LOW && likeCount < MAX_VALUE_LIKES_LOW) {
            result.underdogStatus = underdogStatus.LOW;
        }

        if (viewCount > MIN_VALUE_VIEWS_MEDIUM && viewCount <= MAX_VALUE_VIEWS_MEDIUM || likeCount > MIN_VALUE_LIKES_MEDIUM && likeCount <= MAX_VALUE_LIKES_MEDIUM) {
            result.underdogStatus = underdogStatus.MEDIUM;
        }

        if (viewCount <= MAX_VALUE_VIEWS_HIGH || likeCount <= MAX_VALUE_LIKES_HIGH) {
            result.underdogStatus = underdogStatus.HIGH;
        }

        return result;
    }

    function convertSrcToEmbed(url) {
        var id = parseIdFromYoutubeURL(url);
        return '//www.youtube.com/embed/' + id;
    }

    return {
        parseIdFromYoutubeURL: parseIdFromYoutubeURL,
        evaluateUnderdogStatus: evaluateUnderdogStatus,
        convertSrcToEmbed: convertSrcToEmbed
    };
}();

exports.controllerHelpers = controllerHelpers;
//# sourceMappingURL=controller-helpers.js.map