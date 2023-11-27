export type Film = {
    imdbID: string;
    Title: string;
    Year: string;
    Type: string;
    Poster: string;
};

export type BaseFilm = {
    Search?: Film[];
    totalResults?: number;
    Response: string;
    Error?: string;
};

export type FilmData = {
    Title: string;
    Year: string;
    Released: string;
    Runtime: string;
    Genre: string;
    Director: string;
    Writer: string;
    Actors: string;
    Plot: string;
    Language: string;
    Country: string;
    Awards: string;
    Poster: string;
    imdbRating: string;
    imdbVotes: string;
    imdbID: string;
    Type: string;
    DVD?: string;
    BoxOffice?: string;
    Production?: string;
    Website?: string;
    Response: string;
    Error?: string;
};
