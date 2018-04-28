import React from 'react';
import {render} from 'enzyme';
import {MemoryRouter} from 'react-router-dom';
import {LinkStub} from '../../../test/helpers';
import Menu from './';

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

describe('Menu component', () => {
    it('should render', () => {
        const menu = render((
            <MemoryRouter>
                <Menu
                    {...props}
                    LinkComponent={LinkStub}
                />
            </MemoryRouter>
        ));
        expect(menu).toMatchSnapshot();
    });
});
