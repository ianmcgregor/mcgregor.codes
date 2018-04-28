const prevent = event => event.preventDefault();

export default function stopScroll(b) {
    if (typeof document === 'undefined') {
        return;
    }

    document.body.removeEventListener('touchmove', prevent);

    if (b) {
        document.body.addEventListener('touchmove', prevent);
    }
}
