import React from 'react';

const BoldElement = props => {
    return <b {...props.attributes}>{props.children}</b>;
}

export default BoldElement;