import React from 'react';

const TitleElement = props => {
    return <h1 {...props.attributes}>{props.children}</h1>;
}

export default TitleElement;