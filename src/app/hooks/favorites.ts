import { Film, FilmData } from '../../types';

export function addToFavorites(film: FilmData) {
    if (isFavorite(film.imdbID)) return;
    const films = getFavorites();
    films.push({ imdbID: film.imdbID, Title: film.Title, Year: film.Year, Type: film.Type, Poster: film.Poster });
    localStorage.setItem('films', JSON.stringify(films));
}

export function removeFromFavorites(filmId: string) {
    const favorites = getFavorites();
    const newFavorites = favorites.filter((film) => film.imdbID !== filmId);
    localStorage.setItem('films', JSON.stringify(newFavorites));
}

export function isFavorite(filmId: string) {
    const favorites = getFavorites();
    return !!favorites.find((film) => film.imdbID === filmId);
}

export function getFavorites(): Film[] {
    const favorites = localStorage.getItem('films');
    return favorites ? JSON.parse(favorites) : [];
}
