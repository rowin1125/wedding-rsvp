import React from 'react';

import { InfoIcon } from '@chakra-ui/icons';
import { Flex, FormLabel, Icon, Tooltip } from '@chakra-ui/react';

import { SingleAssetType } from 'src/pages/MediaPage/hooks/useGetMediaAssets';

type SelectAssetControlLabelProps = {
    name: string;
    currentAsset?: SingleAssetType | null;
};

const SelectAssetControlLabel = ({
    name,
    currentAsset,
}: SelectAssetControlLabelProps) => (
    <Flex alignItems="center">
        <FormLabel htmlFor={`${name}.id`}>Banner afbeelding</FormLabel>
        {currentAsset && (
            <Tooltip label="Het focus punt is het punt waarop de afbeelding scherp wordt gesteld. Dit is vooral belangrijk bij afbeeldingen met een hoogte-breedteverhouding die afwijkt van de originele afbeelding.">
                <Icon as={InfoIcon} color="blue.500" mb={2} />
            </Tooltip>
        )}
    </Flex>
);

export default SelectAssetControlLabel;
