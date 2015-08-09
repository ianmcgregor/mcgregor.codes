'use strict';

var isString = require('lodash').isString;

describe('Config JSON', function() {
    var config = require('../src/model/config.json');
    config = JSON.parse(JSON.stringify(config));

    it('should be an object', function() {
        expect(config).to.be.an('object');
    });

    it('should have projects array', function() {
        expect(config.projects).to.exist;
        expect(config.projects).to.be.instanceof(Array);
        expect(config.projects).to.have.length.above(0);
    });

    config.projects.forEach(function(project) {
        it('should have properties', function() {
            expect(project.title).to.be.a('string');
            expect(project.year).to.be.a('number');
            expect(project.visible).to.be.a('boolean');
            expect(project.layout).to.be.a('string');
            expect(project.thumb).to.be.a('string');
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

describe('Store', function() {
    var store = require('../src/model/store').store;

    it('should be an object', function() {
        expect(store).to.be.an('object');
    });

    it('should return projects', function() {
        expect(store.getProjects()).to.be.instanceof(Array);
    });

    it('should return tags', function() {
        expect(store.getTags()).to.be.instanceof(Array);
    });

    it('should filter projects', function() {
        var allProjects = store.getProjects();
        var filter = store.getTags()[0].slug;
        var filteredProjects = store.getFilteredProjects(filter);
        expect(filteredProjects).to.be.instanceof(Array);
        expect(filteredProjects).to.have.length.above(0);
        expect(filteredProjects).to.have.length.below(allProjects.length);
    });

    it('should have image names only', function() {
        function noExt(image) {
            // console.log(image.src);
            var ext = image.src.slice(-4);
            return ext !== '.jpg' && ext !== '.png' && ext !== '.webp';
        }
        var allGood = store.getProjects().every(function(project) {
            var thumbGood = noExt(project.thumb);
            var imagesGood = project.images.every(noExt);
            return thumbGood && imagesGood;
        });
        expect(allGood).to.be.true;
    });

});
