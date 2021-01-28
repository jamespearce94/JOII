import { Movie } from './movie.class';
import { environment } from '../../../environments/environment';

/*
    With more time I would create tests for all classes and components.
    I would mock services and depencies to test API end points and the indexed-db interface.
*/

describe('MoviesClass', () => {
  it('Should create movie with title', () => {
    const item = {
      id: 123,
      title: 'Test Title',
      release_date: '2020-01-28',
      poster_path: '',
    };
    const movie = new Movie(item);

    expect(movie?.title).toEqual('Test Title');
  });

  it('Should fail when undefined', () => {
    expect(() => new Movie(undefined)).toThrow(
      new Error('Invalid movie model.')
    );
  });

  it('Should create valid release date', () => {
    const item = {
      id: 123,
      title: 'Test Title',
      release_date: '2020-01-28',
      poster_path: '',
    };
    const movie = new Movie(item);
    const date = new Date('2020-01-28');

    expect(movie?.release_date.toString()).toEqual(date.toString());
  });

  it('Should fail on invalid release date', () => {
    const item = { id: 123, title: 'Test Title', release_date: 'Date' };

    expect(() => new Movie(item)).toThrow(
      new Error('Invalid release date for movie.')
    );
  });

  it('Should fail on missing release date', () => {
    const item = { id: 123, title: 'Test Title' };

    expect(() => new Movie(item)).toThrow(
      new Error('Invalid release date for movie.')
    );
  });

  it('Should create valid poster path', () => {
    const imgPath = '/image.png';
    const item = { id: 123, release_date: '2020-01-28', poster_path: imgPath };
    const movie = new Movie(item);

    expect(movie?.poster_path).toEqual(`${environment.baseImgUrl}${imgPath}`);
  });

  it('Should fail when poster path is not a string', () => {
    const imgPath = null;
    const item = { id: 123, release_date: '2020-01-28', poster_path: imgPath };

    expect(() => new Movie(item)).toThrow(
      new Error('Invalid poster path type')
    );
  });
});
