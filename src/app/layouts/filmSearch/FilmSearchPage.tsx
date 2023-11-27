import { useInfiniteQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { FC, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FilmApi } from '../../../api';
import { Film } from '../../../types';
import { useDebounce } from '../../hooks';
import queryKeys from '../../hooks/queryKeys';
import { FilmSearch } from './FilmSearch';

const PAGE_SIZE: number = 10;

export const FilmSearchPage: FC = () => {
    const [searchFilmString, setSearchFilmString] = useState<string>('');
    const [films, setFilms] = useState<Film[]>([]);
    const [totalResults, setTotalResults] = useState<number>(0); // data.pages[0].totalResults ?? 0
    const [hasNextPage, setHasNextPage] = useState<boolean>(false);

    const debouncedString = useDebounce(searchFilmString, 700);

    const { isLoading, fetchNextPage } = useInfiniteQuery({
        queryKey: [...queryKeys.FILMS, debouncedString],
        queryFn: ({ pageParam = 1 }) => FilmApi.getSearch(debouncedString, pageParam),
        getNextPageParam: (_, allPages) => allPages.length + 1,
        onSuccess: (data) => {
            setTotalResults(data.pages[0].totalResults ?? 0);
            setHasNextPage(data.pages[0].totalResults ? data.pages.length * PAGE_SIZE < data.pages[0].totalResults : false);
            setFilms(data?.pages.reduce((base, next) => [...base, ...(next.Search ?? [])], [] as Film[]) || ([] as Film[]));
        },
        onError: (response: AxiosError<{ Error: string }>) => {
            toast.error(`Někde se stala chyba | ${response.response?.data.Error || ''}`);
        },
        enabled: !!debouncedString && debouncedString.length > 2
    });

    useEffect(() => {
        if (!debouncedString && debouncedString.length < 2) setFilms([]);
    }, [debouncedString, setFilms]);

    return (
        <FilmSearch
            hasNextPage={hasNextPage && !!debouncedString}
            defaultData={films}
            totalResults={totalResults}
            setSearchFilmString={setSearchFilmString}
            loadingFilms={isLoading && !!debouncedString && debouncedString.length > 2}
            fetchNextPage={fetchNextPage}
            error={debouncedString && debouncedString.length > 2 ? undefined : 'Zadejte minimálně 3 znaky'}
        />
    );
};
