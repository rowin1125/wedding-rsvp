import React from 'react';

import { Box, Image, Text, Button, Flex } from '@chakra-ui/react';
import { GetWeddingRsvpLandingPages } from 'types/graphql';

import { routes } from '@redwoodjs/router';
import { Link } from '@redwoodjs/router';

type RsvpLandingPageItemProps = {
    image: string;
    rsvpLandingPage: GetWeddingRsvpLandingPages['weddingRsvpLandingPages'][0];
};

const RsvpLandingPageItem = ({
    image,
    rsvpLandingPage,
}: RsvpLandingPageItemProps) => {
    if (!rsvpLandingPage.id) return null;

    return (
        <Box position="relative" role="group">
            <Text
                fontWeight="bold"
                mb={2}
                isTruncated
                textAlign={{ base: 'center', lg: 'left' }}
            >
                {rsvpLandingPage.name}
            </Text>
            <Box
                _hover={{ transform: 'scale(1.02)' }}
                transition="transform 0.3s ease"
                h="24rem"
                borderRadius="lg"
                position="relative"
                shadow="2xl"
                overflow="hidden"
            >
                <Image
                    src={image}
                    alt={`${rsvpLandingPage.name}`}
                    objectFit="cover"
                    objectPosition="top"
                    w="100%"
                    h="100%"
                />
                <Box
                    position="absolute"
                    inset={0}
                    opacity={0}
                    visibility="hidden"
                    transition="all 0.3s"
                    as={Link}
                    to={routes.rsvpLandingPageStudio({
                        landingPageId: rsvpLandingPage.id,
                        studioTab: 'settings',
                    })}
                    role="button"
                    aria-label={`Bekijk ${rsvpLandingPage.name}`}
                    _groupHover={{ opacity: 1, visibility: 'visible' }}
                >
                    <Box
                        bg="rgba(0, 0, 0, 0.4)"
                        position="absolute"
                        inset={0}
                    />
                    <Flex
                        position="relative"
                        zIndex={10}
                        justify="center"
                        align="center"
                        h="full"
                    >
                        <Button>Bekijk</Button>
                    </Flex>
                </Box>
            </Box>
        </Box>
    );
};

export default RsvpLandingPageItem;
