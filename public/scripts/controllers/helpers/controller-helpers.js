const controllerHelpers = function () {
    const MIN_VALUE_VIEWS_LOW = 500000;
    const MAX_VALUE_VIEWS_LOW = 1000000;
    const MIN_VALUE_LIKES_LOW = 500;
    const MAX_VALUE_LIKES_LOW = 1000;
    const MIN_VALUE_VIEWS_MEDIUM = 100000;
    const MAX_VALUE_VIEWS_MEDIUM = MIN_VALUE_VIEWS_LOW;
    const MIN_VALUE_LIKES_MEDIUM = 100;
    const MAX_VALUE_LIKES_MEDIUM = MIN_VALUE_LIKES_LOW;
    const MAX_VALUE_VIEWS_HIGH = MIN_VALUE_VIEWS_MEDIUM;
    const MAX_VALUE_LIKES_HIGH = MIN_VALUE_LIKES_MEDIUM;

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
        if (typeof resp !== 'object' || !resp.items){
            throw Error('Failed to evaluate the Underdog status');
        }

        const stats = resp.items[0].statistics;
        const viewCount = +stats.viewCount;
        const likeCount = +stats.likeCount;

        const result = {};
        if ((viewCount > MIN_VALUE_VIEWS_LOW && viewCount < MAX_VALUE_VIEWS_LOW) ||
            (likeCount > MIN_VALUE_LIKES_LOW && likeCount < MAX_VALUE_LIKES_LOW)) {
            result.underdogStatus = underdogStatus.LOW;
        }

        if ((viewCount > MIN_VALUE_VIEWS_MEDIUM && viewCount <= MAX_VALUE_VIEWS_MEDIUM) ||
            (likeCount > MIN_VALUE_LIKES_MEDIUM && likeCount <= MAX_VALUE_LIKES_MEDIUM)) {
            result.underdogStatus = underdogStatus.MEDIUM;
        }

        if (viewCount <= MAX_VALUE_VIEWS_HIGH || likeCount <= MAX_VALUE_LIKES_HIGH) {
            result.underdogStatus = underdogStatus.HIGH;
        }

        return result;
    }

    function convertSrcToEmbed(url) {
        const id = parseIdFromYoutubeURL(url);
        return `//www.youtube.com/embed/${id}`;
    }

    return {
        parseIdFromYoutubeURL,
        evaluateUnderdogStatus,
        convertSrcToEmbed
    };
}();

export {controllerHelpers};