// pages/search.tsx

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import tmdb from '../lib/tmdb'; // Ajusta la ruta de importación si es necesario

const SearchPage: React.FC = () => {
  const router = useRouter();
  const { query } = router.query; // Obtener el término de búsqueda de la URL

  const [results, setResults] = useState<any[]>([]);
  const [relatedMovies, setRelatedMovies] = useState<any[]>([]); // Estado para películas relacionadas
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      setError(null);

      try {
        if (query) {
          const response = await tmdb.get('/search/movie', {
            params: { query },
          });
          setResults(response.data.results);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [query]);

  const handleClick = async (id: number) => {
    setLoading(true);
    setError(null);

    try {
      const response = await tmdb.get(`/movie/${id}/similar`);
      setRelatedMovies(response.data.results);
    } catch (error) {
      console.error('Error fetching related movies:', error);
      setError('Error fetching related movies');
    } finally {
      setLoading(false);
    }
  };

  const handleMovieClick = (id: number) => {
    router.push(`/movie/${id}`); // Redirigir a la página dinámica de la película
  };

  const handleRelatedClick = (id: number) => {
    router.push(`/movie/${id}`); // Redirigir a la página dinámica de la película relacionada
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Search Results for "{query}"</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {results.map((movie) => (
          <div
            key={movie.id}
            className="bg-white rounded-lg overflow-hidden shadow-md cursor-pointer"
            onClick={() => handleMovieClick(movie.id)} // Manejar clic en la película
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold">{movie.title}</h3>
              <p className="text-gray-600">{movie.release_date}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Mostrar películas relacionadas */}
      {relatedMovies.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Related Movies</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {relatedMovies.map((movie) => (
              <div
                key={movie.id}
                className="bg-white rounded-lg overflow-hidden shadow-md cursor-pointer"
                onClick={() => handleRelatedClick(movie.id)} // Manejar clic en la película relacionada
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold">{movie.title}</h3>
                  <p className="text-gray-600">{movie.release_date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
