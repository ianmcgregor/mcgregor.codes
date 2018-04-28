import React from 'react';
import {render} from 'enzyme';
import Frame from './';

const props = {
    src: 'https://www.example.com'
};

describe('Frame component', () => {
    it('should render', () => {
        const el = render((
            <Frame
                {...props}
            />
        ));
        expect(el).toMatchSnapshot();
    });
});
