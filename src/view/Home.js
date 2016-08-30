import React from 'react';
import Boids from '../components/Boids';

class Home extends React.Component {

    render () {

        return (
            <main className="Home">
                <h2 className="Home-title">Ian McGregor</h2>
                <p className="Home-subtitle">Specialist in creative, experiential
                web sites, games and applications.</p>
                <Boids/>
            </main>
        );
    }
}

export {Home as default};
