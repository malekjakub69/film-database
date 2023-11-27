import { useQuery } from '@tanstack/react-query';
import { FC, useState } from 'react';
import { FilmApi } from '../../../api';
import { FilmData } from '../../../types';
import { addToFavorites, isFavorite, removeFromFavorites } from '../../hooks';
import queryKeys from '../../hooks/queryKeys';
import { Loading } from '../Loading';
import { MyDialog, MyDialogHeader } from '../MyDialog';

interface IProps {
    onClose: () => void;
    open: boolean;
    filmId: string;
}

export const FilmDeatilDialog: FC<IProps> = ({ onClose, open, filmId }) => {
    const { data: filmData, isLoading } = useQuery({
        queryKey: [...queryKeys.FILM, filmId],
        queryFn: () => FilmApi.getFilm(filmId)
    });

    const [favorites, setFavorites] = useState(isFavorite(filmId));

    function handleAddToFavorites(film: FilmData) {
        addToFavorites(film);
        setFavorites(true);
    }

    function handleRemoveFromFavorites(film: FilmData) {
        removeFromFavorites(film.imdbID);
        setFavorites(false);
    }

    return (
        <MyDialog className=" w-[80vw] min-h-[70vh] max-h-85" closeDialog={() => onClose()} isOpen={open}>
            <MyDialogHeader title={filmData?.Title ?? ''} onClose={() => onClose()} />

            <Loading loading={isLoading}>
                <div className="grid mobile:grid-cols-3 grid-cols-1 justify-around w-full p-4 gap-4">
                    <div>
                        <img src={filmData?.Poster} className="object-contain" />
                    </div>
                    <div className={'col-span-2 my-auto flex flex-col gap-1'}>
                        <>
                            {filmData?.Released && filmData?.Released != 'N/A' && <p>Vydání: {filmData?.Released}</p>}
                            {filmData?.Runtime && filmData?.Runtime != 'N/A' && <p>Délka filmu: {filmData?.Runtime}</p>}
                            {filmData?.Genre && filmData?.Genre != 'N/A' && <p>Žánr: {filmData?.Genre}</p>}
                            {filmData?.Director && filmData?.Director != 'N/A' && <p>Režisér: {filmData?.Director}</p>}
                            {filmData?.Writer && filmData?.Writer != 'N/A' && <p>Scénarista: {filmData?.Writer}</p>}
                            {filmData?.Actors && filmData?.Actors != 'N/A' && <p>Herci: {filmData?.Actors}</p>}
                            {filmData?.Language && filmData?.Language != 'N/A' && <p>Jazyk: {filmData?.Language}</p>}
                            {filmData?.Country && filmData?.Country != 'N/A' && <p>Země: {filmData?.Country}</p>}
                            {filmData?.imdbRating && filmData?.imdbRating != 'N/A' && (
                                <p>
                                    Hodnocení: {filmData?.imdbRating}/10 ({filmData?.imdbVotes} hlasů)
                                </p>
                            )}
                            {filmData?.Plot && filmData?.Plot != 'N/A' && <p>Popis: {filmData?.Plot}</p>}
                            {filmData?.DVD && filmData?.DVD != 'N/A' && <p>Dostupné na DVD: {filmData?.DVD}</p>}
                            {filmData?.Production && filmData?.Production != 'N/A' && <p>Produkce: {filmData?.Production}</p>}
                            {filmData?.BoxOffice && filmData?.BoxOffice != 'N/A' && <p>Tržby: {filmData?.BoxOffice}</p>}
                            {filmData?.Awards && filmData?.Awards != 'N/A' && <p>Ocenění: {filmData?.Awards}</p>}
                            {filmData?.Website && filmData?.Website != 'N/A' && <p>Web: {filmData?.Website}</p>}
                            <div className="pt-4" />
                            {!favorites && (
                                <button
                                    type="button"
                                    onClick={() => (filmData ? handleAddToFavorites(filmData) : null)}
                                    className="my-button bg-green-200"
                                >
                                    Přidat do oblíbených
                                </button>
                            )}
                            {favorites && (
                                <button
                                    type="button"
                                    onClick={() => (filmData ? handleRemoveFromFavorites(filmData) : null)}
                                    className="my-button bg-red-30"
                                >
                                    Odebrat z oblíbených
                                </button>
                            )}
                        </>
                    </div>
                </div>
            </Loading>
        </MyDialog>
    );
};
