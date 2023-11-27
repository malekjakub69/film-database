import { FC, useState } from 'react';
import { Column, Row } from 'react-table';
import { IcoPlus } from '../../../assets/icons';
import { Film } from '../../../types';
import { Table } from '../../components/Table';
import { FilmDeatilDialog } from '../../components/dialogs/FilmDeatilDialog';

interface IProps {
    defaultData?: Film[];
}

export const FavoriteFilm: FC<IProps> = ({ defaultData }) => {
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
                        className={'w-10 h-10 rounded-xl bg-green-200 cursor-pointer'}
                        onClick={(e) => {
                            e.stopPropagation();
                            e.nativeEvent.stopImmediatePropagation();
                            openInfoDialog(row.original.imdbID);
                        }}
                    >
                        <IcoPlus className="m-auto mt-3 w-4 fill-green" />
                    </span>
                </span>
            )
        }
    ];
    return (
        <div>
            {defaultData && (
                <Table
                    className={'text-center mt-4'}
                    cols={colsDef}
                    data={defaultData}
                    onRowClick={(row) => openInfoDialog(row.original.imdbID)}
                />
            )}
            {selectedFilm && <FilmDeatilDialog open={openFilmDeatilDialog} onClose={onCloseDialog} filmId={selectedFilm} />}
        </div>
    );
};
