import { createContext, useContext, useState } from 'react';

import { useLocation } from '@redwoodjs/router';

import { generateURL } from 'src/helpers/generateURL/generateURL';

type GalleryPaginationContextType = {
    currentPage: number;
    offset: number;
    setCurrentPage: (page: number) => void;
    totalPages: number;
    setTotalPages: (totalPages: number) => void;
};

export const UseGalleryPaginationContext =
    createContext<GalleryPaginationContextType>({
        currentPage: 1,
        offset: 0,
        setCurrentPage: () => {},
        totalPages: 0,
        setTotalPages: () => {},
    });

type GalleryPaginationProviderProps = {
    children: React.ReactNode;
};

export const useGalleryPagination = () => {
    const context = useContext(UseGalleryPaginationContext);

    if (context === undefined) {
        throw new Error(
            'useGalleryPagination must be used within a GalleryPaginationProvider'
        );
    }

    return context;
};

export const DEFAULT_PAGINATION_OFFSET = 40;

export const GalleryPaginationProvider = ({
    children,
}: GalleryPaginationProviderProps) => {
    const { pathname, search } = useLocation();
    const { queryParams } = generateURL(pathname, search);

    const initialPage = queryParams?.page ? Number(queryParams?.page) : 1;
    const offset = (initialPage - 1) * DEFAULT_PAGINATION_OFFSET;

    const [currentPage, setCurrentPage] = useState(initialPage);
    const [totalPages, setTotalPages] = useState(1);

    return (
        <UseGalleryPaginationContext.Provider
            value={{
                currentPage,
                offset,
                setCurrentPage,
                totalPages,
                setTotalPages,
            }}
        >
            {children}
        </UseGalleryPaginationContext.Provider>
    );
};
