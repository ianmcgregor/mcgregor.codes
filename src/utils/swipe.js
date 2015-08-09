import {EventEmitter} from 'events';

export default function(el, minDistance) {
    el = el || document.body;
    minDistance = minDistance || 10;

    const touchData = {
        start: -1,
        move: -1,
        end: -1,
        distance: 0,
        direction: 'none',
        touching: false,
        originalEvent: null
    };

    const touchX = {...touchData};
    const touchY = {...touchData};

    function touchHandler(event) {
        if (!(event && event.touches)) {
            return;
        }
        const touch = event.touches[0];
        const x = touch && touch.pageX;
        const y = touch && touch.pageY;
        switch (event.type) {
            case 'touchstart':
                touchX.start = touchX.move = touchX.end = x;
                touchY.start = touchY.move = touchY.end = y;
                touchX.touching = touchY.touching = true;
                break;
            case 'touchmove':
                touchX.move = x;
                touchY.move = y;
                break;
            case 'touchend':
                touchX.originalEvent = touchY.originalEvent = event;
                update(touchX, 'left', 'right');
                update(touchY, 'up', 'down');
                break;
            default:
        }
    }

    function update(t, a, b) {
        t.end = t.move;
        t.touching = false;
        t.distance = Math.abs(t.start - t.move);
        if (t.distance >= minDistance) {
            t.direction = t.start > t.move ? a : b;
            swipe.emit(t.direction, {...t});
        }
    }

    function listen(elem) {
        el = elem || el;
        el.addEventListener('touchstart', touchHandler);
        el.addEventListener('touchmove', touchHandler);
        el.addEventListener('touchend', touchHandler);
        return swipe;
    }

    function destroy() {
        swipe.removeAllListeners();
        el.removeEventListener('touchstart', touchHandler);
        el.removeEventListener('touchmove', touchHandler);
        el.removeEventListener('touchend', touchHandler);
        el = null;
        return swipe;
    }

    const swipe = Object.create(EventEmitter.prototype, {
        _events: {
            value: {}
        },
        listen: {
            value: listen
        },
        destroy: {
            value: destroy
        }
    });

    return Object.freeze(swipe);
}
