import React from 'react';

const ItalicElement = props => {
    return <em {...props.attributes}>{props.children}</em>;
}

export default ItalicElement;