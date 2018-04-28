import React, {createElement} from 'react';
import {Transition} from 'react-transition-group';
import createHistory from 'history/createBrowserHistory';
import getTransitionStyle from './src/utils/get-transition-style';

const timeout = 350;
const historyExitingEventType = 'history::exiting';

(function() {
    if (typeof window.CustomEvent === 'function') {
        return;
    }

    function CustomEvent (event, params) {
        params = params || {bubbles: false, cancelable: false};
        const evt = document.createEvent('CustomEvent');
        evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
        return evt;
    }

    CustomEvent.prototype = window.Event.prototype;

    window.CustomEvent = CustomEvent;
}());

const getUserConfirmation = (pathname, callback) => {
    const event = new CustomEvent(historyExitingEventType, {detail: {pathname}});
    window.dispatchEvent(event);
    setTimeout(() => {
        callback(true);
    }, timeout);
};
const history = createHistory({getUserConfirmation});
// block must return a string to conform
history.block((location) => location.pathname);
exports.replaceHistory = () => history;

class ReplaceComponentRenderer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {exiting: false, nextPageResources: {}};
        this.listenerHandler = this.listenerHandler.bind(this);
    }

    listenerHandler(event) {
        const nextPageResources = this.props.loader.getResourcesForPathname(
            event.detail.pathname, npr => this.setState({nextPageResources: npr})
        ) || {};
        this.setState({exiting: true, nextPageResources});
    }

    componentDidMount() {
        window.addEventListener(historyExitingEventType, this.listenerHandler);
    }

    componentWillUnmount() {
        window.removeEventListener(historyExitingEventType, this.listenerHandler);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.location.key !== nextProps.location.key) {
            this.setState({exiting: false, nextPageResources: {}});
        }
    }

    render() {
        const transitionProps = {
            timeout: {
                enter: 0,
                exit: timeout
            },
            appear: true,
            in: !this.state.exiting,
            key: this.props.location.key
        };
        return (
            <Transition {...transitionProps}>
                {
                    (status) => createElement(this.props.pageResources.component, {
                        ...this.props,
                        ...this.props.pageResources.json,
                        transition: {
                            status,
                            timeout,
                            style: getTransitionStyle({status, timeout}),
                            nextPageResources: this.state.nextPageResources
                        }
                    })
                }
            </Transition>
        );
    }
}

exports.replaceComponentRenderer = ({props, loader}) => {
    if (props.layout) {
        return null;
    }
    return createElement(ReplaceComponentRenderer, {...props, loader});
};
