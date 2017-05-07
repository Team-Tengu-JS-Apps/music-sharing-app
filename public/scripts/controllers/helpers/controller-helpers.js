const controllerHelpers = function () {
    const underdogStatus = {
        LOW: 1,
        MEDIUM: 2,
        HIGH: 3
    };

    function parseIdFromYoutubeURL(url) {
        url = url || '';
        return url.split('v=').pop();
    }

    function evaluateUnderdogStatus(resp) {
        const stats = resp.items[0].statistics;
        const viewCount = +stats.viewCount;
        const likeCount = +stats.likeCount;

        const result = {};
        if ((viewCount > 500000 && viewCount < 1000000) || (likeCount > 500 && likeCount < 1000)) {
            result.underdogStatus = underdogStatus.LOW;
        }

        if ((viewCount > 100000 && viewCount <= 500000) || (likeCount > 100 && likeCount < 500)) {
            result.underdogStatus = underdogStatus.MEDIUM;
        }

        if (viewCount < 100000 || likeCount < 100) {
            result.underdogStatus = underdogStatus.HIGH;
        }

        return result;
    }

    return {
        parseIdFromYoutubeURL,
        evaluateUnderdogStatus
    };
}();

export {controllerHelpers};