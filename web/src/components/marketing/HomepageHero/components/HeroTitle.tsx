import React from 'react';

import { Heading } from '@chakra-ui/react';

const HeroTitle = () => {
    return (
        <Heading
            py={16}
            as="h1"
            fontSize={{
                base: '50px',
                lg: '100px',
            }}
            mb={4}
            mt={8}
            color="white"
            fontWeight="extrabold"
            lineHeight="shorter"
            letterSpacing="tight"
            textAlign="center"
        >
            Bruiloft buddy
        </Heading>
    );
};

export default HeroTitle;
