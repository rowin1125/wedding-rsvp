import React, { useEffect, useState } from 'react';

import { Alert, AlertIcon } from '@chakra-ui/react';

const SamsungAlert = () => {
    const [invalidBrowser, setInvalidBrowser] = useState(false);

    useEffect(() => {
        const userAgent = navigator.userAgent;
        const isSamsungInternet = /SamsungBrowser/.test(userAgent);

        if (isSamsungInternet) {
            setInvalidBrowser(true);
        }
    }, []);

    return (
        <>
            {invalidBrowser && (
                <>
                    <Alert
                        status="error"
                        justifyContent="center"
                        position="fixed"
                        top={0}
                        zIndex={100}
                    >
                        <AlertIcon />
                        Deze website werkt niet goed in de Samsung Internet
                        browser. Gebruik een andere browser zoals Chrome.
                    </Alert>
                </>
            )}
        </>
    );
};

export default SamsungAlert;
