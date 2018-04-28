import React from 'react';
import {render} from 'enzyme';
import Video from './';

const props = {
    id: 'c46go7zB99SqIwWu8qKAqey',
    video: {
        title: 'comic adventure',
        description: '',
        file: {
            url: '//videos.ctfassets.net/i8x1lkvuio7i/46go7zB99SqIwWu8qKAqey/8d78c2dbad5d3e09a76b48de0498546b/comic_adventure.mp4',
            fileName: 'comic_adventure.mp4',
            contentType: 'video/x-m4v'
        }
    },
    autoLoop: false
};

describe('Video component', () => {
    it('should render', () => {
        const el = render((
            <Video {...props}/>
        ));
        expect(el).toMatchSnapshot();
    });
});
