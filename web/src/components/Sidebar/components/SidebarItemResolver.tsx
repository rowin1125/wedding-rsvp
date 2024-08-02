import React from 'react';

import { routes } from '@redwoodjs/router';

import { useGetMenuItems } from 'src/hooks/useGetMenuItems';

import SidebarItem from './SidebarItem';
import SidebarItemChild from './SidebarItemChild';

type SidebarItemResolverProps = {
    item: ReturnType<typeof useGetMenuItems>[number];
    navOpen: boolean;
};

const SidebarItemResolver = ({ item, navOpen }: SidebarItemResolverProps) => {
    if (item.children?.length)
        return (
            <SidebarItem
                navOpen={navOpen}
                icon={item.icon}
                title={item.label}
                to={routes.dashboard()}
            >
                {item.children.map((child) => {
                    if (child.children?.length)
                        return (
                            <SidebarItemResolver
                                key={child.label}
                                item={child}
                                navOpen={navOpen}
                            />
                        );
                    return (
                        <SidebarItemChild
                            key={child.label}
                            icon={child.icon}
                            divider={false}
                            to={child.to}
                        >
                            {child.label}
                        </SidebarItemChild>
                    );
                })}
            </SidebarItem>
        );

    return (
        <SidebarItem
            navOpen={navOpen}
            icon={item.icon}
            title={item.label}
            to={item.to}
        />
    );
};

export default SidebarItemResolver;
