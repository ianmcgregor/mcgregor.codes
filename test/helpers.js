import React from 'react';
import filter from 'usfl/object/filter';

export const LinkStub = props => (
    <a
        href="#"
        {...filter(props, key => ['href', 'target', 'onclick'].includes(key.toLowerCase()))}
        onClick={() => {}} >
        {props.children}
    </a>
);
