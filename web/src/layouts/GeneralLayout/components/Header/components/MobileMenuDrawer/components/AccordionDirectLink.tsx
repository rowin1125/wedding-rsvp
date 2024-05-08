import React from 'react';

import {
    Box,
    BoxProps,
    Button,
    Icon,
    IconProps,
    Text,
    TextProps,
} from '@chakra-ui/react';
import { IconType } from 'react-icons/lib';

import { Link } from '@redwoodjs/router';

type AccordionDirectLinkProps = {
    children: React.ReactNode;
    nested?: boolean;
    icon: IconType;
    onClose: () => void;
    iconProps?: IconProps;
    containerProps?: BoxProps;
    textProps?: TextProps;
    to?: string;
    variant?: string;
};

const AccordionDirectLink = ({
    children,
    nested,
    icon: IconComponent,
    onClose,
    iconProps,
    containerProps,
    textProps,
    ...props
}: AccordionDirectLinkProps) => {
    return (
        <Box
            borderColor={nested ? '' : 'primary.900'}
            borderTop={nested ? '' : '1px'}
            py={nested ? 0 : 2}
            onClick={onClose}
            {...containerProps}
        >
            <Button
                py={nested ? 0 : 2}
                as={Link}
                display="flex"
                alignItems="center"
                justifyContent="flex-start"
                {...props}
            >
                <Icon
                    as={IconComponent}
                    fontSize="md"
                    color="inherit"
                    mr={4}
                    {...iconProps}
                />
                <Text
                    fontWeight="bold"
                    fontSize="md"
                    color="inherit"
                    {...textProps}
                >
                    {children}
                </Text>
            </Button>
        </Box>
    );
};

export default AccordionDirectLink;
