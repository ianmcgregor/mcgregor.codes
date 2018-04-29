import React from 'react';
import Link from 'gatsby-link';
import styled from 'styled-components';
import Label from '../label';
import {linkCss, media, marginFixed} from '../../styles';
import pagePathname from '../../utils/page-pathname';

const HideMobile = styled.span`
    display: none;
    ${media.tablet`
        display: block;
    `}
`;

const PrevNextLink = styled(Link)`
    ${linkCss}
`;

const PrevNextWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    margin-bottom: ${marginFixed * 2}px;

    ${media.tablet`
        flex-direction: row;
        align-items: flex-start;
        justify-content: space-between;
    `}
`;

export default ({
    slug,
    links
}) => {
    const index = links.indexOf(links.find(l => l.slug === slug));
    const prev = links[index - 1] || links[links.length - 1];
    const next = links[index + 1] || links[0];

    return (
        <PrevNextWrapper>
            <HideMobile>
                <PrevNextLink to={pagePathname(prev.slug)}>
                    <Label
                        arrow="left"
                        text={prev.title}
                        el="div"
                    />
                </PrevNextLink>
            </HideMobile>
            <PrevNextLink to={pagePathname(next.slug)}>
                <Label
                    arrow="right"
                    text={next.title}
                    el="div"
                />
            </PrevNextLink>
        </PrevNextWrapper>
    );
};
