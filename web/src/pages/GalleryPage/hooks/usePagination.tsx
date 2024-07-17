import { useState } from 'react';

import { useLocation } from '@redwoodjs/router';

import { generateURL } from 'src/helpers/generateURL/generateURL';

type UsePaginationType = {
    defaultOffset: number;
};

export const usePagination = ({ defaultOffset }: UsePaginationType) => {
    const { pathname, search } = useLocation();

    const { queryParams } = generateURL(pathname, search);

    const initialPage = queryParams?.page ? Number(queryParams?.page) : 1;
    const offset = (initialPage - 1) * defaultOffset;

    const [currentPage, setCurrentPage] = useState(initialPage);
    const [totalPages, setTotalPages] = useState(1);

    return {
        currentPage,
        offset,
        totalPages,
        setCurrentPage,
        setTotalPages,
    };
};
