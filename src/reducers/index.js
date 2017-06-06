import {
    TOGGLE_TECH
} from '../actions';

export default (state = {}, action) => {
    console.log('-->', action.type, JSON.stringify(action));
    switch (action.type) {
        case TOGGLE_TECH:
            return Object.assign({}, state, {
                showTech: !state.showTech
            });
        default:
            return state;
    }
};
