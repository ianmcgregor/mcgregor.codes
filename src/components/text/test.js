import React from 'react';
import {render} from 'enzyme';
import Text from './';

const props = {
    text: {
        childMarkdownRemark: {
            html: '<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.</p>'
        }
    }
};

describe('Text component', () => {
    it('should render', () => {
        const el = render((
            <Text {...props}/>
        ));
        expect(el).toMatchSnapshot();
    });
});
