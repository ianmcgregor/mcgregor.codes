'use strict';

export default {
    init: function(gaAccount) {
        console.log('Initialize Google Analytics with account Id:', gaAccount);

        /*eslint-disable*/
        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
		(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
		m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
		})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
        /*eslint-enable*/

        window.ga('create', gaAccount, 'auto');
        window.ga('send', 'pageview');
    },
    page: function(page, title) {
        console.log('track.page:', page);
        if (!window.ga) {
            console.warn('track.page: Google Analytics not initialized');
            return;
        }
        window.ga('send', {
            hitType: 'pageview',
            page: page,
            title: title || document.title
        });
    },
    event: function(category, action, label, value) {
        console.log('track.event:', category, action, label, value);
        if (!window.ga) {
            console.warn('track.event: Google Analytics not initialized');
            return;
        }
        const config = {
            hitType: 'event',
            eventCategory: category,
            eventAction: action
        };
        if (label) {
            config.eventLabel = label;
            config.eventValue = value;
        }
        window.ga('send', config);
    }
};
