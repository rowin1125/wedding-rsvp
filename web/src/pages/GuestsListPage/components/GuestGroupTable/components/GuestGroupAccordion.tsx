import React, { useEffect, useState } from 'react';

import {
    Accordion,
    AccordionItem,
    Flex,
    AccordionPanel,
} from '@chakra-ui/react';
import { GetGuestGroupsQuery } from 'types/graphql';

import GuestAccordionItem from './GuestAccordionItem/GuestAccordionItem';
import GuestGroupAccordionButton from './GuestGroupAccordionButton';
import GuestGroupAccordionControls from './GuestGroupAccordionControls';

type GuestGroupAccordionProps = {
    guestGroup: GetGuestGroupsQuery['guestGroups'][0];
    index: number;
    guestGroups: GetGuestGroupsQuery['guestGroups'];
    showArrows: boolean;
    childExpendedIndexes: Record<string, number[]>;
};

const GuestGroupAccordion = ({
    guestGroup,
    index,
    guestGroups,
    showArrows,
    childExpendedIndexes,
}: GuestGroupAccordionProps) => {
    const isLast = index === guestGroups.length - 1;
    const previousElementHeightId = guestGroups[index - 1]?.id;

    const [previousElementHeight, setPreviousElementHeight] = useState(0);

    useEffect(() => {
        if (!previousElementHeightId) return;

        const previousElement = document.getElementById(
            previousElementHeightId
        );
        if (!previousElement) return;

        const resizeObserver = new ResizeObserver((entries) => {
            for (const entry of entries) {
                setPreviousElementHeight(entry.contentRect.height);
            }
        });

        resizeObserver.observe(previousElement);

        return () => {
            resizeObserver.unobserve(previousElement);
        };
    }, [previousElementHeightId]);

    return (
        <Accordion
            id={guestGroup.id}
            key={guestGroup.id}
            allowMultiple
            defaultIndex={
                childExpendedIndexes[guestGroup.guestGroupRelationType]
            }
        >
            <AccordionItem
                borderColor="secondary.300"
                _last={{
                    borderBottomWidth: 0,
                }}
                borderTopWidth={index === 0 ? '0px' : '1px'}
            >
                {({ isExpanded }) => (
                    <>
                        <Flex
                            justifyContent="space-between"
                            flexDir={{
                                base: 'column',
                                lg: 'row',
                            }}
                        >
                            <GuestGroupAccordionButton
                                guestGroup={guestGroup}
                                isExpanded={isExpanded}
                                showArrows={showArrows}
                                previousElementHeight={previousElementHeight}
                                isLast={isLast}
                            />
                            <GuestGroupAccordionControls
                                guestGroup={guestGroup}
                            />
                        </Flex>
                        <AccordionPanel
                            pt={0}
                            pb={4}
                            pr={0}
                            pl="60px"
                            display="flex"
                            flexDir="column"
                            overflow="visible"
                        >
                            {guestGroup.guests.map((guest, index) => {
                                if (!guest) return;
                                const isLast =
                                    guestGroup.guests.length - 1 === index;

                                return (
                                    <GuestAccordionItem
                                        key={guest.id}
                                        guest={guest}
                                        index={index}
                                        isLast={isLast}
                                        showArrows={showArrows}
                                    />
                                );
                            })}
                        </AccordionPanel>
                    </>
                )}
            </AccordionItem>
        </Accordion>
    );
};

export default GuestGroupAccordion;
