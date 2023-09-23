import React from 'react';

import {
    AccordionItem,
    Heading,
    AccordionButton,
    AccordionIcon,
    AccordionPanel,
    Flex,
    Text,
    Icon,
} from '@chakra-ui/react';
import { IconType } from 'react-icons';

type AccordionWithNestedLinksProps = {
    children: React.ReactNode;
    icon: IconType;
};

const AccordionWithNestedLinks = ({
    children,
    icon: IconComponent,
}: AccordionWithNestedLinksProps) => (
    <AccordionItem p={0} borderColor="gray.100">
        <Heading as="h2" color="white" py={2}>
            <AccordionButton>
                <Flex alignItems="center" justifyContent="flex-start" w="full">
                    <Icon
                        as={IconComponent}
                        fontSize="lg"
                        color="white"
                        mr={4}
                    />
                    <Text
                        flex={1}
                        textAlign="left"
                        fontWeight="bold"
                        fontSize="lg"
                        color="white"
                    >
                        Team
                    </Text>
                </Flex>
                <AccordionIcon />
            </AccordionButton>
        </Heading>
        <AccordionPanel pb={4}>
            <Flex flexDirection="column">{children}</Flex>
        </AccordionPanel>
    </AccordionItem>
);

export default AccordionWithNestedLinks;
