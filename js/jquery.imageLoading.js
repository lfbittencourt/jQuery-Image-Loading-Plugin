/**
 * jQuery Image Loading Plugin 1.0
 * http://www.lfbittencourt.com/jquery-image-loading-plugin
 *
 * Copyright (c) 2011 Luís Fernando Bittencourt
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 */

(function($) {

    // Default settings
    var settings = {
        containerClass: 'image-loading',
        onError: null,
        onLoad: null
    };

    $.fn.imageLoading = function(options) {

        if (options) {
            $.extend(settings, options);
        }

        return this.each(function() {
            var container = '<div class="';

            container += settings.containerClass;
            container += '" style="width: ';
            container += this.clientWidth;
            container += 'px; height: ';
            container += this.clientHeight;
            container += 'px"></div>';

            $(this).wrap(container);
            $(this).hide();

            if (!this.complete) {

                $(this).load(function() {
                    $(this).fadeIn().unwrap();

                    if (typeof settings.onLoad === 'function') {
                        settings.onLoad(this);
                    }
                });

                $(this).error(function() {
                    if (typeof settings.onError === 'function') {
                        settings.onError(this, this.parentNode);
                    }
                });

            } else {

                $(this).fadeIn();

                if (typeof settings.onLoad === 'function') {
                    settings.onLoad(this);
                }

            }
        });

    };

})(jQuery);