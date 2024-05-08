import React from 'react';

import {
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Flex,
    Heading,
    Icon,
    Text,
} from '@chakra-ui/react';
import { IconType } from 'react-icons';

type AccordionWithNestedLinksProps = {
    children: React.ReactNode;
    icon: IconType;
    title: string;
};

const AccordionWithNestedLinks = ({
    children,
    title,
    icon: IconComponent,
}: AccordionWithNestedLinksProps) => (
    <AccordionItem p={0} borderColor="gray.100">
        <Heading as="h2" color="black" py={2}>
            <AccordionButton>
                <Flex alignItems="center" justifyContent="flex-start" w="full">
                    <Icon
                        as={IconComponent}
                        fontSize="lg"
                        color="black"
                        mr={4}
                    />
                    <Text
                        flex={1}
                        textAlign="left"
                        fontWeight="bold"
                        fontSize="lg"
                        color="black"
                    >
                        {title}
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
