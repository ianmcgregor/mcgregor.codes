import React from 'react';
import Boids from '../components/Boids';

class Home extends React.Component {

    render () {

        return (
            <main className="Home">
                <h2 className="Home-title">Ian McGregor</h2>
                <h3 className="Home-subtitle">Specialist in creative, experiential
                web sites, games and applications.</h3>
                <Boids/>
            </main>
        );
    }
}

export {Home as default};
