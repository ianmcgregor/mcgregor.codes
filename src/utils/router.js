export default function(cb) {

    window.addEventListener('popstate', (event) => {
        console.debug('onpopstate:', JSON.stringify(event.state));
        console.debug('path:', document.location.pathname);
        cb(event);
    });

    function push(url) {
        window.history.pushState(null, null, url);
    }

    return {
        push
    };
}
