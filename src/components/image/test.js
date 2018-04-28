import React from 'react';
import {render} from 'enzyme';
import Image from './';

const props = {
    image: {
        id: 'c3Bh6RazkvSucssagW2GquS',
        title: 'comic-adventure',
        description: '',
        resolutions: {
            aspectRatio: 1.7777777777777777,
            width: 400,
            height: 225,
            src: '//images.ctfassets.net/i8x1lkvuio7i/3Bh6RazkvSucssagW2GquS/a260280a7ec428b7a7ed1dec713df2a1/comic-adventure.png?w=400&q=50',
            srcSet: '//images.ctfassets.net/i8x1lkvuio7i/3Bh6RazkvSucssagW2GquS/a260280a7ec428b7a7ed1dec713df2a1/comic-adventure.png?w=400&h=225&q=50 1x,\n//images.ctfassets.net/i8x1lkvuio7i/3Bh6RazkvSucssagW2GquS/a260280a7ec428b7a7ed1dec713df2a1/comic-adventure.png?w=600&h=338&q=50 1.5x,\n//images.ctfassets.net/i8x1lkvuio7i/3Bh6RazkvSucssagW2GquS/a260280a7ec428b7a7ed1dec713df2a1/comic-adventure.png?w=800&h=450&q=50 2x,\n//images.ctfassets.net/i8x1lkvuio7i/3Bh6RazkvSucssagW2GquS/a260280a7ec428b7a7ed1dec713df2a1/comic-adventure.png?w=1200&h=675&q=50 3x',
            srcWebp: '//images.ctfassets.net/i8x1lkvuio7i/3Bh6RazkvSucssagW2GquS/a260280a7ec428b7a7ed1dec713df2a1/comic-adventure.png?w=400&q=50&fm=webp',
            srcSetWebp: '//images.ctfassets.net/i8x1lkvuio7i/3Bh6RazkvSucssagW2GquS/a260280a7ec428b7a7ed1dec713df2a1/comic-adventure.png?w=400&h=225&q=50&fm=webp 1x,\n//images.ctfassets.net/i8x1lkvuio7i/3Bh6RazkvSucssagW2GquS/a260280a7ec428b7a7ed1dec713df2a1/comic-adventure.png?w=600&h=338&q=50&fm=webp 1.5x,\n//images.ctfassets.net/i8x1lkvuio7i/3Bh6RazkvSucssagW2GquS/a260280a7ec428b7a7ed1dec713df2a1/comic-adventure.png?w=800&h=450&q=50&fm=webp 2x,\n//images.ctfassets.net/i8x1lkvuio7i/3Bh6RazkvSucssagW2GquS/a260280a7ec428b7a7ed1dec713df2a1/comic-adventure.png?w=1200&h=675&q=50&fm=webp 3x'
        },
        file: {
            url: '//images.ctfassets.net/i8x1lkvuio7i/3Bh6RazkvSucssagW2GquS/a260280a7ec428b7a7ed1dec713df2a1/comic-adventure.png',
            fileName: 'comic-adventure.png',
            contentType: 'image/png'
        },
        sizes: {
            aspectRatio: 1.7777777777777777,
            src: '//images.ctfassets.net/i8x1lkvuio7i/3Bh6RazkvSucssagW2GquS/a260280a7ec428b7a7ed1dec713df2a1/comic-adventure.png?w=800&q=100',
            srcSet: '//images.ctfassets.net/i8x1lkvuio7i/3Bh6RazkvSucssagW2GquS/a260280a7ec428b7a7ed1dec713df2a1/comic-adventure.png?w=200&h=113&q=100 200w,\n//images.ctfassets.net/i8x1lkvuio7i/3Bh6RazkvSucssagW2GquS/a260280a7ec428b7a7ed1dec713df2a1/comic-adventure.png?w=400&h=225&q=100 400w,\n//images.ctfassets.net/i8x1lkvuio7i/3Bh6RazkvSucssagW2GquS/a260280a7ec428b7a7ed1dec713df2a1/comic-adventure.png?w=800&h=450&q=100 800w,\n//images.ctfassets.net/i8x1lkvuio7i/3Bh6RazkvSucssagW2GquS/a260280a7ec428b7a7ed1dec713df2a1/comic-adventure.png?w=1200&h=675&q=100 1200w,\n//images.ctfassets.net/i8x1lkvuio7i/3Bh6RazkvSucssagW2GquS/a260280a7ec428b7a7ed1dec713df2a1/comic-adventure.png?w=1600&h=900&q=100 1600w,\n//images.ctfassets.net/i8x1lkvuio7i/3Bh6RazkvSucssagW2GquS/a260280a7ec428b7a7ed1dec713df2a1/comic-adventure.png?w=2400&h=1350&q=100 2400w,\n//images.ctfassets.net/i8x1lkvuio7i/3Bh6RazkvSucssagW2GquS/a260280a7ec428b7a7ed1dec713df2a1/comic-adventure.png?w=2560&h=1440&q=100 2560w',
            srcWebp: '//images.ctfassets.net/i8x1lkvuio7i/3Bh6RazkvSucssagW2GquS/a260280a7ec428b7a7ed1dec713df2a1/comic-adventure.png?w=800&q=100&fm=webp',
            srcSetWebp: '//images.ctfassets.net/i8x1lkvuio7i/3Bh6RazkvSucssagW2GquS/a260280a7ec428b7a7ed1dec713df2a1/comic-adventure.png?w=200&h=113&q=100&fm=webp 200w,\n//images.ctfassets.net/i8x1lkvuio7i/3Bh6RazkvSucssagW2GquS/a260280a7ec428b7a7ed1dec713df2a1/comic-adventure.png?w=400&h=225&q=100&fm=webp 400w,\n//images.ctfassets.net/i8x1lkvuio7i/3Bh6RazkvSucssagW2GquS/a260280a7ec428b7a7ed1dec713df2a1/comic-adventure.png?w=800&h=450&q=100&fm=webp 800w,\n//images.ctfassets.net/i8x1lkvuio7i/3Bh6RazkvSucssagW2GquS/a260280a7ec428b7a7ed1dec713df2a1/comic-adventure.png?w=1200&h=675&q=100&fm=webp 1200w,\n//images.ctfassets.net/i8x1lkvuio7i/3Bh6RazkvSucssagW2GquS/a260280a7ec428b7a7ed1dec713df2a1/comic-adventure.png?w=1600&h=900&q=100&fm=webp 1600w,\n//images.ctfassets.net/i8x1lkvuio7i/3Bh6RazkvSucssagW2GquS/a260280a7ec428b7a7ed1dec713df2a1/comic-adventure.png?w=2400&h=1350&q=100&fm=webp 2400w,\n//images.ctfassets.net/i8x1lkvuio7i/3Bh6RazkvSucssagW2GquS/a260280a7ec428b7a7ed1dec713df2a1/comic-adventure.png?w=2560&h=1440&q=100&fm=webp 2560w',
            sizes: '(max-width: 800px) 100vw, 800px'
        },
        resize: {
            src: '//images.ctfassets.net/i8x1lkvuio7i/3Bh6RazkvSucssagW2GquS/a260280a7ec428b7a7ed1dec713df2a1/comic-adventure.png?w=400&fl=progressive&q=50',
            width: 400,
            height: 225,
            aspectRatio: 1.7777777777777777
        }
    }
};

describe('Image component', () => {
    it('should render', () => {
        const el = render((
            <Image {...props}/>
        ));
        expect(el).toMatchSnapshot();
    });
});
