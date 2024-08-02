import React from 'react';

import { AccordionItem, AccordionPanel } from '@chakra-ui/react';
import { GetGuestGroupsQuery } from 'types/graphql';

import { guestGroupRelationTypeOptions } from 'src/config/guestList';

import GuestGroupAccordion from './GuestGroupAccordion';
import GuestGroupTypeAccordionButton from './GuestGroupTypeAccordionButton';

type GuestGroupTypeAccordionItemProps = {
    groupKey: string;
    value: GetGuestGroupsQuery['guestGroups'];
    groupIndex: number;
    showArrows: boolean;
    childExpendedIndexes?: Record<string, number[]>;
};

const GuestGroupTypeAccordionItem = ({
    childExpendedIndexes,
    groupIndex,
    groupKey,
    value,
    showArrows,
}: GuestGroupTypeAccordionItemProps) => {
    const label = guestGroupRelationTypeOptions.find(
        (option) => option.value === groupKey
    )?.label;

    const addressesFilledInCount = value.filter(
        (group) => !group.address?.addressDataMissing
    ).length;
    const allComplete = addressesFilledInCount === value.length;

    return (
        <AccordionItem
            borderColor="secondary.300"
            borderTopWidth={groupIndex === 0 ? 0 : 1}
            _last={{
                borderBottomWidth: 0,
            }}
        >
            {({ isExpanded }) => (
                <>
                    <GuestGroupTypeAccordionButton
                        addressesFilledInCount={addressesFilledInCount}
                        allComplete={allComplete}
                        groupKey={groupKey}
                        isExpanded={isExpanded}
                        label={label}
                        showArrows={showArrows}
                        value={value}
                    />
                    {childExpendedIndexes && (
                        <AccordionPanel
                            pt={0}
                            pb={0}
                            pr={0}
                            pl={showArrows ? '60px' : '0'}
                            display="flex"
                            flexDir="column"
                            overflow="visible"
                        >
                            {value.map((guestGroup, index) => {
                                return (
                                    <GuestGroupAccordion
                                        showArrows={showArrows}
                                        key={guestGroup.id}
                                        guestGroup={guestGroup}
                                        index={index}
                                        guestGroups={value}
                                        childExpendedIndexes={
                                            childExpendedIndexes
                                        }
                                    />
                                );
                            })}
                        </AccordionPanel>
                    )}
                </>
            )}
        </AccordionItem>
    );
};

export default GuestGroupTypeAccordionItem;
