import React from 'react';

import { Box, BoxProps, Button, Icon, IconProps, Text } from '@chakra-ui/react';
import { IconType } from 'react-icons/lib';

import RedwoodLink from 'src/components/RedwoodLink';

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
            borderColor={nested ? '' : 'gray.100'}
            borderTop={nested ? '' : '1px'}
            py={nested ? 0 : 2}
            onClick={onClose}
            {...props}
        >
            <Button
                py={nested ? 0 : 2}
                as={as || RedwoodLink}
                {...linkProps}
                display="flex"
                alignItems="center"
                justifyContent="flex-start"
            >
                <Icon
                    as={IconComponent}
                    fontSize="lg"
                    color="white"
                    mr={4}
                    {...iconProps}
                />
                <Text fontWeight="bold" fontSize="lg" color="white">
                    {children}
                </Text>
            </Button>
        </Box>
    );
};

export default AccordionDirectLink;
