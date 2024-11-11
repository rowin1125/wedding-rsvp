import React, { useEffect, useState } from 'react';

import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import createCache from '@emotion/cache';
import { CacheProvider, EmotionCache } from '@emotion/react';
import theme from 'config/chakra.config';

type PuckIFrameProps = {
    children: React.ReactNode;
    document?: Document;
};
const extendedTheme = extendTheme(theme);

export const CHAKRA_CACHE_KEY = 'chakra-cache';

const PuckIFrame = ({ children, document }: PuckIFrameProps) => {
    const [cache, setCache] = useState<EmotionCache | null>(null);
    useEffect(() => {
        if (document) {
            setCache(
                createCache({
                    key: CHAKRA_CACHE_KEY,
                    container: document.head,
                })
            );
        }
    }, [document]);

    if (cache)
        return (
            <CacheProvider value={cache}>
                <ChakraProvider
                    toastOptions={{
                        component: () => <></>,
                    }}
                    theme={extendedTheme}
                >
                    {children}
                </ChakraProvider>
            </CacheProvider>
        );

    return <>{children}</>;
};

export default PuckIFrame;
