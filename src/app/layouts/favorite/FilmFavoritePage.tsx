import { useQuery } from '@tanstack/react-query';
import { FC } from 'react';
import { getFavorites } from '../../hooks';
import { FavoriteFilm } from './FilmFavorite';

export const FavoriteFilmPage: FC = () => {
    const { data } = useQuery({
        queryKey: ['favorites'],
        queryFn: () => getFavorites(),
        refetchInterval: 1000
    });

    return <FavoriteFilm defaultData={data} />;
};
