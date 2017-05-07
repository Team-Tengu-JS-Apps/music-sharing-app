const controllerHelpers = function () {
    function parseIdFromYoutubeURL(url) {
        url = url || '';
        return url.split('v=').pop();
    }

    function evaluateUnderdogStatus(resp) {
        return true;
    }

    return {
        parseIdFromYoutubeURL,
        evaluateUnderdogStatus
    };
}();

export {controllerHelpers};