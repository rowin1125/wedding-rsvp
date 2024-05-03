import { useCallback, useEffect, useState } from 'react';

import QRCode from 'qrcode';
import { InferType } from 'yup';

import { routes } from '@redwoodjs/router';

import useDebounce from 'src/hooks/useDebounce';

import { validationSchema } from '../QRCodeForm';

const defaultOptions = {
    scale: 10, // 3 to 10
    margin: 4, // 1 to 4
    version: 10, // 2 to 10,
    color: {
        dark: '#000', // black
        light: '#fff', // white
    },
};

export const useQRCodePreview = (
    values: InferType<typeof validationSchema>
) => {
    const [qrCode, setQRCode] = useState<string>('');
    const debouncedValues = useDebounce(qrCode, 400);

    const generateQRCode = useCallback(async () => {
        const darkIsTransparent =
            values.metadata.color.dark.isTransparent === 'true';
        const lightIsTransparent =
            values.metadata.color.light.isTransparent === 'true';

        const userOptions = {
            color: {
                dark: darkIsTransparent
                    ? '#0000'
                    : values.metadata.color.dark.color,

                light: lightIsTransparent
                    ? '#0000'
                    : values.metadata.color.light.color,
            },
            version: values.metadata.version,
            scale: values.metadata.scale,
            margin: values.metadata.margin,
        };

        const options = {
            ...defaultOptions,
            ...userOptions,
        };
        const qrUrl = values.id
            ? `${process.env.REDWOOD_ENV_VERCEL_URL}${routes.qrCode({
                  id: values.id,
              })}`
            : 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';

        const response = await QRCode.toDataURL(qrUrl, options);
        setQRCode(response);
    }, [values]);

    useEffect(() => {
        generateQRCode();
    }, [generateQRCode, values]);

    return { qrCode: debouncedValues };
};
