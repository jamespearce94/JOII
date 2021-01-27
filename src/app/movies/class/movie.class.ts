import { environment } from "src/environments/environment";
import {all, isArray, isBoolean, isFinite, isString} from "underscore";


export class Movie {
    public id: number;
    public adult: boolean;
    public backdrop_path: string;
    public genre_ids: number[];
    public original_language: string;
    public original_title: string;
    public overview: string;
    public popularity: number;
    public poster_path: string;
    public release_date: Date;
    public title: string;
    public video: boolean;
    public vote_average: number;
    public vote_count: number;
    public favourite: boolean;

    private baseImgUrl: string = environment.baseImgUrl;

    constructor(movie: any) {
        this.id = isFinite(movie?.id) ? +movie.id : null;
        this.adult = isBoolean(movie?.adult) ? movie.adult : null;
        this.genre_ids = isArray(movie?.genre_ids) && all(movie?.genre_ids, x => isFinite(x)) ? movie.genre_ids : [];
        this.original_language = isString(movie?.original_language) ? movie.original_language : '';
        this.original_title = isString(movie?.original_title) ? movie.original_title : '';
        this.overview = isString(movie?.overview) ? movie.overview : '';
        this.popularity = isFinite(movie?.popularity) ? +movie.popularity : null;
        this.release_date = this.getReleaseDate(movie?.release_date);
        this.title = isString(movie?.title) ? movie.title : '';
        this.video = isBoolean(movie?.video) ? movie.video : null;
        this.vote_average = isFinite(movie?.vote_average) ? +movie.vote_average : null;
        this.vote_count = isFinite(movie?.vote_count) ? +movie.vote_count : null;
        this.favourite = isBoolean(movie?.favourite) ? movie?.favourite : false;

        this.setPosterPath(movie?.poster_path);
        this.setBackdropPath(movie?.backdrop_path);
    }

    private setPosterPath(url: string): void {
        this.poster_path = `${this.baseImgUrl}${url}`;
    }

    private setBackdropPath(url: string): void {
        this.backdrop_path = `${this.baseImgUrl}${url}`;
    }

    private getReleaseDate(date: string): Date {

        const timestamp = Date.parse(date);

        if (!date || date?.length === 0 || !isFinite(timestamp)) {
            throw new Error("Invalid release date for movie.");
        }

        return new Date(timestamp);
    }
}