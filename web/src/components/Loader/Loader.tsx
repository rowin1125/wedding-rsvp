import React from 'react';

import { Center, Container, ContainerProps, Spinner } from '@chakra-ui/react';

type LoaderProps = {
    hideMargin?: boolean;
} & ContainerProps;

const Loader = ({ hideMargin = false, ...props }: LoaderProps) => {
    return (
        <Container
            p="1rem"
            maxW="8xl"
            mt={{ base: 0, md: hideMargin ? 0 : 20 }}
            mb={hideMargin ? 0 : 20}
            {...props}
        >
            <Center>
                <Spinner />
            </Center>
        </Container>
    );
};

export default Loader;
