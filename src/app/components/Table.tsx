import clsx from 'clsx';
import { ReactElement, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { Column, Row, useTable } from 'react-table';

interface IProps<T extends object> {
    cols: Column<T>[];
    data: T[];
    className?: string;
    hasNextPage?: boolean;
    onRowClick?: (value: Row<T>) => void;
    fetchNextPage?: () => void;
}

export const Table: <T extends object>(p: IProps<T>) => ReactElement<IProps<T>> = ({
    cols,
    data,
    className,
    onRowClick,
    hasNextPage = false,
    fetchNextPage = () => {}
}) => {
    const table = useTable({ columns: cols, data: data });
    let haveHeader = false;
    const { ref, inView } = useInView();

    useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, fetchNextPage]);

    table.headers.forEach((item) => {
        if (item.Header) {
            haveHeader = true;
            return;
        }
    });

    const tableContainerStyle = clsx({ 'overflow-auto my-table': true }, className);

    return (
        <div className={tableContainerStyle}>
            <table className={'w-full'} {...table.getTableProps()}>
                {haveHeader && (
                    <thead>
                        <tr>
                            {table.headers.map((column) => (
                                <th
                                    {...column.getHeaderProps({
                                        style: { width: column.width }
                                    })}
                                >
                                    {column.render('Header')}
                                </th>
                            ))}
                        </tr>
                    </thead>
                )}
                <tbody {...table.getTableBodyProps()}>
                    {table.rows.map((row) => {
                        table.prepareRow(row);
                        return (
                            <tr {...row.getRowProps()} onClick={() => (onRowClick ? onRowClick(row) : undefined)}>
                                {row.cells.map((cell) => (
                                    <td
                                        {...cell.getCellProps({
                                            style: { width: cell.column.width }
                                        })}
                                    >
                                        {cell.render('Cell')}
                                    </td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <div ref={ref}></div>
        </div>
    );
};
