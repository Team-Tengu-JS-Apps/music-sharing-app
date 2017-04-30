SystemJS.config({
    // tell SystemJS which transpiler to use
    transpiler: 'plugin-babel',
    // tell SystemJS where to look for the dependencies
    map: {
        'plugin-babel':
            './node_modules/systemjs-plugin-babel/plugin-babel.js',
        'systemjs-babel-build':
            './node_modules/systemjs-plugin-babel/systemjs-babel-browser.js',
        // app start script
        'main': './scripts/main.js',
        'requester': './scripts/requester.js',
        'data': './scripts/data.js',
        'templates': './scripts/templates.js',
        'controller-helpers': './scripts/controllers/helpers/controller-helpers.js',
        'home-controller': './scripts/controllers/home-controller.js',
        'users-controller': './scripts/controllers/users-controller.js',
        'videos-controller': './scripts/controllers/videos-controller.js'
    }
});