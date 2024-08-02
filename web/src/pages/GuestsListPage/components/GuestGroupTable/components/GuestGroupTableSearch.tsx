import React from 'react';

import { InfoOutlineIcon, CloseIcon } from '@chakra-ui/icons';
import {
    Box,
    FormControl,
    FormLabel,
    InputGroup,
    Input,
    InputRightElement,
    Button,
    Icon,
    FormHelperText,
    Tooltip,
} from '@chakra-ui/react';

type GuestGroupTableSearchProps = {
    search: string;
    handleSearch: (search: string) => void;
};

const GuestGroupTableSearch = ({
    handleSearch,
    search,
}: GuestGroupTableSearchProps) => {
    return (
        <Box my={4}>
            <FormControl maxW={{ base: 'full', lg: '400px' }}>
                <FormLabel display="flex" alignItems="center">
                    Zoek in de gastenlijst
                    <Tooltip
                        label="Dit veld maakt gebruikt van een fuzzy search. Dit betekent dat je kan zoeken op een gedeelte van een woord of naam."
                        placement="right"
                    >
                        <InfoOutlineIcon
                            ml={4}
                            fontSize=".9em"
                            color="info.600"
                        />
                    </Tooltip>
                </FormLabel>

                <InputGroup>
                    <Input
                        placeholder="Zoeken"
                        value={search}
                        onChange={(e) => handleSearch(e.target.value)}
                    />
                    <InputRightElement p={1}>
                        <Button
                            size="sm"
                            onClick={() => handleSearch('')}
                            variant="ghost"
                        >
                            <Icon as={CloseIcon} />
                        </Button>
                    </InputRightElement>
                </InputGroup>
                <FormHelperText>
                    Zoek op <strong>familie/huishouden naam</strong>,{' '}
                    <strong>voornaam</strong> of <strong>achternaam</strong>.
                    Zoeken begint vanaf 2 karakters.
                </FormHelperText>
            </FormControl>
        </Box>
    );
};

export default GuestGroupTableSearch;
