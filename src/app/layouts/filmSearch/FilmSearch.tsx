import { FC, useState } from 'react';
import { Column, Row } from 'react-table';
import { IcoPlus } from '../../../assets/icons';
import { Film } from '../../../types';
import { Loading } from '../../components/Loading';
import { SearchInput } from '../../components/SearchInput';
import { Table } from '../../components/Table';
import { FilmDeatilDialog } from '../../components/dialogs/FilmDeatilDialog';

interface IProps {
    defaultData?: Film[];
    loadingFilms: boolean;
    setSearchFilmString: (value: string) => void;
    fetchNextPage?: () => void;
    hasNextPage?: boolean;
    totalResults?: number;
    error?: string;
}

export const FilmSearch: FC<IProps> = ({
    defaultData,
    setSearchFilmString,
    loadingFilms,
    fetchNextPage,
    error,
    hasNextPage,
    totalResults
}) => {
    const [openFilmDeatilDialog, setOpenFilmDeatilDialog] = useState<boolean>(false);
    const [selectedFilm, setSelectedFilm] = useState<string | undefined>(undefined);

    const openInfoDialog = (filmId: string) => {
        setOpenFilmDeatilDialog(true);
        setSelectedFilm(filmId);
    };

    const onCloseDialog = () => {
        setOpenFilmDeatilDialog(false);
        setSelectedFilm(undefined);
    };

    const colsDef: Column<Film>[] = [
        {
            Header: 'Název filmu',
            accessor: 'Title',
            width: 180,
            Cell: ({ value }: { value: string }) => <p className="truncate">{value}</p>
        },
        {
            Header: 'Rok',
            accessor: 'Year',
            width: 60
        },
        {
            Header: '',
            id: 'settings',
            width: 40,
            Cell: ({ row }: { row: Row<Film> }) => (
                <span className="flex justify-center gap-4 mx-auto">
                    <span
                        className={'w-10 h-10 rounded-xl bg-white cursor-pointer'}
                        onClick={(e) => {
                            console.log(row.original.imdbID);
                            e.stopPropagation();
                            e.nativeEvent.stopImmediatePropagation();
                            openInfoDialog(row.original.imdbID);
                        }}
                    >
                        <IcoPlus className="m-auto mt-3 w-4 fill-gray" />
                    </span>
                </span>
            )
        }
    ];

    return (
        <>
            <SearchInput onChange={setSearchFilmString} />
            {error && <div className="w-full text-center mt-2 text-red"> {error} </div>}
            <div className="w-full text-center mt-2">Nalezeno : {totalResults} výsledků </div>
            <Loading loading={loadingFilms}>
                {defaultData && (
                    <Table
                        fetchNextPage={fetchNextPage}
                        hasNextPage={hasNextPage}
                        className={'text-center mt-4'}
                        cols={colsDef}
                        data={defaultData}
                        onRowClick={(row) => openInfoDialog(row.original.imdbID)}
                    />
                )}
            </Loading>
            {selectedFilm && <FilmDeatilDialog open={openFilmDeatilDialog} onClose={onCloseDialog} filmId={selectedFilm} />}
        </>
    );
};
