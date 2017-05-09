describe('- Tests of data.js', () => {

  // const LOCAL_STORAGE_USERNAME_KEY = 'signed-in-user-username',
  //   LOCAL_STORAGE_AUTHKEY_KEY = 'signed-in-user-auth-key';

  // const clearLocalStorage = () => {
  //   localStorage.removeItem(LOCAL_STORAGE_USERNAME_KEY);
  //   localStorage.removeItem(LOCAL_STORAGE_AUTHKEY_KEY);
  // };

  // beforeEach(clearLocalStorage);
  // afterEach(clearLocalStorage);

  describe('- User Тests', () => {
    const user = {
      username: 'TestUser',
      password: 'TestPassword'
    };
    const response = {
      result: {
        username: user.username,
        authKey: 'SOME_AUTH_KEY'
      }
    };
    const passHash = 'SOME_PASS_HASH';

    describe('- Registration Tests', () => {
      function arrange() {
        let jsonRequesterPostStub = sinon.stub(jsonRequester, 'post');
        let cryptoJSStub = sinon.stub(CryptoJS, 'SHA1')
          .returns(passHash);
      };

      it('Expect register function to return a Promise:', () => {
        arrange();

        jsonRequesterPostStub.returns(Promise.resolve(response));

        const promise = data.users.register(user);
        expect(promise).to.be.an.instanceof(Promise);
      });

      it('Expect register to make a call to CryptoJS.SHA1() once:', (done) => {
        arrange();

        jsonRequesterPostStub.returns(Promise.resolve(response));

        data.users.register(user)
          .then(() => {
            expect(cryptoJSStub).to.have.been.calledOnce;
          })
          .then(done, done);
      });

      it('Expect register to make a call to CryptoJS.SHA1() with the correct parameters:', (done) => {
        arrange();

        jsonRequesterPostStub.returns(Promise.resolve(response));

        data.users.register(user)
          .then(() => {
            expect(cryptoJSStub).to.have.been.calledWith(user.username + user.password);
          })
          .then(done, done);
      });

      it('Expect register to make a \'POST\' request:', (done) => {
        arrange();

        jsonRequesterPostStub.returns(Promise.resolve(response));

        data.users.register(user)
          .then(() => {
            expect(jsonRequesterPostStub).to.have.been.calledOnce();
          })
          .then(done, done);
      });

      it('Expect register to make a \'POST\' request to api/users:', (done) => {
        arrange();

        jsonRequesterPostStub.returns(Promise.resolve(response));

        data.users.register(user)
          .then(() => {
            expect(jsonRequesterPostStub).to.have.been.calledWith('api/users');
          })
          .then(done, done);
      });

      it('Expect register to make a \'POST\' request with user data - \"username\":', (done) => {
        arrange();

        jsonRequesterPostStub.returns(Promise.resolve(response));

        data.users.register(user)
          .then(() => {
            const expected = {
              data: {
                username: user.username
              }
            };
            expect(jsonRequesterPostStub.args[0][1].data.username).to.equal(user.username);
          })
          .then(done, done);
      });

      it('Expect register to make a \'POST\' request with user data - \"passHash\":', (done) => {
        arrange();

        jsonRequesterPostStub.returns(Promise.resolve(response));

        data.users.register(user)
          .then(() => {
            const expected = {
              data: {
                username: user.username
              }
            };
            expect(jsonRequesterPostStub.args[0][1].data.passHash).to.equal(passHash);
          })
          .then(done, done);
      });

      it('Expect register function to return a Promise which resolves with the registered username:', (done) => {
        arrange();

        jsonRequesterPostStub.returns(Promise.resolve(response));

        data.users.register(user)
          .then((value) => {
            const expected = {
              username: user.username
            };

            expect(value).to.deep.equal(expected);
          })
          .then(done, done);
      });
    });

    describe('- Login Tests', () => {
      function arrange() {
        let jsonRequesterPostStub = sinon.stub(jsonRequester, 'put');
        let cryptoJSStub = sinon.stub(CryptoJS, 'SHA1')
          .returns(passHash);
      };

      it('Expect login function to return a Promise:', () => {
        arrange();

        jsonRequesterPutStub.returns(Promise.resolve(response));

        const promise = data.users.signIn(user);
        expect(promise).to.be.an.instanceof(Promise);
      });

      it('Expect login to make a call to CryptoJS.SHA1() once:', (done) => {
        arrange();

        jsonRequesterPutStub.returns(Promise.resolve(response));

        data.users.signIn(user)
          .then(() => {
            expect(cryptoJSStub).to.have.been.calledOnce;
          })
          .then(done, done);
      });

      it('Expect login to make a call to CryptoJS.SHA1() with the correct parameters:', (done) => {
        arrange();

        jsonRequesterPutStub.returns(Promise.resolve(response));

        data.users.signIn(user)
          .then(() => {
            expect(cryptoJSStub).to.have.been.calledWith(user.username + user.password);
          })
          .then(done, done);
      });

      it('Expect login to make a \'PUT\' request:', (done) => {
        arrange();

        jsonRequesterPutStub.returns(Promise.resolve(response));

        data.users.signIn(user)
          .then(() => {
            expect(jsonRequesterPutStub).to.have.been.calledOnce;
          })
          .then(done, done);
      });

      it('Expect login to make a \'PUT\' request to api/users/auth:', (done) => {
        arrange();

        jsonRequesterPutStub.returns(Promise.resolve(response));

        data.users.signIn(user)
          .then(() => {
            expect(jsonRequesterPutStub).to.have.been.calledWith('api/users/auth');
          })
          .then(done, done);
      });

      it('Expect login to make a \'PUT\' request with user data \"username\":', (done) => {
        arrange();

        jsonRequesterPutStub.returns(Promise.resolve(response));

        data.users.signIn(user)
          .then(() => {
            const expected = {
              data: {
                username: user.username
              }
            };
            expect(jsonRequesterPutStub.args[0][1].data.username).to.equal(user.username);
          })
          .then(done, done);
      });

      it('Expect login to make a \'PUT\' request with user data \"passHash\":', (done) => {
        arrange();

        jsonRequesterPutStub.returns(Promise.resolve(response));

        data.users.signIn(user)
          .then(() => {
            const expected = {
              data: {
                username: user.username
              }
            };
            expect(jsonRequesterPutStub.args[0][1].data.passHash).to.equal(passHash);
          })
          .then(done, done);
      });

      it('Expect login function to return a Promise which resolves with the registered username:', (done) => {
        arrange();

        jsonRequesterPutStub.returns(Promise.resolve(response));

        data.users.signIn(user)
          .then((value) => {
            const expected = {
              username: user.username,
              authKey: response.result.authKey
            };

            expect(value).to.deep.equal(expected);
          })
          .then(done, done);
      });
    });

    describe('- Logout Tests', () => {
      it('Expect logout function to return a Promise:', () => {
        const promise = data.users.signOut();
        expect(promise).to.be.an.instanceof(Promise);
      });
    });

    describe('- \'hasUser()\' Tests', () => {
      it('Expect \'hasUser()\' to return false when no one is logged in:', () => {
        expect(data.users.hasUser()).to.be.false;
      });
    });

    describe('- \'getUsers()\' Tests', () => {
      function arrange() {
        let jsonRequesterGetStub = sinon.stub(jsonRequester, 'get')
          .returns(Promise.resolve({ result: 'ARRAY' }));
      };

      it('expect \'getUsers()\' funtion to return a Promise:', () => {
        arrange();
        
        const promise = data.users.get();
        expect(promise).to.be.an.instanceof(Promise);
      });

      it('Expect \'getUsers()\' funtion to make a \'GET\' request:', (done) => {
        arrange();

        data.users.get()
          .then(() => {
            expect(jsonRequesterGetStub).to.have.been.calledOnce;
          })
          .then(done, done);
      });

      it('Expect \'getUsers()\' funtion to make a \'GET\' request to api/users:', (done) => {
        arrange();

        data.users.get()
          .then(() => {
            expect(jsonRequesterGetStub).to.have.been.calledWith('api/users');
          })
          .then(done, done);
      });

      it('Expect \'getUsers()\' funtion to return the users array:', (done) => {
        arrange();
        
        data.users.get()
          .then((users) => {
            expect(users).to.equal('ARRAY');
          })
          .then(done, done);
      });
    });
  });
});