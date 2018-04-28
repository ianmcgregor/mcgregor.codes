import React, {Component} from 'react';
import styled from 'styled-components';
import {
    media,
    marginMobile,
    columnMobile,
    marginTablet,
    columnTablet,
    marginDesktop,
    columnDesktop
} from '../../styles';
import keyboard from 'usfl/input/keyboard';

const Container = styled.div`
    display: ${props => props.isVisible ? 'block' : 'none'};
    padding: 0;
    position: fixed;
    top: 0;
    width: 100%;
    height: 100vh;
    left: 50%;
    transform: translate(-50%, 0px);
    z-index: 200;
    pointer-events: none;
`;

const GridMobile = styled.div`
    width: 100%;
    ${media.tablet`
        display: none;
    `}
`;

const GridTablet = styled.div`
    width: 100%;
    display: none;
    ${media.tablet`
        display: block;
    `}
    ${media.desktop`
        display: none;
    `}
`;

const GridDesktop = styled.div`
    width: 100%;
    display: none;
    ${media.desktop`
        display: block;
    `}
`;

const Line = styled.div`
    background: blue;
    width: 1px;
    position: absolute;
    top: 0;
    height: 100vh;
    left: ${({left}) => left}%;
`;

const getLines = (margin, column) => {
    let i = 0;
    let x = 0;
    const arr = [];
    while (x < 100) {
        x += i % 2 === 0 ? margin : column;
        i++;
        arr.push(x);
    }
    return arr;
};


const linesMobile = getLines(marginMobile, columnMobile);
const linesTablet = getLines(marginTablet, columnTablet);
const linesDesktop = getLines(marginDesktop, columnDesktop);

export default class GridComponent extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);

        this.state = {
            isVisible: !!props.show
        };
    }

    componentDidMount() {
        document.addEventListener('keydown', this.toggle, false);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.toggle);
    }

    toggle(event) {
        if (event.keyCode === keyboard.G) {
            this.setState({isVisible: !this.state.isVisible});
        }
    }

    render() {
        return (
            <Container isVisible={this.state.isVisible}>
                <GridMobile>
                    {linesMobile.map(left => <Line key={left} left={left}/>)}
                </GridMobile>
                <GridTablet>
                    {linesTablet.map(left => <Line key={left} left={left}/>)}
                </GridTablet>
                <GridDesktop>
                    {linesDesktop.map(left => <Line key={left} left={left}/>)}
                </GridDesktop>
            </Container>
        );
    }
}
