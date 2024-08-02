import React from 'react';

import { useGetMenuItems } from 'src/hooks/useGetMenuItems';

import AccordionDirectLink from './AccordionDirectLink';
import AccordionWithNestedLinks from './AccordionWithNestedLinks';

type FooterDrawerItemResolverProps = {
    item: ReturnType<typeof useGetMenuItems>[number];
    onClose: () => void;
};

const FooterDrawerItemResolver = ({
    item,
    onClose,
}: FooterDrawerItemResolverProps) => {
    if (item.children?.length)
        return (
            <AccordionWithNestedLinks title={item.label} icon={item.icon}>
                {item.children.map((child) => (
                    <AccordionDirectLink
                        key={child.label}
                        onClose={onClose}
                        nested
                        to={child.to}
                        icon={child.icon}
                    >
                        {child.label}
                    </AccordionDirectLink>
                ))}
            </AccordionWithNestedLinks>
        );

    return (
        <AccordionDirectLink onClose={onClose} to={item.to} icon={item.icon}>
            {item.label}
        </AccordionDirectLink>
    );
};

export default FooterDrawerItemResolver;
