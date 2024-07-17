import { Buffer } from 'buffer';

import React from 'react';

import {
    TableContainer,
    Table,
    TableCaption,
    Thead,
    Tr,
    Th,
    Tbody,
    Td,
} from '@chakra-ui/react';

import { truncateText } from 'src/helpers/textHelpers/truncateText/truncateText';

import { SingleAssetType } from '../hooks/useGetMediaAssets';

type MediaAssetInformationTableProps = {
    asset: SingleAssetType;
};

const MediaAssetInformationTable = ({
    asset,
}: MediaAssetInformationTableProps) => {
    if (!asset) return null;

    const fileBuffer = Buffer.from(asset.previewUrl, 'base64');
    const newFile = new File([fileBuffer], asset.originalFilename, {
        type: asset.fileType,
    });
    const fileSize = newFile.size;
    const fileType = newFile.type;
    const extension = asset.originalFilename.split('.').pop();

    return (
        <TableContainer mt={10}>
            <Table variant="simple" fontSize="sm" size="sm">
                <TableCaption title={asset.originalFilename}>
                    Bestand informatie voor{' '}
                    {truncateText(asset.originalFilename, 30)}
                </TableCaption>
                <Thead>
                    <Tr>
                        <Th>Bestand informatie</Th>
                        <Th textAlign="end">Waardes</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    <Tr>
                        <Td>Groote</Td>
                        <Td textAlign="end">{fileSize} kB</Td>
                    </Tr>
                    <Tr>
                        <Td>MIME type</Td>
                        <Td textAlign="end">{fileType}</Td>
                    </Tr>
                    <Tr>
                        <Td>Bestand extensie</Td>
                        <Td textAlign="end">{extension}</Td>
                    </Tr>
                    <Tr>
                        <Td>Id</Td>
                        <Td textAlign="end">{asset.id}</Td>
                    </Tr>
                </Tbody>
            </Table>
        </TableContainer>
    );
};

export default MediaAssetInformationTable;
