import { useEffect, useState } from "react";

// This hook is used to prevent the component from rendering on the server side.
/**
 * @description This hook is used to prevent the component from rendering on the server side. Alternative is to apply dynamic import (https://nextjs.org/docs/advanced-features/dynamic-import)
 * @returns {object} mounted
 * @example
 * const { mounted } = useOnlyMountBrowserSide();
 *
 * if (!mounted) {
 *  return null;
 * }
 */
export const useOnlyMountBrowserSide = (): { mounted: boolean } => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return { mounted };
};
