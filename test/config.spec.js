const expect = require('chai').expect;
const isString = require('lodash').isString;
const structureJson = require('../src/model/structure.json');
const workJson = require('../src/model/work.json');
const srcSetJson = require('../src/model/srcset.json');

describe('Config', () => {
    const structure = JSON.parse(JSON.stringify(structureJson));

    it('should be an object', () => {
        expect(structure).to.be.an('object');
        expect(structure.title).to.be.a('string');
        expect(structure.description).to.be.a('string');
        expect(structure.url).to.be.a('string');
        expect(structure.sections).to.be.instanceof(Array);
        expect(structure.sections).to.have.length.above(0);
    });

    it('should have projects array', () => {
        expect(workJson.work).to.exist;
        expect(workJson.work).to.be.instanceof(Array);
        expect(workJson.work).to.have.length.above(0);
    });

    describe('projects', () => {
        workJson.work.forEach(project => {
            it('should have properties', () => {
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

    it('should have srcSet array', () => {
        expect(srcSetJson.srcSet).to.exist;
        expect(srcSetJson.srcSet).to.be.instanceof(Array);
        expect(srcSetJson.srcSet).to.have.length.above(0);
    });

    describe('srcSet', () => {
        srcSetJson.srcSet.forEach(src => {
            it('should have properties', () => {
                expect(src.width).to.be.a('number');
                expect(src.vw).to.be.a('number');
            });
        });
    });

});
