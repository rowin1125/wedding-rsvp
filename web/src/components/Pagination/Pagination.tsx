import { Box, Button, Flex, FlexProps, Icon } from '@chakra-ui/react';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';

import { navigate, useLocation } from '@redwoodjs/router';

import { generateURL } from 'src/helpers/generateURL/generateURL';
import { useIsDevice } from 'src/hooks/useIsDevice';

type PaginationProps = FlexProps & {
    currentPage: number;
    pages: number;
    setCurrentPage: (page: number) => void;
    isLoading?: boolean;
    pushPage?: boolean;
};

const Pagination = ({
    currentPage,
    pages,
    setCurrentPage,
    isLoading,
    pushPage = true,
    ...props
}: PaginationProps) => {
    const { isMobile } = useIsDevice();
    const location = useLocation();

    const setPage = (page: number) => {
        setCurrentPage(page);

        const urlInfo = generateURL(location.pathname, location.search);
        const urlParams = urlInfo.queryParams;
        const newParams = { ...urlParams, page: page.toString() };
        const pathName = location.pathname;

        const { fullURL } = generateURL(pathName, newParams);

        if (pushPage === true)
            navigate(fullURL, {
                replace: true,
            });
    };

    const paginationSet = [
        currentPage - 2,
        currentPage - 1,
        currentPage,
        currentPage + 1,
        currentPage + 2,
    ].filter((item) => item > 0 && item <= pages);

    const hasOnePage = pages === 1;

    if (hasOnePage) return <Box mt={10} as="hr" />;

    return (
        <Flex
            gap={{
                base: 2,
                lg: 2,
            }}
            justifyContent={{
                base: 'center',
                lg: 'start',
            }}
            paddingY={4}
            marginY={4}
            {...props}
        >
            <Button
                variant="outline"
                size="sm"
                onClick={() => setPage(currentPage - 1)}
                isDisabled={currentPage === 1 || isLoading}
                isLoading={isLoading}
                aria-label={'Previous'}
            >
                {isMobile ? <Icon as={BiChevronLeft} /> : 'Previous'}
            </Button>
            {!isMobile && currentPage > 3 && (
                <>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setPage(1)}
                        disabled={isLoading}
                    >
                        1
                    </Button>
                    <Button variant="ghost" size="sm" isDisabled={true}>
                        ...
                    </Button>
                </>
            )}
            {paginationSet.map((item) => (
                <Button
                    key={item}
                    variant="ghost"
                    size="sm"
                    onClick={() => setPage(item)}
                    fontWeight={item === currentPage ? 'bold' : 'normal'}
                    isDisabled={isLoading}
                >
                    {item}
                </Button>
            ))}
            {!isMobile && currentPage < pages - 2 && (
                <>
                    <Button variant="ghost" size="sm" isDisabled={true}>
                        ...
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setPage(pages)}
                    >
                        {pages}
                    </Button>
                </>
            )}
            <Button
                variant="outline"
                size="sm"
                onClick={() => setPage(currentPage + 1)}
                isDisabled={currentPage >= pages || isLoading}
                isLoading={isLoading}
                aria-label={'Next'}
            >
                {isMobile ? <Icon as={BiChevronRight} /> : 'Next'}
            </Button>
        </Flex>
    );
};

export default Pagination;
