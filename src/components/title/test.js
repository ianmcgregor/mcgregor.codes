import React from 'react';
import {render} from 'enzyme';
import Title from './';

const props = {
    title: 'Inside Abbey Road',
    link: 'https://insideabbeyroad.withgoogle.com/'
};

describe('Title component', () => {
    it('should render', () => {
        const el = render((
            <Title
                {...props}
            />
        ));
        expect(el).toMatchSnapshot();
    });
});
