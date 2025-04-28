"use client";

import { Suspense, useState } from 'react';
import { useTransition } from 'react';
import PokemonApi from '@/components/pokemon/ApiPokemon';
import RickMortyApi from '@/components/rickMorty/ApiRickyMorty';
import MoviesApi from '@/components/Movies';
import Navbar from '@/components/Navbar';
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
    content = <MoviesApi />;
  } else {
    content = <PokemonApi />;
  }

  return (
    <section className='relative min-h-screen flex flex-col items-center px-4 overflow-hidden'>
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <Navbar navigate={navigate} currentPage={page} />
      
      <div className="text-center mt-24 relative z-10">
        <p className="text-gray-400 text-lg font-light tracking-wider">Selecciona una API</p>
      </div>

      <div className="mt-10 w-full max-w-6xl flex justify-center relative z-10">
        <div className="w-full backdrop-blur-lg bg-black/30 rounded-3xl border border-white/10 p-8 shadow-2xl glow-effect">
          {isPending && <BigSpinner />}
          {!isPending && content}
        </div>
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
