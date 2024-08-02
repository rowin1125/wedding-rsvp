import React from 'react';

import { useGetMenuItems } from 'src/hooks/useGetMenuItems';

import FooterMenuItem from './FooterMenuItem';
import FooterMenuItemChild from './FooterMenuItemChild';

type FooterMenuItemResolverProps = {
    item: ReturnType<typeof useGetMenuItems>[number];
};

const FooterMenuItemResolver = ({ item }: FooterMenuItemResolverProps) => {
    if (item.children?.length)
        return (
            <FooterMenuItem title={item.label} icon={item.icon}>
                {item.children.map((child) => (
                    <FooterMenuItemChild
                        key={child.label}
                        icon={child.icon}
                        divider={false}
                        to={child.to}
                    >
                        {child.label}
                    </FooterMenuItemChild>
                ))}
            </FooterMenuItem>
        );

    return (
        <FooterMenuItem
            title={item.label}
            icon={item.icon}
            to={item.to}
            iconProps={{
                fontSize: 'xl',
            }}
        />
    );
};

export default FooterMenuItemResolver;
