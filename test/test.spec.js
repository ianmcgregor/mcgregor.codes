const isString = require('lodash').isString;
const configJson = require('../src/model/model.json');
const workJson = require('../src/model/work.json');
const srcSetJson = require('../src/model/srcset.json');

describe('Config JSON', function() {
    const config = JSON.parse(JSON.stringify(configJson));

    it('should be an object', function() {
        expect(config).to.be.an('object');
    });

    it('should have projects array', function() {
        expect(workJson.work).to.exist;
        expect(workJson.work).to.be.instanceof(Array);
        expect(workJson.work).to.have.length.above(0);
    });

    describe('projects', function() {
        workJson.work.forEach(function(project) {
            it('should have properties', function() {
                expect(project.title).to.be.a('string');
                expect(project.year).to.be.a('number');
                expect(project.images).to.be.instanceof(Array);
                expect(project.images.every(isString)).to.be.true;
                expect(project.text).to.be.instanceof(Array);
                expect(project.text.every(isString)).to.be.true;
                expect(project.link).to.be.a('string');
                expect(project.tags).to.be.instanceof(Array);
                expect(project.tags.every(isString)).to.be.true;
            });
        });
    });

    it('should have srcSet array', function() {
        expect(srcSetJson.srcSet).to.exist;
        expect(srcSetJson.srcSet).to.be.instanceof(Array);
        expect(srcSetJson.srcSet).to.have.length.above(0);
    });

    describe('srcSet', function() {
        srcSetJson.srcSet.forEach(function(src) {
            it('should have properties', function() {
                expect(src.width).to.be.a('number');
                expect(src.vw).to.be.a('number');
            });
        });
    });

});

// describe('Store', function() {
//     const store = require('../src/model/store').store;
//
//     it('should be an object', function() {
//         expect(store).to.be.an('object');
//     });
//
//     it('should return projects', function() {
//         expect(store.getProjects()).to.be.instanceof(Array);
//         expect(store.getProjects()).to.have.length.above(0);
//     });
//
//     it('should return tags', function() {
//         expect(store.getTags()).to.be.instanceof(Array);
//         expect(store.getTags()).to.have.length.above(0);
//     });
//
//     it('should return srcSet', function() {
//         expect(store.getSrcSet()).to.be.instanceof(Array);
//         expect(store.getSrcSet()).to.have.length.above(0);
//     });
//
//     it('should filter projects', function() {
//         const allProjects = store.getProjects();
//         const filter = store.getTags()[0].slug;
//         const filteredProjects = store.getFilteredProjects(filter);
//         expect(filteredProjects).to.be.instanceof(Array);
//         expect(filteredProjects).to.have.length.above(0);
//         expect(filteredProjects).to.have.length.below(allProjects.length);
//     });
//
//     it('should have image names only', function() {
//         function noExt(image) {
//             const ext = image.src.slice(-4);
//             return ext !== '.jpg' && ext !== '.png' && ext !== '.webp';
//         }
//         const allGood = store.getProjects().every(function(project) {
//             return project.images.every(noExt);
//         });
//         expect(allGood).to.be.true;
//     });
//
// });
