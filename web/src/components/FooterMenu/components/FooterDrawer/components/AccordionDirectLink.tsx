import React from 'react';

import { Box, BoxProps, Button, Icon, IconProps, Text } from '@chakra-ui/react';
import { IconType } from 'react-icons/lib';

import { Link } from '@redwoodjs/router';

type AccordionDirectLinkProps = {
    to: string;
    children: React.ReactNode;
    nested?: boolean;
    icon: IconType;
    onClose: () => void;
    iconProps?: IconProps;
} & BoxProps;

const AccordionDirectLink = ({
    to,
    children,
    nested,
    icon: IconComponent,
    onClose,
    iconProps,
    as,
    ...props
}: AccordionDirectLinkProps) => {
    const isRegularLink = as === 'a';
    const linkProps = isRegularLink ? { href: to } : { to };
    return (
        <Box
            borderColor={nested ? '' : 'secondary.900'}
            borderTop={nested ? '' : '1px'}
            py={nested ? 1 : 2}
            onClick={onClose}
            {...props}
        >
            <Button
                py={nested ? 0 : 2}
                as={as || Link}
                {...linkProps}
                display="flex"
                alignItems="center"
                justifyContent="flex-start"
                colorScheme="primary"
            >
                <Icon
                    color="secondary.900"
                    as={IconComponent}
                    fontSize="lg"
                    mr={4}
                    {...iconProps}
                />
                <Text fontWeight="semibold" fontSize="lg">
                    {children}
                </Text>
            </Button>
        </Box>
    );
};

export default AccordionDirectLink;
