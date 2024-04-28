import React from 'react';

import { Box, BoxProps } from '@chakra-ui/react';

import { HeroData } from 'src/components/Hero/Hero';

type AdminContentWrapperProps = {
    children: React.ReactNode;
    setHeroData?: (data: HeroData) => void;
} & BoxProps;

export const HeroContext = React.createContext<
    | {
          setHeroData?: (data: HeroData) => void;
      }
    | undefined
>(undefined);

export const useHeroContext = () => {
    const context = React.useContext(HeroContext);
    if (context === undefined) {
        throw new Error('useHeroContext must be used within a HeroProvider');
    }
    return context;
};

const AdminContentWrapper = ({
    setHeroData,
    ...props
}: AdminContentWrapperProps) => {
    return (
        <HeroContext.Provider
            value={{
                setHeroData: setHeroData,
            }}
        >
            <Box p={4} {...props} position="relative">
                {props.children}
            </Box>
        </HeroContext.Provider>
    );
};

export default AdminContentWrapper;
