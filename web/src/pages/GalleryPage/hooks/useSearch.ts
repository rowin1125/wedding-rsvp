import { useState, useRef, useEffect } from 'react';

import { navigate, useLocation } from '@redwoodjs/router';

import { generateURL } from 'src/helpers/generateURL/generateURL';
import useDebounce from 'src/hooks/useDebounce';

export const useSearch = () => {
    const { pathname, search } = useLocation();

    const { queryParams } = generateURL(pathname, search);
    const initialSearchQuery = (queryParams?.query as string) ?? '';

    const [searchQuery, setSearchQuery] = useState<string>(initialSearchQuery);
    const debouncedSearchQuery = useDebounce(searchQuery, 400);

    const searchQueryIsEmpty = debouncedSearchQuery.trim() === '';
    const searchQueryIsShorterThanThree =
        debouncedSearchQuery.trim().length < 3;

    const allowedToSearch =
        !searchQueryIsEmpty && !searchQueryIsShorterThanThree;
    const finalQuery = allowedToSearch ? debouncedSearchQuery : undefined;

    const searchInputRef = useRef<HTMLInputElement>(null);

    const resetSearchQuery = () => {
        setSearchQuery('');
        navigate(pathname, {
            replace: true,
        });
    };

    useEffect(() => {
        if (!finalQuery) return;

        const urlInfo = generateURL(location.pathname, location.search);
        const urlParams = urlInfo.queryParams;
        const newParams = { ...urlParams, query: finalQuery };
        const pathName = location.pathname;

        const { fullURL } = generateURL(pathName, newParams);

        navigate(fullURL, {
            replace: true,
        });
    }, [finalQuery]);

    return {
        searchQuery,
        setSearchQuery,
        searchInputRef,
        finalQuery,
        resetSearchQuery,
    };
};
