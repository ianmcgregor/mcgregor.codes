export default function scrollTop() {
    return document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset;
}
