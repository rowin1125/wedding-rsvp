import React, { createContext, useContext, useState } from 'react';

import { Flex } from '@chakra-ui/react';

type MenuContextProps = {
    activeItem: string | null;
    setActiveItem: React.Dispatch<React.SetStateAction<string | null>>;
};

const MenuContext = createContext<MenuContextProps>({
    activeItem: null,
    setActiveItem: () => null,
});

export const useMenu = () => useContext(MenuContext);

type CustomMenuProps = {
    children: React.ReactNode;
};

const CustomMenu = ({ children }: CustomMenuProps) => {
    const [activeItem, setActiveItem] = useState<string | null>(null);

    return (
        <MenuContext.Provider value={{ activeItem, setActiveItem }}>
            <Flex
                display="inline-flex"
                py={4}
                gap={8}
                onMouseLeave={() => setActiveItem(null)}
            >
                {children}
            </Flex>
        </MenuContext.Provider>
    );
};

export default CustomMenu;
