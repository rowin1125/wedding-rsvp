import React from 'react';

import {
    Flex,
    FormControl,
    FormLabel,
    Switch,
    Box,
    Button,
} from '@chakra-ui/react';
import { BiMinus, BiPlus } from 'react-icons/bi';

type GuestGroupTableControlsProps = {
    showArrows: boolean;
    setShowArrows: (value: boolean) => void;
    toggleAll: () => void;
    hasExpendedIndex: boolean;
};

const GuestGroupTableControls = ({
    hasExpendedIndex,
    setShowArrows,
    showArrows,
    toggleAll,
}: GuestGroupTableControlsProps) => {
    return (
        <Flex
            flexDir={{
                base: 'column',
                lg: 'row',
            }}
            justifyContent="flex-start"
            w={{
                base: 'full',
                lg: 'auto',
            }}
            alignItems={{
                base: 'start',
                lg: 'center',
            }}
        >
            <FormControl display="flex" alignItems="center" mr={4}>
                <FormLabel htmlFor="table-arrows" mb="0">
                    Indicatielijnen tonen
                </FormLabel>
                <Switch
                    id="table-arrows"
                    isChecked={showArrows}
                    onChange={(e) => setShowArrows(e.target.checked)}
                />
            </FormControl>
            <Box
                mt={{
                    base: 4,
                    lg: 0,
                }}
            >
                <Button
                    onClick={toggleAll}
                    px={6}
                    size="sm"
                    rightIcon={hasExpendedIndex ? <BiMinus /> : <BiPlus />}
                >
                    {hasExpendedIndex ? 'Alles inklappen' : 'Alles uitklappen'}
                </Button>
            </Box>
        </Flex>
    );
};

export default GuestGroupTableControls;
