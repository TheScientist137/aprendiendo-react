import withResults from '../mocks/with-results.json'
import withoutResults from '../mocks/no-results.json'

// Custom hook who makes the data fetching
export function useMovies () {
  const movies = withResults.Search // Array Search

  const mappedMovies = movies?.map(movie => ({
    id: movie.imdbID,
    title: movie.Title,
    year: movie.Year,
    poster: movie.Poster
  }))

  return { movies: mappedMovies }
}
