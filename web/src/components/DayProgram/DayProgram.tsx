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
import { MdOutlineWavingHand } from 'react-icons/md';
import { PiChampagneBold, PiForkKnifeBold } from 'react-icons/pi';
import { InvitationType } from 'types/graphql';

type DayProgramProps = {
    invitationType: InvitationType;
};

const DayProgram = ({ invitationType }: DayProgramProps) => {
    const programData = {
        DAY: {
            title: 'Dagprogramma',
            items: [
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
                    title: "Borrel & Foto's",
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
                {
                    icon: MdOutlineWavingHand,
                    title: 'Uitzwaaien',
                    time: '01:00',
                },
            ],
        },
        EVENING: {
            title: 'Avondprogramma',
            items: [
                {
                    icon: HiOutlineUserGroup,
                    title: 'Ontvangst',
                    time: '20:00',
                },
                {
                    icon: PiChampagneBold,
                    title: 'Feest',
                    time: '20:30',
                },
                {
                    icon: GiPartyFlags,
                    title: 'Voetjes van de vloer',
                    time: '22:00',
                },
                {
                    icon: MdOutlineWavingHand,
                    title: 'Uitzwaaien',
                    time: '01:00',
                },
            ],
        },
    };

    const program = programData[invitationType];
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
                    {program.title}
                </Heading>
                <Flex justifyContent="center" w="full">
                    <Grid
                        gridTemplateColumns="repeat(2, 1fr)"
                        maxW="800px"
                        w="full"
                    >
                        {program.items.map((item, index) => {
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
                                        top: isOdd ? '65%' : '10%',
                                        right: isOdd ? 'unset' : '4px',
                                        left: isOdd ? '6px' : 'unset',
                                        zIndex: 4,
                                    }}
                                >
                                    <Box
                                        borderRightWidth={isOdd ? 0 : 3}
                                        borderColor="#f1e8db"
                                        h={'250px'}
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
                                            color="body.500"
                                            pos={'relative'}
                                        />

                                        <Heading
                                            fontSize="xl"
                                            my={2}
                                            color="body.500"
                                        >
                                            {item.title}
                                        </Heading>
                                        <Heading fontSize="md" color="body.500">
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
