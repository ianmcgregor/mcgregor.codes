import React from 'react';
import {render} from 'enzyme';
import {MemoryRouter} from 'react-router-dom';
import Header from './';

const props = {
    links: [
        {
            label: 'Work',
            url: '/'
        },
        {
            label: 'About',
            url: '/about/'
        }
    ]
};

describe('Header component', () => {
    it('should render', () => {
        const el = render((
            <MemoryRouter>
                <Header {...props}/>
            </MemoryRouter>
        ));
        expect(el).toMatchSnapshot();
    });
});
