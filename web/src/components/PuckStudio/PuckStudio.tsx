/* eslint-disable @typescript-eslint/no-explicit-any */
import '@measured/puck/puck.css';
import React, { useMemo } from 'react';

import { Box } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { Config, Data, DefaultRootProps, Puck, Render } from '@measured/puck';
import createEmotionCache from '@measured/puck-plugin-emotion-cache';
import { TbDeviceDesktopShare } from 'react-icons/tb';

import { BannerBlock, BannerBlockProps } from './blocks/BannerBlock';
import { ButtonBlock, ButtonBlockProps } from './blocks/ButtonBlock';
import {
    ButtonGroupBlock,
    ButtonGroupBlockProps,
} from './blocks/ButtonGroupBlock';
import { ColumnsBlock, ColumnsProps } from './blocks/ColumnsBlock';
import { CountDownBlock, CountDownBlockProps } from './blocks/CountDownBlock';
import { FlexBlock, FlexBlockProps } from './blocks/FlexBlock';
import { HeadingBlock, HeadingBlockProps } from './blocks/HeadingBlock';
import HeroBlock, { HeroBlockProps } from './blocks/HeroBlock';
import { ImageBlock, ImageBlockProps } from './blocks/ImageBlock';
import { MvpBlock, MvpBlockProps } from './blocks/MvpBlock';
import { RichText, RichTextProps } from './blocks/RichText';
import { RsvpFormBlock, RsvpFormBlockProps } from './blocks/RsvpFormBlock';
import {
    StoryTimeLineBlock,
    StoryTimeLineBlockProps,
} from './blocks/StoryTimeLineBlock';
import { TextBlock, TextProps } from './blocks/TextBlock';
import { TextImageBlock, TextImageBlockProps } from './blocks/TextImageBlock';
import { TimeTableBlock, TimeTableBlockProps } from './blocks/TimeTableBlock';
import {
    VerticalSpaceBlock,
    VerticalSpaceBlockProps,
} from './blocks/VerticalSpacingBlock';
import PuckHeader from './components/PuckHeader';
import PuckIFrame, { CHAKRA_CACHE_KEY } from './components/PuckIFrame';
import PuckPreviewWrapper from './components/PuckPreviewWrapper';

export type PuckConfigComponentType = {
    Columns: ColumnsProps;
    Hero: HeroBlockProps;
    Text: TextProps;
    RichText: RichTextProps;
    Heading: HeadingBlockProps;
    VerticalSpace: VerticalSpaceBlockProps;
    CountDown: CountDownBlockProps;
    Banner: BannerBlockProps;
    StoryTimeLine: StoryTimeLineBlockProps;
    Mvp: MvpBlockProps;
    TimeTable: TimeTableBlockProps;
    TextImage: TextImageBlockProps;
    RsvpForm: RsvpFormBlockProps;
    ButtonGroup: ButtonGroupBlockProps;
    Button: ButtonBlockProps;
    Flex: FlexBlockProps;
    Image: ImageBlockProps;
};

type UserConfig = Config<
    PuckConfigComponentType,
    DefaultRootProps,
    'Bruiloft Buddy elementen' | 'Typography' | 'Layout' | 'Basis elementen'
>;

type PuckStudioProps = {
    onPublish?: (data: Partial<Data>) => Promise<void>;
    initialData?: Partial<Data>;
    config?: UserConfig;
    isLoading: boolean;
    renderView?: boolean;
    isActive?: boolean;
};

const chakraEmotionCache = createEmotionCache(CHAKRA_CACHE_KEY);

const PuckStudio = ({
    initialData,
    onPublish,
    config,
    isLoading,
    renderView,
    isActive = false,
}: PuckStudioProps) => {
    const memoizedConfig = useMemo(() => {
        const defaultConfig: UserConfig = {
            categories: {
                'Bruiloft Buddy elementen': {
                    components: [
                        'Hero',
                        'CountDown',
                        'Banner',
                        'StoryTimeLine',
                        'Mvp',
                        'TimeTable',
                        'TextImage',
                        'RsvpForm',
                    ],
                },
                Typography: {
                    components: ['RichText', 'Heading', 'Text'],
                },
                'Basis elementen': {
                    components: ['Button', 'ButtonGroup', 'Image'],
                },
                Layout: {
                    components: ['Columns', 'Flex', 'VerticalSpace'],
                },
            },
            components: {
                Hero: HeroBlock,
                Columns: ColumnsBlock,
                RichText: RichText,
                Text: TextBlock,
                Heading: HeadingBlock,
                VerticalSpace: VerticalSpaceBlock,
                CountDown: CountDownBlock,
                Banner: BannerBlock,
                StoryTimeLine: StoryTimeLineBlock,
                Mvp: MvpBlock,
                TimeTable: TimeTableBlock,
                TextImage: TextImageBlock,
                RsvpForm: RsvpFormBlock,
                ButtonGroup: ButtonGroupBlock,
                Button: ButtonBlock,
                Flex: FlexBlock,
                Image: ImageBlock,
            },
        };

        return {
            ...defaultConfig,
            ...config,
            categories: defaultConfig.categories,
            components: {
                ...defaultConfig.components,
                ...config?.components,
            },
        } as Config;
    }, [config]);

    const defaultViewPorts: any = [
        { width: 360, height: 'auto', icon: 'Smartphone', label: 'Small' },
        { width: 768, height: 'auto', icon: 'Tablet', label: 'Medium' },
        { width: 1280, height: 'auto', icon: 'Monitor', label: 'Large' },
    ];

    const PuckElement = renderView ? Render : Puck;
    const memoizedData = useMemo(() => {
        // This is a workaround to prevent the initialData from being mutated and throw an object freeze error
        // https://github.com/measuredco/puck/blob/8fcf0d8c6bd3a84bc2991c4c4033888fd6d04652/packages/core/lib/setup-zone.ts#L22
        return structuredClone(initialData ?? {});
    }, [initialData]);

    return (
        <PuckWrapper position="relative">
            <PuckElement
                config={memoizedConfig}
                data={memoizedData}
                viewports={[
                    ...defaultViewPorts,
                    {
                        width: 1440,
                        height: 'auto',
                        icon: <TbDeviceDesktopShare />,
                        label: 'Large Desktop',
                    },
                ]}
                overrides={{
                    headerActions: () => <PuckHeader isActive={isActive} />,
                    puck: ({ children }) => (
                        <PuckPreviewWrapper
                            onPublish={onPublish}
                            isLoading={isLoading}
                            initialData={memoizedData}
                        >
                            {children}
                        </PuckPreviewWrapper>
                    ),
                    iframe: ({ children, document }) => (
                        <PuckIFrame document={document}>{children}</PuckIFrame>
                    ),
                }}
                plugins={[chakraEmotionCache]}
            />
        </PuckWrapper>
    );
};

const PuckWrapper = styled(Box)`
    .Puck > div {
        position: absolute;
    }

    .ProseMirror:focus {
        outline: none;
    }
`;

export default PuckStudio;
