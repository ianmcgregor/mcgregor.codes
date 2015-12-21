export default function getSrcsetImage(srcset) {
    const viewportWidth = window.innerWidth * (window.devicePixelRatio || 1);

    return srcset.split(',').reduce((value, item) => {
        const parts = item.trim().split(/\s+/);
        const url = parts[0];
        const size = parseInt(parts[1].slice(0, -1), 10);
        return !value || size >= viewportWidth ? url : value;
    }, '');
}
