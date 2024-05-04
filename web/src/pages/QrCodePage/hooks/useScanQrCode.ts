import {
    FindScannedQrCodeById,
    FindScannedQrCodeByIdVariables,
} from 'types/graphql';

import { useParams } from '@redwoodjs/router';
import { useQuery } from '@redwoodjs/web';

export const FIND_SCANNED_QR_CODE_BY_ID = gql`
    query FindScannedQrCodeById($id: String!) {
        scannedQrCode(id: $id) {
            id
            redirectUrl
            isActive
            baseUrl
            usageCount
        }
    }
`;

export const useScanQrCode = () => {
    const { galleryId } = useParams();
    const { data, ...query } = useQuery<
        FindScannedQrCodeById,
        FindScannedQrCodeByIdVariables
    >(FIND_SCANNED_QR_CODE_BY_ID, {
        variables: { id: galleryId },
    });

    return {
        qrCode: data?.scannedQrCode,
        ...query,
    };
};
