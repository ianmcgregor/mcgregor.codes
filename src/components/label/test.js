import React from 'react';
import {render} from 'enzyme';
import Label from './';

const props = {
    text: 'Lorem ipsum'
};

describe('Label component', () => {
    it('should render', () => {
        const el = render((
            <Label {...props}/>
        ));
        expect(el).toMatchSnapshot();
    });
});
