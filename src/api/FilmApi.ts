import axios from 'axios';
import { BaseFilm, FilmData } from '../types';

const FILM_URL = import.meta.env.VITE_FILM_URL;
const FILM_API_KEY = import.meta.env.VITE_FILM_API_KEY;

const axiosInstance = axios.create({
    baseURL: FILM_URL
});

export async function getSearch(searchNeedle: string, page: number = 1): Promise<BaseFilm> {
    const res = await axiosInstance.get<BaseFilm>(`?s=${searchNeedle}&apikey=${FILM_API_KEY}&page=${page}`);
    if (res.data.Response) return res.data;
    else throw new Error(res.data.Error);
}

export async function getFilm(filmId: string): Promise<FilmData> {
    const res = await axiosInstance.get<FilmData>(`?i=${filmId}&apikey=${FILM_API_KEY}`);
    return res.data;
}
