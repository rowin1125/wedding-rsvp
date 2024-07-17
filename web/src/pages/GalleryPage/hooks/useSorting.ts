import { useEffect, useState } from 'react';

import { AssetSortField, SortOrder } from 'types/graphql';

import { navigate, useLocation } from '@redwoodjs/router';

import { generateURL } from 'src/helpers/generateURL/generateURL';

export const useSorting = () => {
    const { pathname, search } = useLocation();
    const { queryParams } = generateURL(pathname, search);
    const initialSorting = {
        sortField: (queryParams?.sortField as AssetSortField) ?? 'CREATED_AT',
        sortOrder: (queryParams?.sortOrder as SortOrder) ?? 'DESC',
    };

    const [currentSorting, setCurrentSorting] = useState<{
        sortField: AssetSortField;
        sortOrder: SortOrder;
    }>(initialSorting);

    useEffect(() => {
        const urlInfo = generateURL(location.pathname, location.search);
        const urlParams = urlInfo.queryParams;

        setCurrentSorting({
            sortField: urlParams.sortField as AssetSortField,
            sortOrder: urlParams.sortOrder as SortOrder,
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location]);

    const handleSorting = ({
        sortField,
        sortOrder,
    }: {
        sortField: AssetSortField;
        sortOrder: SortOrder;
    }) => {
        const urlInfo = generateURL(location.pathname, location.search);
        const urlParams = urlInfo.queryParams;
        const newParams = { ...urlParams, sortField, sortOrder };
        const pathName = location.pathname;

        const { fullURL } = generateURL(pathName, newParams);
        setCurrentSorting({
            sortField,
            sortOrder,
        });

        navigate(fullURL, {
            replace: true,
        });
    };

    return {
        currentSorting,
        handleSorting,
    };
};
