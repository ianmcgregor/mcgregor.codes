import map from 'usfl/math/map';

export default function(el, inside = false) {
    const {top, height} = el.getBoundingClientRect();
    const min = inside ? 0 : 0 - height;
    const max = inside ? window.innerHeight - height : window.innerHeight;
    return map(top, min, max, 0, 1);
}
