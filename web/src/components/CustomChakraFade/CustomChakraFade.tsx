import React from 'react';

import { Box, BoxProps, Fade, FadeProps } from '@chakra-ui/react';

type CustomChakraFadeProps = FadeProps & {
    children: React.ReactNode;
    boxProps?: BoxProps;
};

const CustomChakraFade = (props: CustomChakraFadeProps) => {
    return (
        <Fade {...props}>
            <Box display={props.in ? 'block' : 'none'} {...props.boxProps}>
                {props.children}
            </Box>
        </Fade>
    );
};

export default CustomChakraFade;
