import React from 'react';
import Info from '../info';
import Picture from '../picture';

export default function Project({project, srcSet, index, filter}) {
    const {images} = project;
    const [img] = images;

    let picture = '';

    if (index === 0 && project.video) {
        picture = <video src={project.video[0]} loop={true} autoPlay={true} muted={true} />;
    } else if (img) {
        picture = <Picture img={img} srcSet={srcSet} />;
    }

    return (
        <div className="Project" style={{
            transitionDelay: `${index * 0.1}s`
        }}>
            <div className="Project-inner">
                <div className="Project-image">{picture}</div>
                <Info project={project} filter={filter}/>
            </div>
        </div>
    );
}
