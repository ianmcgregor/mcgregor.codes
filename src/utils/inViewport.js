export default function inViewport(el, margin = 0) {
    const rect = el.getBoundingClientRect();
    const height = window.innerHeight || document.documentElement.clientHeight;

    return (
        rect.top >= margin &&
        rect.bottom <= height - margin
    );
}
