import { Fragment } from 'react';

import { Box, Grid, GridItem, Heading } from '@chakra-ui/react';

import { MvpBlockProps } from '../PuckStudio/blocks/MvpBlock';
import Tiptap from '../PuckStudio/blocks/RickTextBlock/components/Tiptap/components/Tiptap';

import MasterOfCeremonyItem from './components/MasterOfCeremonyItem';
import WitnessesItem from './components/WitnessesItem';

const Mvps = ({
    masterOfCeremonyTitle,
    mastersOfCeremony,
    subTitle,
    textContent,
    title,
    witnesses,
    settings,
}: MvpBlockProps) => {
    return (
        <>
            <Grid
                gridTemplateColumns="repeat(8, 1fr)"
                gap={4}
                color={settings?.textColor}
            >
                <GridItem colSpan={8} textAlign="center" mb={4}>
                    <Heading
                        textTransform="uppercase"
                        fontSize="lg"
                        fontFamily="Butler"
                        color="inherit"
                    >
                        {subTitle}
                    </Heading>
                    <Heading
                        color="inherit"
                        fontSize={{ base: '4xl', lg: '5xl' }}
                    >
                        {title}
                    </Heading>
                </GridItem>
                {witnesses.map((witness, index) => (
                    <WitnessesItem
                        witness={witness}
                        index={index}
                        key={`${witness.name}-${index}`}
                        color="inherit"
                    />
                ))}
                {masterOfCeremonyTitle && (
                    <GridItem colSpan={8} textAlign="center" mb={4}>
                        <Heading
                            fontSize={{
                                base: '4xl',
                                lg: '5xl',
                            }}
                            color="inherit"
                        >
                            {masterOfCeremonyTitle}
                        </Heading>
                    </GridItem>
                )}
                {mastersOfCeremony.map((mvp) => (
                    <MasterOfCeremonyItem
                        mvp={mvp}
                        key={mvp.name}
                        mastersOfCeremony={mastersOfCeremony}
                    />
                ))}
            </Grid>
            <Box>
                {!!textContent.content?.length && (
                    <Tiptap
                        content={textContent}
                        editorConfig={{
                            editable: false,
                        }}
                    />
                )}
            </Box>
        </>
    );
};

export default Mvps;
