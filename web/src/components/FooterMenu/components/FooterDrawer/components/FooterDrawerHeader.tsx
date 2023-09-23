import React from 'react';

import { DrawerHeader, Image } from '@chakra-ui/react';

const FooterDrawerHeader = () => (
    <DrawerHeader
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDir="column"
    >
        <Image src="/Logo-wedding.png" w={'200px'} my={0} h="auto" />
    </DrawerHeader>
);

export default FooterDrawerHeader;
