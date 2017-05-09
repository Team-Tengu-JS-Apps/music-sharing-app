(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TenguLogo = function (_HTMLElement) {
    _inherits(TenguLogo, _HTMLElement);

    function TenguLogo() {
        _classCallCheck(this, TenguLogo);

        var _this = _possibleConstructorReturn(this, (TenguLogo.__proto__ || Object.getPrototypeOf(TenguLogo)).call(this));
        // Always call super first in constructor


        var loading = "<i class=\"fa fa-circle-o-notch fa-spin fa-3x fa-fw\"></i>\n                            <span class=\"sr-only\">Loading...</span>";

        // Create a shadow root
        var shadow = _this.attachShadow({ mode: 'open' });

        // Add the image to the shadow root.
        shadow.appendChild(loading);
        return _this;
    }

    _createClass(TenguLogo, [{
        key: "connectedCallback",
        value: function connectedCallback() {
            shadow.appendChild(loading);
            /*templateLoader.get(`tengu-logo`)
             .then(function (template) {
             return new Promise(function (resolve, reject) {
             setTimeout(function () {
             resolve(template);
             }, 500);
             });
             })
             .then(function (template) {
             _shadow.appendChild(template());
             })
             .catch(function (err) {
             toastr.error('Oops, something happened.');
             });*/
        }
    }, {
        key: "disconnectedCallback",
        value: function disconnectedCallback() {}
    }, {
        key: "attributeChangedCallback",
        value: function attributeChangedCallback(attr, oldVal, newVal) {

            /*if (attr === `tengu-logo`) {
             template(`tengu-logo`);
             } else if () {
               }*/
        }
    }]);

    return TenguLogo;
}(HTMLElement);

customElements.define("tengu-logo", TenguLogo);

},{}]},{},[1]);
