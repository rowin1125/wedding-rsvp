import React from "react";

import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    Flex,
    Icon,
    Text,
} from "@chakra-ui/react";
import { IconType } from "react-icons";

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
    <Accordion allowToggle>
        <AccordionItem borderColor="black" borderBottom={0}>
            <Box as="h2" color="black" py={1}>
                <AccordionButton pl={0}>
                    <Flex
                        alignItems="center"
                        justifyContent="flex-start"
                        w="full"
                    >
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
                            fontSize="md"
                            color="black"
                        >
                            {title}
                        </Text>
                    </Flex>
                    <AccordionIcon />
                </AccordionButton>
            </Box>
            <AccordionPanel pb={4}>
                <Flex flexDirection="column">{children}</Flex>
            </AccordionPanel>
        </AccordionItem>
    </Accordion>
);

export default AccordionWithNestedLinks;
