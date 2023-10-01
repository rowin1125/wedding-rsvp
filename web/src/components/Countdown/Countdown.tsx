import { useCallback, useEffect, useState } from 'react';

import {
    Box,
    Container,
    ContainerProps,
    Flex,
    Grid,
    GridItem,
    Heading,
} from '@chakra-ui/react';

type CountdownProps = {
    targetDate: string;
    hideDate?: boolean;
} & ContainerProps;

const Countdown = ({ targetDate, hideDate, ...props }: CountdownProps) => {
    const calculateTimeLeft = useCallback(() => {
        const now = new Date().getTime();
        const targetTime = new Date(targetDate).getTime();
        const timeDifference = targetTime - now;

        if (timeDifference <= 0) {
            return {
                seconden: 0,
                minuten: 0,
                uren: 0,
                dagen: 0,
                maanden: 0,
            };
        }

        const seconden = Math.floor((timeDifference / 1000) % 60);
        const uren = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
        const minuten = Math.floor((timeDifference / 1000 / 60) % 60);
        const dagen = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

        return {
            seconden,
            minuten,
            uren,
            dagen,
            // maanden,
        };
    }, [targetDate]);

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, [calculateTimeLeft, targetDate]);

    const timeMap = Object.keys(timeLeft)
        .map((key) => key)
        .reverse();

    return (
        <Container as="section" my={20} w="full" {...props}>
            <Box maxW="1000px" mx="auto">
                <Grid
                    templateColumns={{
                        base: 'repeat(4, 1fr)',
                        lg: 'repeat(4, 1fr)',
                    }}
                    gap={4}
                >
                    {!hideDate && (
                        <GridItem colSpan={4} mb={10}>
                            <Flex justifyContent="center">
                                <Heading
                                    fontSize={{
                                        base: '2xl',
                                        lg: '4xl',
                                    }}
                                    borderRightWidth={2}
                                    borderColor="tertairy.900"
                                    py={4}
                                    px={8}
                                >
                                    16
                                </Heading>

                                <Heading
                                    fontSize={{
                                        base: '2xl',
                                        lg: '4xl',
                                    }}
                                    borderRightWidth={2}
                                    borderColor="tertairy.900"
                                    py={4}
                                    px={8}
                                >
                                    mei
                                </Heading>
                                <Heading
                                    fontSize={{
                                        base: '2xl',
                                        lg: '4xl',
                                    }}
                                    py={4}
                                    px={8}
                                >
                                    2024
                                </Heading>
                            </Flex>
                        </GridItem>
                    )}

                    {timeMap.map((key) => {
                        return (
                            <GridItem colSpan={{ base: 2, lg: 1 }} key={key}>
                                <Box>
                                    <Heading
                                        fontSize={{
                                            base: '4xl',
                                            lg: '100px',
                                        }}
                                        fontWeight="bold"
                                        color="#f1e8db"
                                        textAlign="center"
                                    >
                                        {timeLeft[key as keyof typeof timeLeft]}
                                    </Heading>
                                    <Heading fontSize="3xl" textAlign="center">
                                        {key.split('')[0].toUpperCase() +
                                            key.slice(1)}
                                    </Heading>
                                </Box>
                            </GridItem>
                        );
                    })}
                </Grid>
            </Box>
        </Container>
    );
};

export default Countdown;
