import React from 'react';

import { Flex, Heading } from '@chakra-ui/react';

import { useIsDevice } from 'src/hooks/useIsDevice';

import rsvpBg from '../../images/the-one-bg11.jpg';

const RsvpLinkButton = () => {
    const { isMobile } = useIsDevice();
    const handleOnClick = () => {
        if (!document) return;
        const element = document.getElementById('rsvp');
        if (!element) return;
        const offset = 85;

        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - (isMobile ? offset : 0);

        if (typeof window === 'undefined') return;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
        });
    };
    return (
        <Flex
            position="absolute"
            right={{
                base: 4,
                lg: 10,
            }}
            bottom={{
                base: 'unset',
                lg: 10,
            }}
            top={{
                base: 4,
                lg: 'unset',
            }}
            justifyContent="center"
            alignItems="center"
            borderRadius="full"
            overflow="hidden"
            boxShadow="1px 1px 5px 7px rgba(207, 207, 207, 0.2)"
            transition="all 0.2s ease-in-out"
            h={{
                base: '60px',
                lg: '80px',
            }}
            w={{
                base: '60px',
                lg: '80px',
            }}
            _hover={{
                transform: 'scale(1.05)',
            }}
            cursor="pointer"
            backgroundImage={`url(${rsvpBg})`}
            transformOrigin="center"
            backgroundSize="cover"
            backgroundPosition="center"
            onClick={handleOnClick}
        >
            <Heading fontSize={{ base: 'xs', lg: 'sm' }}>RSVP</Heading>
        </Flex>
    );
};

export default RsvpLinkButton;
