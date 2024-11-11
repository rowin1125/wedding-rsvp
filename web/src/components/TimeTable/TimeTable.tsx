import { Box, Container, Flex, Grid, GridItem } from '@chakra-ui/react';

import Tiptap from '../PuckStudio/blocks/RickTextBlock/components/Tiptap/components/Tiptap';
import { TimeTableBlockProps } from '../PuckStudio/blocks/TimeTableBlock';
import IconResolver from '../PuckStudio/components/IconInput/components/IconResolver';

type TimeTableProps = TimeTableBlockProps;

const TimeTable = ({ programItem, textContent, settings }: TimeTableProps) => {
    return (
        <Box id="program">
            <Container>
                {!!textContent.content?.length && (
                    <Tiptap
                        content={textContent}
                        editorConfig={{
                            editable: false,
                        }}
                    />
                )}
                <Flex justifyContent="center" w="full">
                    <Grid
                        gridTemplateColumns="repeat(2, 1fr)"
                        maxW="800px"
                        w="full"
                    >
                        {programItem.map((item, index) => {
                            const isOdd = index % 2 !== 0;

                            return (
                                <GridItem
                                    colSpan={1}
                                    key={`program-item-${index}`}
                                    position="relative"
                                    _before={{
                                        content: '""',
                                        width: '32px',
                                        height: '3px',
                                        borderRadius: '5px',
                                        backgroundColor:
                                            settings?.textColor ?? '#f1e8db',
                                        position: 'absolute',
                                        top: isOdd ? '65%' : '10%',
                                        right: isOdd ? 'unset' : '4px',
                                        left: isOdd ? '6px' : 'unset',
                                        zIndex: 4,
                                    }}
                                >
                                    <Box
                                        borderRightWidth={isOdd ? 0 : 3}
                                        borderColor={
                                            settings?.textColor ?? '#f1e8db'
                                        }
                                        h={'250px'}
                                        display="flex"
                                        alignItems="center"
                                        justifyContent={
                                            isOdd ? 'flex-end' : 'flex-start'
                                        }
                                        flexDirection="column"
                                    >
                                        <IconResolver
                                            icon={item.icon}
                                            fontSize="3xl"
                                            color={
                                                settings?.textColor ??
                                                'body.500'
                                            }
                                            pos={'relative'}
                                        />
                                        {item.textContent && (
                                            <Tiptap
                                                content={item.textContent}
                                                editorConfig={{
                                                    editable: false,
                                                }}
                                            />
                                        )}
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

export default TimeTable;
