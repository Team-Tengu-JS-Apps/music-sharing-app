import {jsonRequester} from 'requester';

const dataService = (function () {
    const USERNAME_KEY = 'signed-in-user-username',
        AUTH_KEY = 'signed-in-user-auth-key';

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

    /* Videos */
    function getVideos() {
        const options = {
            headers: {
                'x-auth-key': localStorage.getItem(AUTH_KEY)
            }
        };
        return jsonRequester.get('api/videos', options)
            .then(function (resp) {
                return resp.result;
            });
    }

    function addVideo(video) {
        const options = {
            data: video,
            headers: {
                'x-auth-key': localStorage.getItem(AUTH_KEY)
            }
        };

        return jsonRequester.post('api/videos', options)
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
        videos: {
            get: getVideos,
            add: addVideo
        }
    };
}());

export { dataService };