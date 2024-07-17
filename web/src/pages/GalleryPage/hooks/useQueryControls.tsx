import { createContext, useContext } from 'react';

import { AssetSortField, SortOrder } from 'types/graphql';

import { usePagination } from './usePagination';
import { useSearch } from './useSearch';
import { useSorting } from './useSorting';

type QueryControlsContextType = {
    currentPage: number;
    offset: number;
    setCurrentPage: (page: number) => void;
    totalPages: number;
    setTotalPages: (totalPages: number) => void;
    currentSorting?: {
        sortField: AssetSortField;
        sortOrder: SortOrder;
    };
    handleSorting: ({
        sortField,
        sortOrder,
    }: {
        sortField: AssetSortField;
        sortOrder: SortOrder;
    }) => void;
    SORTING_LABEL_MAP: {
        [key in AssetSortField]: {
            [key in SortOrder]: string;
        };
    };
    searchQuery?: string;
    finalSearchQuery?: string;
    setSearchQuery?: (value: string) => void;
    searchInputRef?: React.RefObject<HTMLInputElement> | null;
    resetSearchQuery: () => void;
};

export const UseQueryControlsContext = createContext<QueryControlsContextType>({
    currentPage: 1,
    offset: 0,
    setCurrentPage: () => {},
    totalPages: 0,
    setTotalPages: () => {},
    currentSorting: {
        sortField: 'CREATED_AT',
        sortOrder: 'DESC',
    },
    handleSorting: () => {},
    SORTING_LABEL_MAP: {
        CREATED_AT: {
            DESC: 'Aangemaakt - Nieuwste eerst',
            ASC: 'Aangemaakt - Oudste eerst',
        },
        FILE_NAME: {
            ASC: 'Bestandsnaam - A-Z',
            DESC: 'Bestandsnaam - Z-A',
        },
        FILE_TYPE: {
            ASC: 'BestandsType - A-Z',
            DESC: 'BestandsType - Z-A',
        },
    },
    searchQuery: undefined,
    resetSearchQuery: () => {},
    setSearchQuery: () => {},
    finalSearchQuery: undefined,
    searchInputRef: null,
});

type QueryControlsProviderProps = {
    children: React.ReactNode;
    defaultOffset: number;
};

export const useQueryControls = () => {
    const context = useContext(UseQueryControlsContext);

    if (context === undefined) {
        throw new Error(
            'useQueryControls must be used within a QueryControlsProvider'
        );
    }

    return context;
};

export const QueryControlsProvider = ({
    children,
    defaultOffset,
}: QueryControlsProviderProps) => {
    const { currentSorting, handleSorting } = useSorting();
    const {
        finalQuery,
        searchInputRef,
        searchQuery,
        setSearchQuery,
        resetSearchQuery,
    } = useSearch();
    const { currentPage, offset, setCurrentPage, setTotalPages, totalPages } =
        usePagination({ defaultOffset });

    return (
        <UseQueryControlsContext.Provider
            value={{
                currentPage,
                offset,
                currentSorting,
                SORTING_LABEL_MAP: {
                    CREATED_AT: {
                        DESC: 'Aangemaakt - Nieuwste eerst',
                        ASC: 'Aangemaakt - Oudste eerst',
                    },
                    FILE_NAME: {
                        ASC: 'Bestandsnaam - A-Z',
                        DESC: 'Bestandsnaam - Z-A',
                    },
                    FILE_TYPE: {
                        ASC: 'BestandsType - A-Z',
                        DESC: 'BestandsType - Z-A',
                    },
                },
                totalPages,
                searchQuery,
                finalSearchQuery: finalQuery,
                setSearchQuery,
                setCurrentPage,
                setTotalPages,
                handleSorting,
                searchInputRef,
                resetSearchQuery,
            }}
        >
            {children}
        </UseQueryControlsContext.Provider>
    );
};
