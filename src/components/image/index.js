import React, {Component} from 'react';
import styled from 'styled-components';
import {color} from '../../styles';

const Wrapper = styled.div`
    position: relative;
    width: 100%;
`;

const ImgHolder = styled.div`
    background-color: ${color.grey};
    position: relative;
    width: 100%;

    &::after {
        content: "";
        padding-bottom: 56.25%;
        display: block;
        width: 100%;
    }
`;

const ImgComponent = styled.img`
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: ${({loaded}) => loaded ? 1 : 0};
    transition: opacity 0.3s ease-in;
`;

export default class Image extends Component {
    state = {
        loaded: false
    }

    render() {
        const {
            image: {
                title,
                sizes: {
                    src,
                    srcSet
                }
            }
        } = this.props;

        return (
            <Wrapper>
                <ImgHolder>
                    <ImgComponent
                        loaded={this.state.loaded}
                        alt={title}
                        src={src}
                        srcSet={srcSet}
                        onLoad={() => this.setState({
                            loaded: true
                        })}
                    />
                </ImgHolder>
            </Wrapper>
        );
    }
}
