import React from 'react';
import {Portal} from 'react-portal';

const Yield = ({name, className, children}) => {
    if (!name)
        return null;

    if (children)
        return (
            <Portal node={document && document.getElementById(name)}>
                {children}
            </Portal>
        );

    return (
        <div className={className} id={name} />
    );
};

export default Yield;