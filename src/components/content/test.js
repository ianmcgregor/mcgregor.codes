import React from 'react';
import {render} from 'enzyme';
import Content from './';

const props = {
    title: 'Lorem ipsum',
    text: {
        childMarkdownRemark: {
            html: '<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.</p>'
        }
    }
};

describe('Content component', () => {
    it('should render', () => {
        const el = render((
            <Content {...props}/>
        ));
        expect(el).toMatchSnapshot();
    });
});
