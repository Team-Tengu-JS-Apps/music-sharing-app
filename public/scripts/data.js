import {jsonRequester} from 'requester';

const dataService = (function () {
    const USERNAME_KEY = 'signed-in-user-username';
    const AUTH_KEY = 'signed-in-user-auth-key';
    const YT_DATA_API_KEY = `AIzaSyD1eKGLdYJkdiBntvU5nR2zOd8K-y6M2O8`;

    /* Users */

    function register(user) {
        const reqUser = {
            username: user.username,
            passHash: sha1(user.username + user.password).toString()
        };

        return jsonRequester.post('api/users', {
            data: reqUser
        })
            .then(function (resp) {
                const user = resp.result;
                localStorage.setItem(USERNAME_KEY, user.username);
                localStorage.setItem(AUTH_KEY, user.authKey);
                return {
                    username: resp.result.username
                };
            });
    }

    function signIn(user) {
        const reqUser = {
            username: user.username,
            passHash: sha1(user.username + user.password).toString()
        };

        const options = {
            data: reqUser
        };

        return jsonRequester.put('api/users/auth', options)
            .then(function (resp) {
                const user = resp.result;
                localStorage.setItem(USERNAME_KEY, user.username);
                localStorage.setItem(AUTH_KEY, user.authKey);
                return user;
            });
    }

    function signOut() {
        return Promise.resolve()
            .then(() => {
                localStorage.removeItem(USERNAME_KEY);
                localStorage.removeItem(AUTH_KEY);
            });
    }

    function hasUser() {
        return !!localStorage.getItem(USERNAME_KEY) &&
            !!localStorage.getItem(AUTH_KEY);
    }

    function getUsers() {
        return jsonRequester.get('api/users')
            .then(function (resp) {
                return resp.result;
            });
    }

    /* Songs */

    function getSongs() {
        const options = {
            headers: {
                'x-auth-key': localStorage.getItem(AUTH_KEY)
            }
        };
        return jsonRequester.get('api/songs', options)
            .then(function (resp) {
                return resp.result;
            });
    }

    function addSong(song) {
        const options = {
            data: song,
            headers: {
                'x-auth-key': localStorage.getItem(AUTH_KEY)
            }
        };

        return jsonRequester.post('api/songs', options)
            .then(function (resp) {
                return resp.result;
            });
    }

    function getAllSongs() {
        const options = {
            headers: {
                'x-auth-key': localStorage.getItem(AUTH_KEY)
            }
        };

        return jsonRequester.get('api/songs/all', options)
            .then(function (resp) {
                return resp.result;
            });
    }

    /*YouTube queries*/

    function query(id) {
        const requestURL = `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${id}&key=${YT_DATA_API_KEY}`;
        return jsonRequester.get(requestURL);
    }

    /*Tests*/

    function getById(id) {
        const options = {
            headers: {
                'x-auth-key': localStorage.getItem(AUTH_KEY)
            }
        };

        return jsonRequester.get('api/songs/' + id, options)
            .then(function (resp) {
                return resp.result;
            });
    }

    function deleteById(id) {
        const options = {
            data: {
                id: id,
                delete: true
            },
            headers: {
                'x-auth-key': localStorage.getItem(AUTH_KEY)
            }
        };

        return jsonRequester.delete('api/songs', options)
            .then(function (resp) {
                return resp.result;
            });
    }

    function getComments(id) {
        const options = {
            data: {
                id: id,
                comments: true
            },
            headers: {
                'x-auth-key': localStorage.getItem(AUTH_KEY)
            }
        };

        return jsonRequester.post('api/songs', options)
            .then(function (resp) {
                return resp.result;
            });
    }

    function postComment(id, text) {
        const options = {
            data: {
                id: id,
                comment: text || ''
            },
            headers: {
                'x-auth-key': localStorage.getItem(AUTH_KEY)
            }
        };

        return jsonRequester.post('api/songs', options)
            .then(function (resp) {
                return resp.result;
            });
    }

    function rateSong(id, stars) {
        const options = {
            data: {
                id: id,
                stars: +stars || 0
            },
            headers: {
                'x-auth-key': localStorage.getItem(AUTH_KEY)
            }
        };

        return jsonRequester.post('api/songs', options)
            .then(function (resp) {
                return resp.result;
            });
    }

    function getTopSongs(count) {
        const options = {
            headers: {
                'x-auth-key': localStorage.getItem(AUTH_KEY)
            }
        };

        return jsonRequester.get('api/songs/top/' + count, options)
            .then(function (resp) {
                return resp.result;
            });
    }

    return {
        users: {
            signIn,
            signOut,
            register,
            hasUser,
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
          query
        },
        tests: {
            get: getById,
            del: deleteById,
            comments: getComments,
            comment: postComment,
            rate: rateSong
        }
    };
}());

export {dataService};