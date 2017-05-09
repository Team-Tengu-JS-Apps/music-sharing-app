class TenguEmbed extends HTMLElement {
    constructor() {
        // Always call super first in constructor
        super();

        const loading = `<i class="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i>
                            <span class="sr-only">Loading...</span>`;

        // Create a shadow root
        this._shadow = this.attachShadow({mode: 'open'});

        // Add the image to the shadow root.
        this._shadow.appendChild(loading);
    }

    connectedCallback() {
        templateLoader.get(`tengu-embed`)
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

    disconnectedCallback() {
    }

    attributeChangedCallback(attr, oldVal, newVal) {
        /*if (attr === `tengu-logo`) {
         template(`tengu-logo`);
         } else if () {

         }*/
    }
}

customElements.define("tengu-embed", TenguEmbed);
