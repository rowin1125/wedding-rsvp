import React from 'react';

import { Box, BoxProps, Icon, IconProps, Text } from '@chakra-ui/react';
import { IconType } from 'react-icons/lib';

import RedwoodLink, {
    RedwoodLinkProps,
} from 'src/components/RedwoodLink/RedwoodLink';

type AccordionDirectLinkProps = {
    children: React.ReactNode;
    nested?: boolean;
    icon: IconType;
    onClose: () => void;
    iconProps?: IconProps;
    containerProps?: BoxProps;
} & RedwoodLinkProps;

const AccordionDirectLink = ({
    children,
    nested,
    icon: IconComponent,
    onClose,
    iconProps,
    containerProps,
    ...props
}: AccordionDirectLinkProps) => {
    return (
        <Box
            borderColor={nested ? '' : 'gray.100'}
            borderTop={nested ? '' : '1px'}
            py={nested ? 0 : 2}
            onClick={onClose}
            {...containerProps}
        >
            <RedwoodLink
                display="flex"
                alignItems="center"
                justifyContent="flex-start"
                {...props}
            >
                <Icon
                    as={IconComponent}
                    fontSize="lg"
                    color="black"
                    mr={4}
                    {...iconProps}
                />
                <Text fontWeight="bold" fontSize="lg" color="black">
                    {children}
                </Text>
            </RedwoodLink>
        </Box>
    );
};

export default AccordionDirectLink;
