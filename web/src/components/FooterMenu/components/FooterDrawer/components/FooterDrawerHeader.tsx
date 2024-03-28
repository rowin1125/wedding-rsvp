import React from 'react';

import { DrawerHeader, Heading, Image } from '@chakra-ui/react';

const FooterDrawerHeader = () => (
    <DrawerHeader
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDir="column"
    >
        <Image src="/Bruiloft buddy logo.png" w={'auto'} my={0} h={40} />
        <Heading fontSize="4xl" mt={4}>
            Bruiloft Buddy
        </Heading>
    </DrawerHeader>
);

export default FooterDrawerHeader;
