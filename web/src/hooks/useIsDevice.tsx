import { useBreakpoint } from '@chakra-ui/react';

export const useIsDevice = () => {
    const breakpoint = useBreakpoint();

    const isMobile = ['base', 'sm'].includes(breakpoint);
    const isTablet = ['md'].includes(breakpoint);
    const isDesktop = ['lg', 'xl', '2xl'].includes(breakpoint);

    return {
        isMobile,
        isTablet,
        isDesktop,
    };
};
