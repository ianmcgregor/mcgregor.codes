import TweenLite from 'gsap/src/uncompressed/TweenLite';
import 'gsap/src/uncompressed/plugins/ScrollToPlugin';

export default function animScrollTo(y, duration, onComplete) {
    return TweenLite.to(window, duration, {
        ease: window.Power3.easeInOut,
        scrollTo: {
            x: 0,
            y,
            // autoKill: y > 0
            autoKill: true
        },
        onComplete
    });
}
