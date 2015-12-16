import Boid from 'boid';
import dat from 'dat-gui';
import {debounce} from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';

class Boids extends React.Component {

    numBoids = 50;

    options = {
        mass: 1,
        maxForce: 0.5,
        maxSpeed: 8,
        edgeBehavior: 'wrap',
        minDistance: 50,
        maxDistance: 300
    };

    constructor (props) {
        super(props);

        this.loop = this.loop.bind(this);
        this.onResize = debounce(this.onResize.bind(this), 500);
    }

    componentDidMount () {

        this.boids = this.createBoids();

        this.loop();

        this.createGUI();

        window.addEventListener('resize', this.onResize);

    }

    createBoids () {
        const boids = [];
        let boid;

        const canvas = ReactDOM.findDOMNode(this);
        // canvas.style.height = this.getHeight();

        const width = canvas.offsetWidth,
            height = canvas.offsetHeight;

        // const {maxSpeed, minDistance, maxDistance, edgeBehavior, maxForce} = this.options;

        while (boids.length < this.numBoids) {
            boid = new Boid(this.options);
            boid.setBounds(width, height);
            // boid.edgeBehavior = edgeBehavior;
            // boid.maxDistance = maxDistance;
            // boid.minDistance = minDistance;
            // boid.maxForce = maxForce;
            // boid.maxSpeed = maxSpeed;
            boid.position.x = width * Math.random();
            boid.position.y = height * Math.random();
            boid.velocity.x = 20 * Math.random() - 10;
            boid.velocity.y = 20 * Math.random() - 10;
            boids.push(boid);

            boid.userData.el = document.createElement('b');
            canvas.appendChild(boid.userData.el);
        }

        return boids;
    }

    loop () {
        window.requestAnimationFrame(this.loop);

        let boid, point, el, transform;

        for (let i = 0; i < this.boids.length; i++) {
            boid = this.boids[i];
            boid.flock(this.boids).update();

            point = boid.position;

            const {x, y} = point;
            const oldAngle = boid.userData.angle || 0;
            const newAngle = boid.velocity.angle;
            boid.userData.angle = oldAngle + ( newAngle - oldAngle ) * 0.1;
            const rotation = boid.userData.angle;

            // const roundTo = 8;
            // x = Math.floor(x / roundTo) * roundTo;
            // y = Math.floor(y / roundTo) * roundTo;

            transform = `translate(${x}px,${y}px) rotate(${rotation}rad)`;

            el = boid.userData.el;
            el.style.WebkitTransform = transform;
            el.style.transform = transform;
        }
    }

    onResize () {
        const canvas = ReactDOM.findDOMNode(this);
        canvas.style.height = this.getHeight();
        const width = canvas.offsetWidth, height = canvas.offsetHeight;
        for (let i = 0; i < this.boids.length; i++) {
            this.boids[i].setBounds(width, height);
        }
    }

    getHeight () {
        const pageHeight = document.documentElement.scrollHeight - 160;
        return `${pageHeight}px`;
    }

    createGUI () {
        const boids = this.boids;
        const options = this.options;

        const gui = new dat.GUI();
        gui.add(options, 'mass', 0, 10).onChange((value) => {
            boids.forEach((boid) => boid.mass = value);
        });
        gui.add(options, 'maxSpeed', 0, 100).onChange((value) => {
            boids.forEach((boid) => boid.maxSpeed = value);
        });
        gui.add(options, 'maxForce', 0, 10).onChange((value) => {
            boids.forEach((boid) => boid.maxForce = value);
        });
        gui.add(options, 'edgeBehavior', [
            'none',
            'wrap',
            'bounce'
        ]).onChange((value) => {
            boids.forEach((boid) => boid.edgeBehavior = value);
        });
        gui.add(options, 'maxDistance', 0, 800).onChange((value) => {
            boids.forEach((boid) => boid.maxDistance = value);
        });
        gui.add(options, 'minDistance', 0, 200).onChange((value) => {
            boids.forEach((boid) => boid.minDistance = value);
        });
        // .add(options, 'count', 1, 200).onChange((value) => {
        //     const canvas = ReactDOM.findDOMNode(this);
        //
        //     while (boids.length < value) {
        //         const boid = createboid();
        //         canvas.appendChild(boid.userData.el);
        //         boids.push(boid);
        //     }
        //
        //     while (boids.length > value) {
        //         const boid = boids.pop();
        //         canvas.removeChild(boid.userData.el);
        //     }
        // });

        gui.close();

        this.gui = gui;
    }

    render () {

        return <section className="Boids"></section>;
    }

    componentWillUnmount () {

        this.gui.destroy();

        window.removeEventListener('resize', this.onResize);
    }
}

export {Boids as default};
