import React from 'react';
import {connect} from 'react-redux';
import {Route} from 'react-micro-router';
import Header from '../header';
import Work from '../work';
import About from '../about';
import Tech from '../tech';
import Contact from '../contact';
import transition from '../transition';

function App({match}) {
    return (
        <div className="App">
            <Route path="/">
                <Header/>
            </Route>
            <div className="App-sections">
                <Route
                    path={match}
                    className="App-section"
                    transition={transition}>
                    <Work/>
                </Route>
                <Route
                    path="/about"
                    className="App-section"
                    transition={transition}>
                    <About/>
                    <Tech/>
                </Route>
                <Route
                    path="/contact"
                    className="App-section"
                    transition={transition}>
                    <Contact/>
                </Route>
            </div>
        </div>
    );
}

export default connect(
    state => ({
        match: state.match
    })
)(App);
