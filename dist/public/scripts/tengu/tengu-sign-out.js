'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TenguSignOut = function (_HTMLElement) {
    _inherits(TenguSignOut, _HTMLElement);

    function TenguSignOut() {
        _classCallCheck(this, TenguSignOut);

        var _this = _possibleConstructorReturn(this, (TenguSignOut.__proto__ || Object.getPrototypeOf(TenguSignOut)).call(this));
        // Always call super first in constructor


        var loading = '<i class="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i>\n                            <span class="sr-only">Loading...</span>';

        // Create a shadow root
        _this._shadow = _this.attachShadow({ mode: 'open' });

        // Add the image to the shadow root.
        _this._shadow.appendChild(loading);
        return _this;
    }

    _createClass(TenguSignOut, [{
        key: 'connectedCallback',
        value: function connectedCallback() {
            templateLoader.get('tengu-sign-out').then(function (template) {
                return new Promise(function (resolve, reject) {
                    setTimeout(function () {
                        resolve(template);
                    }, 500);
                });
            }).then(function (template) {
                _shadow.appendChild(template());
            }).catch(function (err) {
                toastr.error('Oops, something happened.');
            });
        }
    }, {
        key: 'disconnectedCallback',
        value: function disconnectedCallback() {}
    }, {
        key: 'attributeChangedCallback',
        value: function attributeChangedCallback(attr, oldVal, newVal) {
            /*if (attr === `tengu-logo`) {
             template(`tengu-logo`);
             } else if () {
               }*/
        }
    }]);

    return TenguSignOut;
}(HTMLElement);

customElements.define("tengu-sign-out", TenguSignOut);
//# sourceMappingURL=tengu-sign-out.js.map