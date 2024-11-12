import { FindQrCodeById, FindQrCodeByIdVariables } from 'types/graphql';

import { useQuery } from '@redwoodjs/web';
import { registerFragment } from '@redwoodjs/web/apollo';

export const QR_CODE_FRAGMENT = gql`
    fragment QRCodeFragment on QrCode {
        id
        baseUrl
        usageCount
        code
        redirectUrl
        isActive
        expiresAt
        metadata {
            scale
            margin
            version
            color {
                dark
                light
            }
        }
    }
`;
registerFragment(QR_CODE_FRAGMENT);

export const FIND_QR_CODE_BY_ID = gql`
    query FindQrCodeById($id: String!) {
        qrCode(id: $id) {
            ...QRCodeFragment
        }
    }
`;

export const useGetQRCode = (id?: string | null) => {
    const { data, ...queryData } = useQuery<
        FindQrCodeById,
        FindQrCodeByIdVariables
    >(FIND_QR_CODE_BY_ID, {
        variables: { id: id || '' },
        skip: !id,
    });

    return {
        qrCode: data?.qrCode,
        ...queryData,
    };
};
