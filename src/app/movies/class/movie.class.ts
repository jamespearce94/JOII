import { environment } from 'src/environments/environment';
import { isBoolean, isFinite, isString, isObject } from 'underscore';

/*
    - Movie class only includes required fields for the application.
    - I kept this as a simple class as there is currently no other variations.
      This class would be simple to extend in future if for example a Tv show class required with similar fields.
*/

export class Movie {
  public id: number;
  public overview: string;
  public poster_path: string;
  public release_date: Date;
  public title: string;
  public vote_average: number;
  public favourite: boolean;

  private baseImgUrl: string = environment.baseImgUrl;

  constructor(movie: any) {
    if (!movie || !isObject(movie)) {
      throw new Error('Invalid movie model.');
    }
    this.id = isFinite(movie?.id) ? +movie.id : null;
    this.overview = isString(movie?.overview) ? movie.overview : '';
    this.release_date = this.getReleaseDate(movie?.release_date); // Important to convert release date as API returns as string.
    this.title = isString(movie?.title) ? movie.title : '';
    this.vote_average = isFinite(movie?.vote_average) ? +movie.vote_average : null;
    this.favourite = isBoolean(movie?.favourite) ? movie?.favourite : false;

    this.setPosterPath(movie?.poster_path);
  }

  private setPosterPath(url: string): void {
    if (!isString(url)) {
      throw new Error('Invalid poster path type');
    }
    this.poster_path = `${this.baseImgUrl}${url}`;
  }

  private getReleaseDate(date: string): Date {
    const timestamp = Date.parse(date);

    if (!date || date?.length === 0 || !isFinite(timestamp)) {
      throw new Error('Invalid release date for movie.');
    }

    return new Date(timestamp);
  }
}
