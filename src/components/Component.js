import React from 'react';

class Component extends React.Component {

    // Invoked once, both on the client and server,
    // immediately before the initial rendering occurs.
    // If you call setState within this method, render()
    // will see the updated state and will be executed
    // only once despite the state change.
    componentWillMount () {
    }

    // Invoked once, only on the client (not on the server),
    // immediately after the initial rendering occurs.
    // At this point in the lifecycle, the component has a
    // DOM representation which you can access
    // via React.findDOMNode(this).
    //
    // If you want to integrate with other JavaScript
    // frameworks, set timers using setTimeout or
    // setInterval, or send AJAX requests, perform
    // those operations in this method.
    componentDidMount () {

    }

    // Invoked when a component is receiving new props.
    // This method is not called for the initial render.
    //
    // Use this as an opportunity to react to a prop transition
    // before render() is called by updating the state
    // using this.setState(). The old props can be accessed
    // via this.props. Calling this.setState() within this
    // function will not trigger an additional render.
    componentWillReceiveProps (nextProps) {

    }

    // Invoked before rendering when new props or state are being
    // received. This method is not called for the initial render
    // or when forceUpdate is used.
    //
    // Use this as an opportunity to return false when you're
    // certain that the transition to the new props and state
    // will not require a component update.
    //
    // If shouldComponentUpdate returns false, then render() will
    // be completely skipped until the next state change. (In
    // addition, componentWillUpdate and componentDidUpdate
    // will not be called.)
    //
    // By default, shouldComponentUpdate always returns true to
    // prevent subtle bugs when state is mutated in place, but
    // if you are careful to always treat state as immutable
    // and to read only from props and state in render() then
    // you can override shouldComponentUpdate with an
    // implementation that compares the old props and state to
    // their replacements.
    //
    // If performance is a bottleneck, especially with dozens
    // or hundreds of components, use shouldComponentUpdate
    // to speed up your app.

    shouldComponentUpdate (nextProps, nextState) {
        return true;
    }

    // Invoked immediately before rendering when new props or
    // state are being received. This method is not called for
    // the initial render.
    //
    // Use this as an opportunity to perform preparation before
    // an update occurs.
    //
    // Note:
    // You cannot use this.setState() in this method. If you
    // need to update state in response to a prop change, use
    // componentWillReceiveProps instead.

    componentWillUpdate (nextProps, nextState) {

    }

    // Invoked immediately after the component's updates are
    // flushed to the DOM. This method is not called for the
    // initial render.

    // Use this as an opportunity to operate on the DOM when the
    // component has been updated.

    componentDidUpdate (prevProps, prevState) {

    }

    // Invoked immediately before a component is unmounted from
    // the DOM.
    //
    // Perform any necessary cleanup in this method, such as
    // invalidating timers or cleaning up any DOM elements that
    // were created in componentDidMount.

    componentWillUnmount () {

    }

    // When called, it should examine this.props and this.state
    // and return a single child element. This child element can be
    // either a virtual representation of a native DOM component (such
    // as <div /> or React.DOM.div()) or another composite component
    // that you've defined yourself.
    //
    // You can also return null or false to indicate that you don't
    // want anything rendered. Behind the scenes, React renders a
    // <noscript> tag to work with our current diffing algorithm.
    // When returning null or false, React.findDOMNode(this) will
    // return null.
    //
    // The render() function should be pure, meaning that it does not
    // modify component state, it returns the same result each time
    // it's invoked, and it does not read from or write to the DOM
    // or otherwise interact with the browser (e.g., by using
    // setTimeout). If you need to interact with the browser, perform
    // your work in componentDidMount() or the other lifecycle methods
    // instead. Keeping render() pure makes server rendering more
    // practical and makes components easier to think about.

    render () {
        return (<div></div>);
    }
}

export {Component as default};


// A simple component, that isn't stateful, can be provided as a single
// function that accepts props. This provides React with a hint that this
// component can be collapsed and that its state doesn't need to be preserved.
// It also encourages micro-componentization instead of custom helper functions
// outside the system.
// export function Button(props : { width: number, onClick: function }) {
export function Button(props) {
    return (
        <div>
            Fancy button
            <button onClick={props.onClick} style={{ width: props.width }} />
        </div>
    );
}

// When named exports are used, it may be valid to have multiple components
// in the same file. Destructuring can be used to provide convenience aliasing
// and defaults to props.
export function Checkbox({ checked = true, width }) {
    return (
        <div>
            Fancy checkbox
            <input type="checkbox" checked={checked} style={{ width }} />
        </div>
    );
}
