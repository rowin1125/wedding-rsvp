/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';

import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';
import { Table, Thead, Tbody, Tr, Th, Td, chakra, Box } from '@chakra-ui/react';
import {
    useReactTable,
    flexRender,
    getCoreRowModel,
    ColumnDef,
    SortingState,
    getSortedRowModel,
    ExpandedState,
    getExpandedRowModel,
} from '@tanstack/react-table';

import maxLines from 'src/helpers/maxLines';
import { DayGuestType } from 'src/pages/DayGuestsPage/DayGuestsPage';

export type GuestDataTableProps<Data extends Record<string, any>> = {
    data: Data[];
    columns: ColumnDef<Data, any>[];
};

export function GuestDataTable<Data extends Record<string, any>>({
    data,
    columns,
}: GuestDataTableProps<Data>) {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [expanded, setExpanded] = React.useState<ExpandedState>({});

    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
            expanded,
        },
        onExpandedChange: setExpanded,
        getSubRows: (row) => row.subRows,
        getCoreRowModel: getCoreRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        getExpandedRowModel: getExpandedRowModel(),
    });

    return (
        <>
            <Box overflow="auto">
                <Table>
                    <Thead>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <Tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <Th
                                            key={header.id}
                                            onClick={header.column.getToggleSortingHandler()}
                                        >
                                            {flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}

                                            <chakra.span pl="4">
                                                {header.column.getIsSorted() ? (
                                                    header.column.getIsSorted() ===
                                                    'desc' ? (
                                                        <TriangleDownIcon aria-label="sorted descending" />
                                                    ) : (
                                                        <TriangleUpIcon aria-label="sorted ascending" />
                                                    )
                                                ) : null}
                                            </chakra.span>
                                        </Th>
                                    );
                                })}
                            </Tr>
                        ))}
                    </Thead>
                    <Tbody>
                        {table.getRowModel().rows.map((row) => {
                            const isPresent = row.original.Aanwezig === 'Ja';

                            if (row.depth > 0) {
                                const parentData = row.getParentRow()
                                    ?.original as DayGuestType | undefined;
                                const genodigdeIsEqual =
                                    parentData?.Genodigde ===
                                    row.original.Genodigde;

                                if (genodigdeIsEqual) return null;
                            }

                            return (
                                <Tr
                                    onClick={() => {
                                        row.toggleExpanded();
                                    }}
                                    key={row.id}
                                    bg={isPresent ? 'green.50' : 'red.50'}
                                    cursor="pointer"
                                    _hover={{
                                        bg: isPresent ? 'green.100' : 'red.100',
                                    }}
                                    transition="background-color 0.2s ease-in-out"
                                >
                                    {row.getVisibleCells().map((cell) => {
                                        // see https://tanstack.com/table/v8/docs/api/core/column-def#meta to type this correctly
                                        const meta: any =
                                            cell.column.columnDef.meta;
                                        const maxWidth =
                                            100 / table.getAllColumns().length;

                                        return (
                                            <Td
                                                key={cell.id}
                                                isNumeric={meta?.isNumeric}
                                                width={`${maxWidth}%`}
                                            >
                                                <Box
                                                    fontSize={{
                                                        base: 'xs',
                                                        lg: 'md',
                                                    }}
                                                    style={{ ...maxLines(1) }}
                                                    title={
                                                        typeof (cell as any)
                                                            .value === 'string'
                                                            ? cell.getValue<string>()
                                                            : ''
                                                    }
                                                >
                                                    {flexRender(
                                                        cell.column.columnDef
                                                            .cell,
                                                        cell.getContext()
                                                    )}
                                                </Box>
                                            </Td>
                                        );
                                    })}
                                </Tr>
                            );
                        })}
                    </Tbody>
                </Table>
            </Box>
        </>
    );
}
