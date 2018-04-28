import React, {Component} from 'react';
import styled from 'styled-components';
import Label from '../label';
import {color, linkCss} from '../../styles';

const Wrapper = styled.div`
    position: relative;
    width: 100%;
`;

const VideoHolder = styled.div`
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

const PlayButton = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    opacity: ${({playing}) => playing ? 0 : 1};
    transition: opacity 0.2s ease;
`;

const PlayButtonLink = styled.div`
    ${linkCss}
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`;

const VideoComponent = styled.video`
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: ${({loaded}) => loaded ? 1 : 0};
    transition: opacity 0.3s ease-in;

    &::-webkit-media-controls,
    &::-webkit-media-controls-start-playback-button {
        display: none !important;
    }
`;

export default class Video extends Component {
    constructor(props) {
        super(props);

        this.state = {
            playing: props.autoLoop,
            loaded: false
        };
    }

    onReady() {
        this.setState({
            loaded: true
        });
    }

    togglePlay() {
        // if (this.props.autoLoop) {
        //     return;
        // }
        if (this.state.playing) {
            this.video.pause();
            this.setState({playing: false});
        } else {
            this.video.play();
            this.setState({playing: true});
        }
    }

    componentDidMount() {
        if (!this.props.autoLoop) {
            try {
                this.video.play().then(() => this.video.pause());
            } catch (e) {}
        }
    }

    render() {
        const {
            id,
            video: {
                file: {
                    contentType,
                    url
                }
            },
            autoLoop,
            playButton
        } = this.props;

        return (
            <Wrapper>
                <VideoHolder>
                    <VideoComponent
                        id={id}
                        loaded={this.state.loaded}
                        onCanPlay={() => this.onReady()}
                        onLoadedMetadata={() => this.onReady()}
                        innerRef={video => (this.video = video)}
                        muted={autoLoop}
                        autoPlay={autoLoop}
                        loop={autoLoop}
                        playsInline>
                        <source
                            src={url}
                            type={contentType}
                        />
                    </VideoComponent>
                    {playButton && (
                        <PlayButton
                            onClick={() => this.togglePlay()}
                            playing={this.state.playing}>
                            <PlayButtonLink>
                                <Label text="play" el="span"/>
                            </PlayButtonLink>
                        </PlayButton>
                    )}
                </VideoHolder>
            </Wrapper>
        );
    }
}
