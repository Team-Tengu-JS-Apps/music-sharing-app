import {templateLoader} from 'templates';

class TenguLogo extends HTMLElement {
    get open() {
        return this.hasAttribute("open");
    }

    set open(val) {
        val ? this.setAttribute("open", '') : this.removeAttribute('open');
    }

    get disabled() {
        return this.hasAttribute("disabled");
    }

    set disabled(val) {
        val ? this.setAttribute("disabled", '') : this.removeAttribute('disabled');
    }

    static get observedAttributes() { return ["open"] };

    constructor() {
        // Always call super first in constructor
        super();

        const loading = `<i class="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i>
                            <span class="sr-only">Loading...</span>`;

        // Create a shadow root
        _shadow = this.attachShadow({mode: 'open'});

        // Add the image to the shadow root.
        _shadow.appendChild(loading);
    }

    connectedCallback() {

    }

    disconnectedCallback() {
    }

    attributeChangedCallback(attr, oldVal, newVal) {
        if (this.tengu-logo) {

        }

    }

    template(name) {
        templateLoader.get(name)
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
            });
    }
}

customElements.define("tengu-logo", TenguLogo);