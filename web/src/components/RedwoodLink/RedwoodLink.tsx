/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

import {
    Link as ChakraLink,
    LinkProps as ChakraLinkProps,
} from '@chakra-ui/react';

import { Link } from '@redwoodjs/router';

export type RedwoodLinkProps = { to: string } & ChakraLinkProps;

const RedwoodLink = React.forwardRef<HTMLAnchorElement, RedwoodLinkProps>(
    ({ ...props }, ref) => {
        return (
            <ChakraLink
                ref={ref}
                position={'relative'}
                as={Link}
                _hover={{
                    textDecoration: 'none',
                    _after: {
                        w: '100%',
                        left: 0,
                    },
                }}
                _after={{
                    content: '""',
                    position: 'absolute',
                    bottom: '-1px',
                    left: 0,
                    w: 0,
                    h: '2px',
                    bg: 'secondary.900',
                    transition: 'width 0.3s ease',
                }}
                {...props}
            />
        );
    }
);

export default RedwoodLink;
