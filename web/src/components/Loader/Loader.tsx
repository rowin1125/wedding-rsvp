import React from 'react';

import {
    Center,
    Container,
    ContainerProps,
    Spinner,
    SpinnerProps,
} from '@chakra-ui/react';

type LoaderProps = {
    hideMargin?: boolean;
    spinnerProps?: SpinnerProps;
} & ContainerProps;

const Loader = ({
    hideMargin = false,
    spinnerProps,
    ...props
}: LoaderProps) => {
    return (
        <Container
            p="1rem"
            mt={{ base: 0, md: hideMargin ? 0 : 20 }}
            mb={hideMargin ? 0 : 20}
            {...props}
        >
            <Center>
                <Spinner {...spinnerProps} />
            </Center>
        </Container>
    );
};

export default Loader;
