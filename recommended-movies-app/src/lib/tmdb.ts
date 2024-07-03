import axios from 'axios';

const tmdb = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: '7b63ea0147dc758b2b13f26a4c1656ce', // Coloca tu clave de API directamente aquí
  },
});

export default tmdb;
