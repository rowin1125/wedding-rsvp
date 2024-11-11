import {
    Box,
    BoxProps,
    Flex,
    Grid,
    GridItem,
    Icon,
    Image,
} from '@chakra-ui/react';
import { JSONContent } from '@tiptap/react';
import { CgInfinity } from 'react-icons/cg';
import { AssetReference } from 'types/graphql';

import Tiptap from '../PuckStudio/blocks/RickTextBlock/components/Tiptap/components/Tiptap';
import IconResolver from '../PuckStudio/components/IconInput/components/IconResolver';

type StoryTimelineProps = {
    stories: {
        textContent: JSONContent;
        assetReference?: AssetReference;
        icon: string;
    }[];
    intro: JSONContent;
} & BoxProps;

const StoryTimeline = ({ stories, intro, ...props }: StoryTimelineProps) => {
    return (
        <Box
            id="story"
            pt={{ base: 10, lg: 20 }}
            pb={{ base: 10, lg: 20 }}
            {...props}
        >
            {intro && (
                <Tiptap
                    content={intro}
                    editorConfig={{
                        editable: false,
                    }}
                />
            )}
            {stories.map((story, index) => {
                const isTextFirst = index % 2 === 0;
                const isLastItem = index === stories.length - 1;
                const focalPoint = story.assetReference?.metadata?.focalPoint;

                return (
                    <Grid
                        gridTemplateColumns="repeat(2, 1fr)"
                        key={index}
                        pl={{ base: 10, lg: 'unset' }}
                    >
                        <GridItem
                            colSpan={{ base: 2, lg: 1 }}
                            order={{ base: 1, lg: isTextFirst ? 1 : 2 }}
                            position="relative"
                            px={8}
                            pr={isTextFirst ? { base: 0, lg: 20 } : 'unset'}
                            pl={{
                                base: 12,
                                lg: isTextFirst ? 'unset' : 20,
                            }}
                            borderRightWidth={{
                                base: 0,
                                lg: isTextFirst ? 1 : 0,
                            }}
                            borderLeftWidth={{
                                base: 1,
                                lg: isTextFirst ? 0 : 1,
                            }}
                            borderColor="secondary.500"
                        >
                            {story.textContent && (
                                <Tiptap
                                    content={story.textContent}
                                    editorConfig={{
                                        editable: false,
                                    }}
                                />
                            )}
                            <Flex
                                position="absolute"
                                right={{
                                    base: 'unset',
                                    lg: isTextFirst ? '-45px' : 'unset',
                                }}
                                left={{
                                    base: '-30px',
                                    lg: isTextFirst ? 'unset' : '-45px',
                                }}
                                top={0}
                                bg="#F1E7DB"
                                w={{ base: '60px', lg: '90px' }}
                                h={{ base: '60px', lg: '90px' }}
                                borderRadius="full"
                                justifyContent="center"
                                alignItems={'center'}
                            >
                                <IconResolver
                                    icon={story.icon}
                                    fontSize="4xl"
                                />
                            </Flex>
                        </GridItem>
                        <GridItem
                            order={{ base: 2, lg: isTextFirst ? 2 : 1 }}
                            colSpan={{ base: 2, lg: 1 }}
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            pl={isTextFirst ? { base: 0, lg: 10 } : 0}
                            pr={isTextFirst ? 0 : { base: 0, lg: 10 }}
                            borderLeftWidth={{ base: 1, lg: 0 }}
                            borderColor="body.500"
                            py={10}
                            position="relative"
                        >
                            <Image
                                rounded="full"
                                src={
                                    story.assetReference?.asset.previewUrl ??
                                    'https://images.prismic.io/derow-v1/ZjZpJUMTzAJOCiG1_banner.jpg?auto=format,compress'
                                }
                                w={{ base: '200px', lg: '300px' }}
                                h={{ base: '200px', lg: '300px' }}
                                objectFit="cover"
                                objectPosition={
                                    focalPoint
                                        ? `${focalPoint.x}% ${focalPoint.y}%`
                                        : 'center'
                                }
                            />
                            {isLastItem && (
                                <Flex
                                    position="absolute"
                                    right={{
                                        base: 'unset',
                                        lg: !isTextFirst ? '-45px' : 'unset',
                                    }}
                                    left={{
                                        base: '-30px',
                                        lg: !isTextFirst ? 'unset' : '-45px',
                                    }}
                                    bottom={0}
                                    bg="#F1E7DB"
                                    w={{ base: '60px', lg: '90px' }}
                                    h={{ base: '60px', lg: '90px' }}
                                    borderRadius="full"
                                    justifyContent="center"
                                    alignItems={'center'}
                                >
                                    <Icon as={CgInfinity} fontSize="5xl" />
                                </Flex>
                            )}
                        </GridItem>
                    </Grid>
                );
            })}
        </Box>
    );
};

export default StoryTimeline;
