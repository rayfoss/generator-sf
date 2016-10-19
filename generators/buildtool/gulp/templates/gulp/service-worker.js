import { prefixDist} from './helper/utils';

// Copy over the scripts that are used in importScripts as part of the generate-service-worker task.
export const copySwScripts = () =>
    gulp.src(['node_modules/sw-toolbox/sw-toolbox.js', 'app/scripts/sw/runtime-caching.js'])
        .pipe(gulp.dest(prefixDist('scripts/sw')));

// See http://www.html5rocks.com/en/tutorials/service-worker/introduction/ for
// an in-depth explanation of what service workers are and why you should care.
// Generate a service worker file that will provide offline functionality for
// local resources. This should only be done for the 'dist' directory, to allow
// live reload to work as expected when serving from the 'app' directory.
export const generateServiceWorker = () => {
    const rootDir = 'dist';
    const filepath = path.join(rootDir, 'service-worker.js');

    return swPrecache.write(filepath, {
        // Used to avoid cache conflicts when serving on localhost.
        cacheId: pkg.name || 'web-starter-kit',
        // sw-toolbox.js needs to be listed first. It sets up methods used in runtime-caching.js.
        importScripts: [
            'scripts/sw/sw-toolbox.js',
            'scripts/sw/runtime-caching.js'
        ],
        staticFileGlobs: [
            // Add/remove glob patterns to match your directory setup.
            `${rootDir}/images/**/*`,
            `${rootDir}/scripts/**/*.js`,
            `${rootDir}/styles/**/*.css`,
            `${rootDir}/*.{html,json}`
        ],
        // Translates a static file path to the relative URL that it's served from.
        stripPrefix: path.join(rootDir, path.sep)
    });
};


