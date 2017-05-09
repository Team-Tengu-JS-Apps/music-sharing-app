'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.dataService = undefined;

var _requester = require('requester');

var dataService = function () {
    var USERNAME_KEY = 'signed-in-user-username';
    var AUTH_KEY = 'signed-in-user-auth-key';
    var YT_DATA_API_KEY = 'AIzaSyD1eKGLdYJkdiBntvU5nR2zOd8K-y6M2O8';

    /* Users */

    function register(user) {
        var reqUser = {
            username: user.username,
            passHash: sha1(user.username + user.password).toString()
        };

        return _requester.jsonRequester.post('api/users', {
            data: reqUser
        }).then(function (resp) {
            var user = resp.result;
            localStorage.setItem(USERNAME_KEY, user.username);
            localStorage.setItem(AUTH_KEY, user.authKey);
            return {
                username: resp.result.username
            };
        });
    }

    function signIn(user) {
        var reqUser = {
            username: user.username,
            passHash: sha1(user.username + user.password).toString()
        };

        var options = {
            data: reqUser
        };

        return _requester.jsonRequester.put('api/users/auth', options).then(function (resp) {
            var user = resp.result;
            localStorage.setItem(USERNAME_KEY, user.username);
            localStorage.setItem(AUTH_KEY, user.authKey);
            return user;
        });
    }

    function signOut() {
        return Promise.resolve().then(function () {
            localStorage.removeItem(USERNAME_KEY);
            localStorage.removeItem(AUTH_KEY);
        });
    }

    function hasUser() {
        return !!localStorage.getItem(USERNAME_KEY) && !!localStorage.getItem(AUTH_KEY);
    }

    function getUsers() {
        return _requester.jsonRequester.get('api/users').then(function (resp) {
            return resp.result;
        });
    }

    /* Songs */

    function getSongs() {
        var options = {
            headers: {
                'x-auth-key': localStorage.getItem(AUTH_KEY)
            }
        };
        return _requester.jsonRequester.get('api/songs', options).then(function (resp) {
            return resp.result;
        });
    }

    function addSong(song) {
        var options = {
            data: song,
            headers: {
                'x-auth-key': localStorage.getItem(AUTH_KEY)
            }
        };

        return _requester.jsonRequester.post('api/songs', options).then(function (resp) {
            return resp.result;
        });
    }

    function getAllSongs() {
        var options = {
            headers: {
                'x-auth-key': localStorage.getItem(AUTH_KEY)
            }
        };

        return _requester.jsonRequester.get('api/songs/all', options).then(function (resp) {
            return resp.result;
        });
    }

    /*YouTube queries*/

    function query(id) {
        var requestURL = 'https://www.googleapis.com/youtube/v3/videos?part=statistics&id=' + id + '&key=' + YT_DATA_API_KEY;
        return _requester.jsonRequester.get(requestURL);
    }

    /*Tests*/

    function getById(id) {
        var options = {
            headers: {
                'x-auth-key': localStorage.getItem(AUTH_KEY)
            }
        };

        return _requester.jsonRequester.get('api/songs/' + id, options).then(function (resp) {
            return resp.result;
        });
    }

    function deleteById(id) {
        var options = {
            data: {
                id: id,
                delete: true
            },
            headers: {
                'x-auth-key': localStorage.getItem(AUTH_KEY)
            }
        };

        return _requester.jsonRequester.delete('api/songs', options).then(function (resp) {
            return resp.result;
        });
    }

    function getComments(id) {
        var options = {
            data: {
                id: id,
                comments: true
            },
            headers: {
                'x-auth-key': localStorage.getItem(AUTH_KEY)
            }
        };

        return _requester.jsonRequester.post('api/songs', options).then(function (resp) {
            return resp.result;
        });
    }

    function postComment(id, text) {
        var options = {
            data: {
                id: id,
                comment: text || ''
            },
            headers: {
                'x-auth-key': localStorage.getItem(AUTH_KEY)
            }
        };

        return _requester.jsonRequester.post('api/songs', options).then(function (resp) {
            return resp.result;
        });
    }

    function rateSong(id, stars) {
        var options = {
            data: {
                id: id,
                stars: +stars || 0
            },
            headers: {
                'x-auth-key': localStorage.getItem(AUTH_KEY)
            }
        };

        return _requester.jsonRequester.post('api/songs', options).then(function (resp) {
            return resp.result;
        });
    }

    function getTopSongs(count) {
        var options = {
            headers: {
                'x-auth-key': localStorage.getItem(AUTH_KEY)
            }
        };

        return _requester.jsonRequester.get('api/songs/top/' + count, options).then(function (resp) {
            return resp.result;
        });
    }

    return {
        users: {
            signIn: signIn,
            signOut: signOut,
            register: register,
            hasUser: hasUser,
            get: getUsers
        },
        songs: {
            get: getSongs,
            all: getAllSongs,
            add: addSong,
            getTop: getTopSongs,
            comments: getComments,
            comment: postComment,
            rate: rateSong
        },
        ytData: {
            query: query
        },
        tests: {
            get: getById,
            del: deleteById,
            comments: getComments,
            comment: postComment,
            rate: rateSong
        }
    };
}();

exports.dataService = dataService;
//# sourceMappingURL=data.js.map