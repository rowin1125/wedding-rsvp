import React from 'react';

import {
    Box,
    Container,
    Grid,
    GridItem,
    Heading,
    Image,
} from '@chakra-ui/react';

type ImageTextBlockProps = {
    image: string;
    children: React.ReactNode;
    imageFirst?: boolean;
    title: string;
};

const ImageTextBlock = ({
    children,
    image,
    title,
    imageFirst,
}: ImageTextBlockProps) => {
    return (
        <Box py={{ base: 10, lg: 20 }}>
            <Container>
                <Grid
                    templateColumns="repeat(2, 1fr)"
                    gap={{
                        base: 0,
                        lg: 10,
                    }}
                    rowGap={6}
                >
                    <GridItem
                        colSpan={{ base: 2, lg: 1 }}
                        h="full"
                        order={{ base: imageFirst ? 1 : 0 }}
                    >
                        {children}
                    </GridItem>
                    <GridItem
                        colSpan={{ base: 2, lg: 1 }}
                        h="full"
                        position="relative"
                        order={{ base: -1, lg: imageFirst ? 0 : 1 }}
                        minH="300px"
                    >
                        <Heading
                            textAlign="center"
                            fontSize="3xl"
                            mb={4}
                            display={{ base: 'block', lg: 'none' }}
                        >
                            {title}
                        </Heading>
                        <Image
                            src={image}
                            objectFit={'contain'}
                            w="full"
                            height={{ base: '300px', lg: '500px' }}
                        />
                    </GridItem>
                </Grid>
            </Container>
        </Box>
    );
};

export default ImageTextBlock;
