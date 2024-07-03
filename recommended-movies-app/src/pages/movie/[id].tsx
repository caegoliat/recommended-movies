// pages/movie/[id].tsx
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import tmdb from '../../lib/tmdb'; // Asegúrate de que la ruta sea correcta

const MovieDetailsPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query; // Obtener el ID de la película de la URL

  const [movieDetails, setMovieDetails] = useState<any>({});

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await tmdb.get(`/movie/${id}`);
        setMovieDetails(response.data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    if (id) {
      fetchMovieDetails();
    }
  }, [id]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{movieDetails.title}</h1>
      <p className="mt-2">Genres: {movieDetails.genres?.map((genre: any) => genre.name).join(', ')}</p>
      <p className="mt-2">Overview: {movieDetails.overview}</p>
      <p className="mt-2">Rating: {movieDetails.vote_average}</p>
    </div>
  );
};

export default MovieDetailsPage;
