import React, { Fragment } from 'react';

import { Accordion, Box, Flex } from '@chakra-ui/react';
import { GetGuestGroupsQuery } from 'types/graphql';

import useLocalStorage from 'src/hooks/useLocalStorage';

import GuestGroupTableControls from './components/GuestGroupTableControls';
import GuestGroupTableSearch from './components/GuestGroupTableSearch';
import GuestGroupTypeAccordionItem from './components/GuestGroupTypeAccordionItem';
import { useGuestGroupTable } from './hooks/useGuestGroupTable';

type GuestGroupTableProps = {
    guestGroups: GetGuestGroupsQuery['guestGroups'];
};

const GuestGroupTable = ({ guestGroups }: GuestGroupTableProps) => {
    const [showArrows, setShowArrows] = useLocalStorage(
        'guestGroupTable.showArrows',
        true
    );

    const {
        search,
        guestGroupSet,
        expendedIndexes,
        hasExpendedIndex,
        childExpendedIndexes,
        toggleAll,
        handleSearch,
        setExpendedIndexes,
    } = useGuestGroupTable({
        guestGroups,
    });

    if (!guestGroups) return null;

    return (
        <>
            <Flex
                mb={4}
                justifyContent="space-between"
                alignItems={{
                    base: 'center',
                    lg: 'flex-end',
                }}
                flexDir={{
                    base: 'column',
                    lg: 'row',
                }}
            >
                <GuestGroupTableSearch
                    search={search}
                    handleSearch={handleSearch}
                />
                <GuestGroupTableControls
                    hasExpendedIndex={hasExpendedIndex}
                    setShowArrows={setShowArrows}
                    showArrows={showArrows}
                    toggleAll={toggleAll}
                />
            </Flex>

            <Box shadow="lg" borderRadius="lg" background="primary.100">
                <Accordion
                    allowMultiple
                    defaultIndex={Array.from(guestGroupSet).map(
                        (_group, index) => index
                    )}
                    index={expendedIndexes}
                    onChange={(expendedIndex) =>
                        setExpendedIndexes(expendedIndex as number[])
                    }
                >
                    {Array.from(guestGroupSet).map(
                        ([groupKey, value], groupIndex) => (
                            <GuestGroupTypeAccordionItem
                                key={groupKey}
                                groupKey={groupKey}
                                value={value}
                                groupIndex={groupIndex}
                                showArrows={showArrows}
                                childExpendedIndexes={childExpendedIndexes}
                            />
                        )
                    )}
                </Accordion>
            </Box>
        </>
    );
};

export default GuestGroupTable;
