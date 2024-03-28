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
    title: string;
};

const AccordionWithNestedLinks = ({
    children,
    icon: IconComponent,
    title,
}: AccordionWithNestedLinksProps) => (
    <AccordionItem p={0} borderColor="secondary.900">
        <Heading as="p" py={2} fontFamily="Montserrat">
            <AccordionButton>
                <Flex alignItems="center" justifyContent="flex-start" w="full">
                    <Icon as={IconComponent} fontSize="lg" mr={4} />
                    <Text
                        flex={1}
                        textAlign="left"
                        fontWeight="semibold"
                        fontSize="lg"
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
