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

    const month = new Date(targetDate).toLocaleString('default', {
        month: 'long',
    });

    const day = new Date(targetDate).getDate();
    const year = new Date(targetDate).getFullYear();

    return (
        <Container as="section" py={20} w="full" {...props}>
            <Box maxW="1000px" mx="auto">
                <Grid
                    templateColumns={{
                        base: 'repeat(12, 1fr)',
                        lg: 'repeat(12, 1fr)',
                    }}
                    gap={4}
                >
                    {!hideDate && (
                        <GridItem colSpan={12} mb={10}>
                            <Flex justifyContent="center">
                                <Heading
                                    fontSize={{
                                        base: '2xl',
                                        lg: '4xl',
                                    }}
                                    borderRightWidth={2}
                                    borderColor={props.color}
                                    py={4}
                                    px={8}
                                    color={props.color}
                                >
                                    {day}
                                </Heading>

                                <Heading
                                    fontSize={{
                                        base: '2xl',
                                        lg: '4xl',
                                    }}
                                    borderRightWidth={2}
                                    borderColor={props.color}
                                    py={4}
                                    px={8}
                                    color={props.color}
                                >
                                    {month}
                                </Heading>
                                <Heading
                                    fontSize={{
                                        base: '2xl',
                                        lg: '4xl',
                                    }}
                                    py={4}
                                    px={8}
                                    color={props.color}
                                >
                                    {year}
                                </Heading>
                            </Flex>
                        </GridItem>
                    )}

                    {timeMap.map((key) => {
                        return (
                            <GridItem colSpan={{ base: 6, lg: 3 }} key={key}>
                                <Box>
                                    <Heading
                                        fontSize={{
                                            base: '4xl',
                                            lg: '100px',
                                        }}
                                        fontWeight="bold"
                                        color={props.color}
                                        textAlign="center"
                                    >
                                        {timeLeft[key as keyof typeof timeLeft]}
                                    </Heading>
                                    <Heading
                                        fontSize="3xl"
                                        textAlign="center"
                                        color={props.color}
                                    >
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
