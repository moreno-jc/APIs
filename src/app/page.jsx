"use client";


import { Suspense, useState, useDeferredValue } from 'react';
import { useTransition } from 'react';
import PokemonApi from '@/components/ApiPokemon.js';
import RickMortyApi from '@/components/ApiRickyMorty';
import MoviesApi from '@/components/Movies';
import './globals.css';

export default function App() {
  return (
    <Suspense fallback={<BigSpinner />}>
      <Router />
    </Suspense>
  );
}

function Router() {
  const [page, setPage] = useState('/');
  const [isPending, startTransition] = useTransition();


  function navigate(url) {
    startTransition(() => {
      setPage(url);
    });
  }

  let content;
  if (page === '/pokemon') {
    content = <PokemonApi />;
  } else if (page === '/rick-and-morty') {
    content = <RickMortyApi />;
  } else if (page === '/peliculas') {
    content =<MoviesApi />;
  } else {
    content  = <PokemonApi />;; // home sin sección adicional
  }

  return (
    <section className='min-h-screen flex flex-col items-center px-4'>
      {/* Siempre visibles */}
      <div className="text-center mt-8">
        <h1 className="text-4xl font-bold text-white">API Connection</h1>
        <p className="text-gray-400 text-lg">Selecciona una API</p>
        <div className="flex flex-row justify-center mt-6 gap-6">
          <button className="rounded-2xl border-white py-3 px-4 border text-white" onClick={() => navigate('/pokemon')}>
            Pokemon 
          </button>
          <button className="rounded-2xl border-white py-3 px-4 border text-white" onClick={() => navigate('/rick-and-morty')}>
            Rick & Morty 
          </button>
          <button className="rounded-2xl border-white py-3 px-4 border text-white" onClick={() => navigate('/peliculas')}>
            Peliculas 
          </button>
        </div>
      </div>

      {/* Sección que cambia */}
      <div className="mt-10 w-full flex justify-center">
        {isPending && <BigSpinner />}
        {!isPending && content}
      </div>
    </section>
  );
}


function BigSpinner() {
  return <h2>🌀 Loading...</h2>;
}

/*
import Link from 'next/link';

export default function Home() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen text-center bg-gray-800 text-white'>
      <h1 className='text-center font-bold text-5xl'>API's 
        </h1>
        <span className='text-center font-extralight text-5xl'>
        connection
          </span>
      <div className='flex flex-row items-center justify-center mt-10 gap-12'>
        <Link className='border-2 border-white py-3 px-6 rounded-2xl' href={'/Rick&Morty'}>Rick & Morty</Link>
        <Link className='border-2 border-white py-3 px-6 rounded-2xl'  href={'/Pokemon'}>Pokemon</Link>
        <Link className='border-2 border-white py-3 px-6 rounded-2xl' href={'/blog'}>Peliculas</Link>
      </div>
    </div>
  );
}

style={styles.button} 
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: '20px',
  },
  button: {
    margin: '10px',
    padding: '15px 30px',
    fontSize: '16px',
    cursor: 'pointer',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    transition: 'background-color 0.3s',
  },
};
*/
