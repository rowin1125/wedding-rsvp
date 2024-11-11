import React from 'react';

import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    useDisclosure,
    Icon,
    Grid,
    Input,
} from '@chakra-ui/react';
import Fuse from 'fuse.js';

import { allBBIcons } from './components/IconResolver';

type IconInputProps = {
    onChange: (value: string) => void;
    icon: string;
};

const IconInput = ({ ...props }: IconInputProps) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const allIcons = Object.keys(allBBIcons);
    const CurrentIcon = allBBIcons[props.icon as keyof typeof allBBIcons];

    const [search, setSearch] = React.useState('');
    const [searchResults, setSearchResults] =
        React.useState<string[]>(allIcons);

    const fuse = new Fuse(allIcons, {
        threshold: 0.4,
    });

    const handleSearch = (value: string) => {
        setSearch(value);
        if (!value || value.length < 2) {
            return setSearchResults(allIcons);
        }

        const results = fuse.search(value);
        setSearchResults(results.map((result) => result.item));
    };

    const handleClickIcon = (icon: string) => {
        props.onChange(icon);
        onClose();
        handleSearch('');
    };

    return (
        <>
            <Button onClick={onOpen}>
                {CurrentIcon ? <Icon as={CurrentIcon} /> : 'Select Icon'}
            </Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Selecteer een icoon</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Input
                            placeholder="Search for an icon"
                            onChange={(e) => {
                                handleSearch(e.target.value);
                            }}
                            value={search}
                        />
                        <Grid
                            templateColumns="repeat(4, 1fr)"
                            gap={4}
                            p={4}
                            maxH="500px"
                            overflow="auto"
                        >
                            {searchResults.map((icon) => {
                                const CustomIcon =
                                    allBBIcons[icon as keyof typeof allBBIcons];
                                const currentIconIsSelected =
                                    icon === props.icon;
                                return (
                                    <Button
                                        variant={
                                            currentIconIsSelected
                                                ? 'solid'
                                                : 'ghost'
                                        }
                                        key={icon}
                                        onClick={() => handleClickIcon(icon)}
                                    >
                                        <Icon as={CustomIcon} fontSize="xl" />
                                    </Button>
                                );
                            })}
                        </Grid>
                    </ModalBody>

                    <ModalFooter>
                        <Button onClick={onClose}>Sluiten</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default IconInput;
