export default {
    page: function(page) {
        // console.log('track.page:', page);

        if (!window.dataLayer) {
            window.dataLayer = {};
        }

        window.dataLayer.push({
            event: 'virtualPageView',
            virtualUrl: page
        });
    }
};
