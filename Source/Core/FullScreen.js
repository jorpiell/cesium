/*global define*/
define(['Core/DeveloperError'
       ],function(
         DeveloperError) {
    "use strict";
    var _prefix;
    var _supportsFullScreen;
    var _browserPrefixes = ['webkit', 'moz', 'o', 'ms', 'khtml'];

    /**
     * Encapsulates browser dependent methods for working with the
     * full screen standard.
     *
     * @exports FullScreen
     *
     * @see <a href="http://dvcs.w3.org/hg/fullscreen/raw-file/tip/Overview.html">W3C Fullscreen Living Specification</a>
     */
    var FullScreen = {
        /**
         * Detects whether the browser supports the full screen standard.
         *
         * @returns <code>true</code> if the supports the full screen standard, <code>false</code> if otherwise.
         */
        supportsFullScreen : function() {
            if (typeof _supportsFullScreen === 'undefined') {
                _supportsFullScreen = false;
                // check for native support
                if (typeof document.exitFullscreen !== 'undefined') {
                    _supportsFullScreen = true;
                    _prefix = '';
                } else {
                    // check for full screen support by vendor prefix
                    for ( var i = 0; i < _browserPrefixes.length; i++) {
                        _prefix = _browserPrefixes[i];

                        if (typeof document[_prefix + 'CancelFullScreen'] !== 'undefined') {
                            _supportsFullScreen = true;
                            break;
                        }
                    }
                }
            }
            return _supportsFullScreen;
        },

        /**
         * Gets the name of the event that is fired when full screen is entered or exited or <code>undefined</code> if full screen is not supported.
         *
         * @returns the name of the event that is fired when full screen is entered or exited or <code>undefined</code> if full screen is not supported.
         */
        getFullScreenChangeEventName : function() {
            return FullScreen.supportsFullScreen() ? 'on' + _prefix + 'fullscreenchange' : undefined;
        },

        /**
         * Gets the name of the event that is fired when a full screen error occurs or <code>undefined</code> if full screen is not supported.
         *
         * @returns the name of the event that is fired when a full screen error occurs or <code>undefined</code> if full screen is not supported.
         */
        getFullScreenErrorEventName : function() {
            return FullScreen.supportsFullScreen() ? 'on' + _prefix + 'fullscreenerror' : undefined;
        },

        /**
         * Detects whether the browser is currently in full screen mode.
         *
         * @returns <code>true</code> if the browser is in full screen mode, <code>false</code> if not, and <code>undefined</code> if the browser does not support full screen mode.
         */
        isFullscreenEnabled : function() {
            if (FullScreen.supportsFullScreen()) {
                switch (_prefix) {
                case '':
                    return document.fullscreenEnabled;
                case 'webkit':
                    return document.webkitIsFullScreen;
                default:
                    return document[_prefix + 'FullScreen'];
                }
            }
            return undefined;
        },

        /**
         * Queues a request for full screen mode if the browser is currently not in full screen, does nothing otherwise.
         */
        requestFullScreen : function(element) {
            if (FullScreen.supportsFullScreen()) {
                return (_prefix === '') ? element.requestFullScreen(element) : element[_prefix + 'RequestFullScreen'](element);
            }
        },

        /**
         * Exits full screen mode if the browser is currently in full screen, does nothing otherwise.
         */
        exitFullscreen : function() {
            if (FullScreen.supportsFullScreen()) {
                return typeof document.exitFullscreen !== 'undefined' ? document.exitFullscreen() : document[_prefix + 'CancelFullScreen']();
            }
        }
    };

    return FullScreen;
});