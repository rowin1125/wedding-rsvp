import { useRef } from 'react';

import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap/dist/gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

import { useLocation } from '@redwoodjs/router';

import { useIsDevice } from 'src/hooks/useIsDevice';
import { colors } from 'src/lib/chakra/foundation/colors';

gsap.registerPlugin(ScrollTrigger, useGSAP);

type UseNavigationAnimationOptionsType = {
    disableBackgroundTransition?: boolean;
};

export const useNavigationAnimation = ({
    disableBackgroundTransition = false,
}: UseNavigationAnimationOptionsType = {}) => {
    const navBarRef = useRef(null);
    const navigationListRef = useRef<HTMLDivElement>(null);
    const mobileNavbarRef = useRef<HTMLDivElement>(null);

    const { isDesktop } = useIsDevice();
    const { pathname } = useLocation();

    useGSAP(
        () => {
            if (
                !mobileNavbarRef.current ||
                !navBarRef.current ||
                !navigationListRef.current
            )
                return;

            const showAnim = gsap
                .from([mobileNavbarRef.current, navBarRef.current], {
                    yPercent: disableBackgroundTransition
                        ? isDesktop
                            ? -65
                            : -55
                        : -100,
                    paused: true,
                    duration: 0.3,
                })
                .progress(1);

            // Animation for making navbar white and transparent on scroll
            const navigationTimeline = gsap
                .timeline()
                .to(navBarRef.current, {
                    duration: 0.05,
                    background: colors.primary[50],
                    boxShadow: '0 5px 45px #00000020',
                })
                .to(navigationListRef.current, {
                    duration: 0.05,
                    color: '#6e5744',
                })
                .to(mobileNavbarRef.current, {
                    color: colors.secondary[900],
                })
                .reversed(true);
            // ScrollTrigger for triggering animations
            ScrollTrigger.create({
                start: 'top top',
                end: '100%',
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                onUpdate: (self: any) => {
                    self.direction === -1
                        ? showAnim.play()
                        : showAnim.reverse();
                    if (disableBackgroundTransition) return;
                    if (self.progress > 0.01) {
                        navigationTimeline.play();
                    } else {
                        navigationTimeline.reverse();
                    }
                },
            });
        },
        {
            dependencies: [
                isDesktop,
                navBarRef,
                navigationListRef,
                mobileNavbarRef,
                disableBackgroundTransition,
                pathname,
            ],
        }
    );

    return {
        navBarRef,
        navigationListRef,
        mobileNavbarRef,
    };
};
