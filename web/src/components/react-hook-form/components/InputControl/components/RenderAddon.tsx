import React from 'react';

type RenderAddonProps = {
    element: React.ReactNode | (() => React.ReactNode);
};

const RenderAddon = ({ element }: RenderAddonProps) => {
    if (typeof element === 'string') {
        return <>{element}</>;
    }

    if (typeof element === 'function') {
        return element();
    }

    return element;
};

export default RenderAddon;
