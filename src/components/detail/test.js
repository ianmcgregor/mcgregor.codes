import React from 'react';
import {render} from 'enzyme';
import {MemoryRouter} from 'react-router-dom';
import {LinkStub} from '../../../test/helpers';
import Detail from './';

const props = {
    type: 'ContentfulProject',
    __typename: 'ContentfulProject',
    id: 'c2OLhcgLiesoUqs48yMa0co',
    title: 'Google — Inside Abbey Road',
    year: 2015,
    image: {
        id: 'c3JDzQqutDa6uE6oOs22AEO',
        title: 'abbey road 10',
        description: '',
        resolutions: {
            aspectRatio: 1.7777777777777777,
            width: 400,
            height: 225,
            src: '//images.ctfassets.net/i8x1lkvuio7i/3JDzQqutDa6uE6oOs22AEO/9f09cad5e7504b8aeed7697d5c8832fa/abbey_road_10.png?w=400&q=50',
            srcSet: '//images.ctfassets.net/i8x1lkvuio7i/3JDzQqutDa6uE6oOs22AEO/9f09cad5e7504b8aeed7697d5c8832fa/abbey_road_10.png?w=400&h=225&q=50 1x,\n//images.ctfassets.net/i8x1lkvuio7i/3JDzQqutDa6uE6oOs22AEO/9f09cad5e7504b8aeed7697d5c8832fa/abbey_road_10.png?w=600&h=338&q=50 1.5x,\n//images.ctfassets.net/i8x1lkvuio7i/3JDzQqutDa6uE6oOs22AEO/9f09cad5e7504b8aeed7697d5c8832fa/abbey_road_10.png?w=800&h=450&q=50 2x,\n//images.ctfassets.net/i8x1lkvuio7i/3JDzQqutDa6uE6oOs22AEO/9f09cad5e7504b8aeed7697d5c8832fa/abbey_road_10.png?w=1200&h=675&q=50 3x',
            srcWebp: '//images.ctfassets.net/i8x1lkvuio7i/3JDzQqutDa6uE6oOs22AEO/9f09cad5e7504b8aeed7697d5c8832fa/abbey_road_10.png?w=400&q=50&fm=webp',
            srcSetWebp: '//images.ctfassets.net/i8x1lkvuio7i/3JDzQqutDa6uE6oOs22AEO/9f09cad5e7504b8aeed7697d5c8832fa/abbey_road_10.png?w=400&h=225&q=50&fm=webp 1x,\n//images.ctfassets.net/i8x1lkvuio7i/3JDzQqutDa6uE6oOs22AEO/9f09cad5e7504b8aeed7697d5c8832fa/abbey_road_10.png?w=600&h=338&q=50&fm=webp 1.5x,\n//images.ctfassets.net/i8x1lkvuio7i/3JDzQqutDa6uE6oOs22AEO/9f09cad5e7504b8aeed7697d5c8832fa/abbey_road_10.png?w=800&h=450&q=50&fm=webp 2x,\n//images.ctfassets.net/i8x1lkvuio7i/3JDzQqutDa6uE6oOs22AEO/9f09cad5e7504b8aeed7697d5c8832fa/abbey_road_10.png?w=1200&h=675&q=50&fm=webp 3x'
        },
        file: {
            url: '//images.ctfassets.net/i8x1lkvuio7i/3JDzQqutDa6uE6oOs22AEO/9f09cad5e7504b8aeed7697d5c8832fa/abbey_road_10.png',
            fileName: 'abbey_road_10.png',
            contentType: 'image/png'
        },
        sizes: {
            aspectRatio: 1.7777777777777777,
            src: '//images.ctfassets.net/i8x1lkvuio7i/3JDzQqutDa6uE6oOs22AEO/9f09cad5e7504b8aeed7697d5c8832fa/abbey_road_10.png?w=800&q=100',
            srcSet: '//images.ctfassets.net/i8x1lkvuio7i/3JDzQqutDa6uE6oOs22AEO/9f09cad5e7504b8aeed7697d5c8832fa/abbey_road_10.png?w=200&h=113&q=100 200w,\n//images.ctfassets.net/i8x1lkvuio7i/3JDzQqutDa6uE6oOs22AEO/9f09cad5e7504b8aeed7697d5c8832fa/abbey_road_10.png?w=400&h=225&q=100 400w,\n//images.ctfassets.net/i8x1lkvuio7i/3JDzQqutDa6uE6oOs22AEO/9f09cad5e7504b8aeed7697d5c8832fa/abbey_road_10.png?w=800&h=450&q=100 800w,\n//images.ctfassets.net/i8x1lkvuio7i/3JDzQqutDa6uE6oOs22AEO/9f09cad5e7504b8aeed7697d5c8832fa/abbey_road_10.png?w=1200&h=675&q=100 1200w,\n//images.ctfassets.net/i8x1lkvuio7i/3JDzQqutDa6uE6oOs22AEO/9f09cad5e7504b8aeed7697d5c8832fa/abbey_road_10.png?w=1600&h=900&q=100 1600w,\n//images.ctfassets.net/i8x1lkvuio7i/3JDzQqutDa6uE6oOs22AEO/9f09cad5e7504b8aeed7697d5c8832fa/abbey_road_10.png?w=1920&h=1080&q=100 1920w',
            srcWebp: '//images.ctfassets.net/i8x1lkvuio7i/3JDzQqutDa6uE6oOs22AEO/9f09cad5e7504b8aeed7697d5c8832fa/abbey_road_10.png?w=800&q=100&fm=webp',
            srcSetWebp: '//images.ctfassets.net/i8x1lkvuio7i/3JDzQqutDa6uE6oOs22AEO/9f09cad5e7504b8aeed7697d5c8832fa/abbey_road_10.png?w=200&h=113&q=100&fm=webp 200w,\n//images.ctfassets.net/i8x1lkvuio7i/3JDzQqutDa6uE6oOs22AEO/9f09cad5e7504b8aeed7697d5c8832fa/abbey_road_10.png?w=400&h=225&q=100&fm=webp 400w,\n//images.ctfassets.net/i8x1lkvuio7i/3JDzQqutDa6uE6oOs22AEO/9f09cad5e7504b8aeed7697d5c8832fa/abbey_road_10.png?w=800&h=450&q=100&fm=webp 800w,\n//images.ctfassets.net/i8x1lkvuio7i/3JDzQqutDa6uE6oOs22AEO/9f09cad5e7504b8aeed7697d5c8832fa/abbey_road_10.png?w=1200&h=675&q=100&fm=webp 1200w,\n//images.ctfassets.net/i8x1lkvuio7i/3JDzQqutDa6uE6oOs22AEO/9f09cad5e7504b8aeed7697d5c8832fa/abbey_road_10.png?w=1600&h=900&q=100&fm=webp 1600w,\n//images.ctfassets.net/i8x1lkvuio7i/3JDzQqutDa6uE6oOs22AEO/9f09cad5e7504b8aeed7697d5c8832fa/abbey_road_10.png?w=1920&h=1080&q=100&fm=webp 1920w',
            sizes: '(max-width: 800px) 100vw, 800px'
        },
        resize: {
            src: '//images.ctfassets.net/i8x1lkvuio7i/3JDzQqutDa6uE6oOs22AEO/9f09cad5e7504b8aeed7697d5c8832fa/abbey_road_10.png?w=400&fl=progressive&q=50',
            width: 400,
            height: 225,
            aspectRatio: 1.7777777777777777
        }
    },
    video: {
        id: 'c4JelMRzw1WCsoMGyKQkuUO',
        title: 'abbey road',
        description: '',
        file: {
            url: '//videos.ctfassets.net/i8x1lkvuio7i/4JelMRzw1WCsoMGyKQkuUO/c5c42ec2fd7a6b6b273e2e35b6f32649/abbey_road.mp4',
            fileName: 'abbey_road.mp4',
            contentType: 'video/x-m4v'
        }
    },
    text: {
        childMarkdownRemark: {
            html: '<p>I enjoyed pushing the Web Audio API to its limits on this virtual tour of Abbey Road studios which also entailed lots of WebGL and intricate UI work. I led the development over its year-long gestation. It was well received and won the <a href="https://thefwa.com/cases/inside-abbey-road">FWA Site of the Month.</a> and the Webby Award in the music category.</p>'
        }
    },
    link: 'https://insideabbeyroad.withgoogle.com/',
    links: [
        {
            title: 'Comic Adventure',
            slug: 'comic_adventure'
        },
        {
            title: 'Inside Abbey Road',
            slug: 'inside_abbey_road'
        },
        {
            title: 'Manchester City',
            slug: 'manchester_city'
        },
        {
            title: 'Den Automation',
            slug: 'den_automation'
        },
        {
            title: 'Pokemon Go Live',
            slug: 'pokemon_go_live'
        },
        {
            title: 'Kindernauts',
            slug: 'kindernauts'
        },
        {
            title: 'My Time Is Now',
            slug: 'my_time_is_now'
        },
        {
            title: 'Revolutions in Sound',
            slug: 'revolutions_in_sound'
        },
        {
            title: 'Primo Toys',
            slug: 'primo_toys'
        },
        {
            title: 'Chance Chanel',
            slug: 'chance_chanel'
        },
        {
            title: 'Monty\'s Christmas',
            slug: 'monty_s_christmas'
        },
        {
            title: 'Made',
            slug: 'made'
        },
        {
            title: 'W+K London',
            slug: 'w_k_london'
        },
        {
            title: 'Carousel',
            slug: 'carousel'
        },
        {
            title: 'Unite All Originals',
            slug: 'unite_all_originals'
        },
        {
            title: 'Urban Tour',
            slug: 'urban_tour'
        },
        {
            title: 'Kino',
            slug: 'kino'
        },
        {
            title: 'Happy Inside',
            slug: 'happy_inside'
        },
        {
            title: 'One Life',
            slug: 'one_life'
        },
        {
            title: 'Diesel Island',
            slug: 'diesel_island'
        },
        {
            title: 'Dark Ride',
            slug: 'dark_ride'
        },
        {
            title: 'A Hundred Lovers',
            slug: 'a_hundred_lovers'
        }
    ],
    slug: 'comic_adventure'
};

describe('Detail component', () => {
    it('should render', () => {
        const el = render((
            <MemoryRouter>
                <Detail
                    {...props}
                    LinkComponent={LinkStub}
                />
            </MemoryRouter>
        ));
        expect(el).toMatchSnapshot();
    });
});
