import React, { ReactNode, useCallback, useEffect, useRef } from 'react';

import { Box, Flex, FlexProps, Icon } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import { Swiper, SwiperClass, SwiperProps } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import { useIsDevice } from 'src/hooks/useIsDevice';

const StyledSwiper = styled(Swiper, {
    shouldForwardProp: (prop) => !['zoomAnimation'].includes(prop as string),
})<{ zoomAnimation: boolean }>`
    .swiper-pagination {
        position: relative;
        margin-top: 1rem;
    }

    .autoplay-progress svg {
        --progress: 0;
        position: absolute;
        left: 0;
        top: 0px;
        z-index: 10;
        width: 100%;
        height: 100%;
        stroke-width: 4px;
        fill: none;
        stroke-dashoffset: calc(125.6 * (1 - var(--progress)));
        stroke-dasharray: 125.6;
        transform: rotate(-90deg);
    }

    @keyframes zoom {
        from {
            transform: scale(1);
        }

        to {
            transform: scale(1.1);
        }
    }

    .swiper-wrapper {
        .swiper-slide {
            overflow: hidden;

            img {
                width: 100%;
            }
        }

        .swiper-slide-prev,
        .swiper-slide-active,
        .swiper-slide-duplicate-active {
            img {
                animation-name: ${(props) =>
                    props.zoomAnimation ? 'zoom' : 'unset'};
                animation-duration: 5s;
                animation-fill-mode: forwards;
            }
        }
    }
`;

type SliderWrapperProps = {
    disableAutoPlay?: boolean;
    children: ReactNode;
    showDots?: boolean;
    slidesPerView?: number;
    slidesPerViewMobile?: number;
    showOverflow?: boolean;
    showTimer?: boolean;
    spaceBetween?: number;
    showOverlay?: boolean;
    timerProps?: FlexProps;
    showControls?: boolean;
    transitionTime?: number;
    transitionType?: 'slide' | 'fade';
    zoomAnimation?: boolean;
    loop?: boolean;
    customControls?: (
        slidePrev: (
            speed?: number | undefined,
            runCallbacks?: boolean | undefined
        ) => void,
        slideNext: (
            speed?: number | undefined,
            runCallbacks?: boolean | undefined
        ) => void,
        currentIndex: number,
        totalSlides: number
    ) => ReactNode;
} & FlexProps &
    SwiperProps;

const SliderWrapper = ({
    children,
    showDots = false,
    slidesPerView = 4,
    slidesPerViewMobile = 2,
    showOverflow,
    spaceBetween = 50,
    showTimer,
    showOverlay,
    timerProps,
    showControls,
    transitionTime,
    transitionType,
    zoomAnimation,
    loop,
    disableAutoPlay,
    customControls: customControls,
    ...props
}: SliderWrapperProps) => {
    const { isDesktop } = useIsDevice();
    const progressCircle = useRef<SVGSVGElement | null>(null);
    const progressContent = useRef<HTMLDivElement | null>(null);
    const sliderRef = useRef<SwiperClass | null>(null);
    const totalSlides = React.Children.count(children);
    const hasMultipleSlides = totalSlides > 1;
    const [realIndex, setRealIndex] = React.useState<number>(0);

    const onAutoplayTimeLeft = (
        _: SwiperClass,
        time: number,
        progress: number
    ) => {
        if (!progressCircle.current || !progressContent.current) return;

        progressCircle.current?.style.setProperty(
            '--progress',
            String(1 - progress)
        );
        progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    };

    let shouldLoop: boolean;

    if (isDesktop) {
        shouldLoop = hasMultipleSlides && slidesPerView < totalSlides;
    } else {
        shouldLoop = hasMultipleSlides && slidesPerViewMobile < totalSlides;
    }
    if (loop !== undefined) shouldLoop = loop;

    const handleArrowKeys = useCallback((e: KeyboardEvent) => {
        if (e.key === 'ArrowRight') {
            sliderRef.current?.slideNext();
        }
        if (e.key === 'ArrowLeft') {
            sliderRef.current?.slidePrev();
        }
    }, []);

    useEffect(() => {
        window.addEventListener('keydown', handleArrowKeys);
        return () => {
            window.removeEventListener('keydown', handleArrowKeys);
        };
    }, [handleArrowKeys]);

    return (
        <Flex
            as={StyledSwiper}
            loop={shouldLoop}
            onSwiper={(swiper: SwiperClass) => {
                sliderRef.current = swiper;
            }}
            position="relative"
            cursor={hasMultipleSlides ? 'grab' : undefined}
            autoplay={
                disableAutoPlay
                    ? false
                    : {
                          delay: (transitionTime ?? 5) * 1000,
                          disableOnInteraction: false,
                      }
            }
            alignItems="center"
            pagination={showDots ? { clickable: true } : undefined}
            modules={[Pagination, Autoplay, EffectFade]}
            onAutoplayTimeLeft={onAutoplayTimeLeft}
            flexDirection="column"
            spaceBetween={spaceBetween}
            slidesPerView={isDesktop ? slidesPerView : slidesPerViewMobile}
            overflow={showOverflow ? 'visible' : 'clip'}
            effect={transitionType ?? 'slide'}
            zoomAnimation={zoomAnimation}
            onSlideChange={(data: SwiperClass) => {
                setRealIndex(data.realIndex);
            }}
            {...props}
        >
            {children}
            {showOverlay && (
                <Box
                    pointerEvents="none"
                    bgGradient="linear(to-t, black.300, black.500,)"
                    w="full"
                    h="100vh"
                    position="absolute"
                    inset={0}
                    opacity={0.5}
                    zIndex={2}
                />
            )}
            {customControls &&
                showControls &&
                hasMultipleSlides &&
                customControls(
                    () => sliderRef.current?.slidePrev(),
                    () => sliderRef.current?.slideNext(),
                    realIndex ?? 0,
                    totalSlides
                )}
            {!customControls && showControls && hasMultipleSlides && (
                <Flex
                    position="absolute"
                    inset={0}
                    w="full"
                    h="full"
                    zIndex={2}
                    justifyContent="space-between"
                    alignItems="center"
                    pointerEvents="none"
                >
                    <Box>
                        <Icon
                            position="relative"
                            zIndex={3}
                            fontSize={{ base: '3xl', lg: '6xl' }}
                            as={HiOutlineChevronLeft}
                            cursor="pointer"
                            color="tertiary.500"
                            pointerEvents="all"
                            onClick={() => sliderRef.current?.slidePrev()}
                        />
                    </Box>
                    <Box>
                        <Icon
                            position="relative"
                            zIndex={3}
                            fontSize={{ base: '3xl', lg: '6xl' }}
                            cursor="pointer"
                            as={HiOutlineChevronRight}
                            pointerEvents="all"
                            onClick={() => sliderRef.current?.slideNext()}
                            color="tertiary.500"
                        />
                    </Box>
                </Flex>
            )}
            {showTimer && hasMultipleSlides && (
                <Flex
                    position="absolute"
                    right={0}
                    left={0}
                    zIndex={2}
                    w="full"
                    justifyContent="flex-end"
                    {...timerProps}
                >
                    <Flex
                        justifyContent="center"
                        alignItems="center"
                        fontWeight="bold"
                        width={{
                            base: '35px',
                            lg: '48px',
                        }}
                        height={{
                            base: '35px',
                            lg: '48px',
                        }}
                        position="relative"
                        slot="container-end"
                        className="autoplay-progress"
                    >
                        <Box
                            position="absolute"
                            left="0"
                            top="0px"
                            zIndex={10}
                            width="100%"
                            height="100%"
                            as="svg"
                            stroke="primary.500"
                            viewBox={'0 0 48 48'}
                            ref={progressCircle}
                        >
                            <circle cx="24" cy="24" r="20"></circle>
                        </Box>
                        <Box
                            as="span"
                            fontSize={{ base: 'xs', lg: 'unset' }}
                            ref={progressContent}
                        ></Box>
                    </Flex>
                </Flex>
            )}
        </Flex>
    );
};

export default SliderWrapper;
