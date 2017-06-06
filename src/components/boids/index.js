import Boid from 'boid';
import dat from 'dat-gui';
import debounce from 'lodash/debounce';
import React from 'react';
import ReactDOM from 'react-dom';

export default class Boids extends React.Component {

    numBoids = 20;

    options = {
        edgeBehavior: 'wrap',
        mass: 1,
        maxSpeed: 2,
        maxForce: 0.5,
        minDistance: 80,
        maxDistance: 500
    };

    constructor (props) {
        super(props);

        this.loop = this.loop.bind(this);
        this.onResize = debounce(this.onResize.bind(this), 500);
    }

    componentDidMount () {

        this.boids = this.createBoids();

        this.loop();

        if (window.isDebug) {
            try {
                this.createGUI();
            } catch (e) {}
        }

        window.addEventListener('resize', this.onResize);

    }

    createBoids () {
        const boids = [];
        let boid;

        const canvas = ReactDOM.findDOMNode(this);
        // canvas.style.height = this.getHeight();

        const padding = 50,
            offset = 0 - padding / 2,
            width = canvas.offsetWidth + padding,
            height = canvas.offsetHeight + padding;

        // const {maxSpeed, minDistance, maxDistance, edgeBehavior, maxForce} = this.options;

        while (boids.length < this.numBoids) {
            boid = new Boid(this.options);
            boid.setBounds(width, height, offset, offset);
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

    rotate (from, end) {
        const PI2 = Math.PI * 2;
        let diff = (end - from) % PI2;
        if (diff !== diff % Math.PI) {
            diff = diff < 0 ? diff + PI2 : diff - PI2;
        }
        return from + diff;
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
            // const angle = oldAngle + ( newAngle - oldAngle ) * 0.1;
            const angle = oldAngle + (newAngle - oldAngle) * 0.05;
            boid.userData.angle = this.rotate(oldAngle, angle);
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
        // const pageHeight = document.documentElement.scrollHeight;
        const pageHeight = window.innerHeight;
        return `${pageHeight}px`;
    }

    createGUI () {
        const boids = this.boids;
        const options = this.options;

        const gui = new dat.GUI();
        gui.add(options, 'mass', 0, 10).onChange((value) => {
            boids.forEach(boid => (boid.mass = value));
        });
        gui.add(options, 'maxSpeed', 0, 100).onChange((value) => {
            boids.forEach(boid => (boid.maxSpeed = value));
        });
        gui.add(options, 'maxForce', 0, 10).onChange((value) => {
            boids.forEach(boid => (boid.maxForce = value));
        });
        gui.add(options, 'edgeBehavior', [
            'none',
            'wrap',
            'bounce'
        ]).onChange((value) => {
            boids.forEach(boid => (boid.edgeBehavior = value));
        });
        gui.add(options, 'maxDistance', 0, 800).onChange((value) => {
            boids.forEach(boid => (boid.maxDistance = value));
        });
        gui.add(options, 'minDistance', 0, 200).onChange((value) => {
            boids.forEach(boid => (boid.minDistance = value));
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

        return <section className="Boids" />;
    }

    componentWillUnmount () {
        if (this.gui) {
            this.gui.destroy();
        }

        window.removeEventListener('resize', this.onResize);
    }
}
