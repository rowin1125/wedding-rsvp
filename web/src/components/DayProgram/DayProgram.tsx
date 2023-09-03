import {
    Box,
    Container,
    Flex,
    Grid,
    GridItem,
    Heading,
} from '@chakra-ui/react';
import { GiBigDiamondRing, GiPartyFlags } from 'react-icons/gi';
import { HiOutlineUserGroup } from 'react-icons/hi';
import { LuPartyPopper } from 'react-icons/lu';
import { PiChampagneBold, PiForkKnifeBold } from 'react-icons/pi';

const DayProgram = () => {
    const program = [
        {
            icon: HiOutlineUserGroup,
            title: 'Ontvangst',
            time: '14:00',
        },
        {
            icon: GiBigDiamondRing,
            title: 'Ceremonie',
            time: '14:30',
        },
        {
            icon: LuPartyPopper,
            title: 'Toost',
            time: '15:15',
        },
        {
            icon: PiChampagneBold,
            title: 'Borrel',
            time: '15:45',
        },
        {
            icon: PiForkKnifeBold,
            title: 'Diner',
            time: '17:30',
        },
        {
            icon: GiPartyFlags,
            title: 'Feest',
            time: '20:30',
        },
    ];
    return (
        <Box py={{ base: 10, lg: 20 }} id="program">
            <Container>
                <Heading
                    mb={8}
                    fontSize={{
                        base: '3xl',
                        lg: '5xl',
                    }}
                    textAlign="center"
                >
                    Dagprogramma
                </Heading>
                <Flex justifyContent="center" w="full">
                    <Grid
                        gridTemplateColumns="repeat(2, 1fr)"
                        maxW="800px"
                        w="full"
                    >
                        {program.map((item, index) => {
                            const isOdd = index % 2 !== 0;
                            return (
                                <GridItem
                                    colSpan={1}
                                    key={item.title}
                                    position="relative"
                                    _before={{
                                        content: '""',
                                        width: '32px',
                                        height: '3px',
                                        borderRadius: '5px',
                                        backgroundColor: '#f1e8db',
                                        position: 'absolute',
                                        top: isOdd ? '10%' : '65%',
                                        right: isOdd ? 'unset' : '-40px',
                                        left: isOdd ? '-40px' : 'unset',
                                        zIndex: 4,
                                    }}
                                >
                                    <Box
                                        borderLeftWidth={isOdd ? 3 : 0}
                                        borderColor="#f1e8db"
                                        h="250px"
                                        display="flex"
                                        alignItems="center"
                                        justifyContent={
                                            isOdd ? 'flex-end' : 'flex-start'
                                        }
                                        flexDirection="column"
                                        textAlign="center"
                                    >
                                        <Box
                                            as={item.icon}
                                            fontSize="3xl"
                                            color="primary.500"
                                            pos={'relative'}
                                        />

                                        <Heading fontSize="xl" my={2}>
                                            {item.title}
                                        </Heading>
                                        <Heading fontSize="md">
                                            {item.time}
                                        </Heading>
                                    </Box>
                                </GridItem>
                            );
                        })}
                    </Grid>
                </Flex>
            </Container>
        </Box>
    );
};

export default DayProgram;
