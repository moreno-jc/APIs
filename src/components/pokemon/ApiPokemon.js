'use client';

import { Suspense, useDeferredValue, useState } from 'react';
import CardsPokemon from './CardsPokemon';
import Image from 'next/image';
import '../../styles/pokemon.css';

function BigSpinner() {
  return <h2 className="text-white text-xl text-center">🌀 Cargando Pokémon...</h2>;
}

export default function PokemonApi() {
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);
  const isStale = query !== deferredQuery;

    return (
      <>
      <div className="rounded-2xl w-[80%] min-h-screen bg-[#0b2d9a61]  text-white p-10 text-center justify-center mx-auto">
                <Image 
          src="/logo_pokeAPI.webp" 
          alt="Logo de PokeAPI" 
          width={250} 
          height={100}  
          className="mx-auto mb-6"
        />
    
        <div className="flex items-center justify-center gap-1 mb-6">
          <Image 
            src="/pokebola.webp" 
            alt="Mini Pokebola" 
            width={50} 
            height={50} 
            className="inline-block"
          />
          <input 
            className="border-red-100 bg-white/10 rounded-2xl p-2 w-[50%] ms-0" 
            placeholder="Buscar Pokémon"
            value={query} onChange={e => setQuery(e.target.value)} 
          />
        </div>
    
        <div id="pokemon" className="flex flex-col rounded-2xl text-white p-10 text-center">
        <Suspense fallback={<BigSpinner />}>
        <div style={{ opacity: isStale ? 0.5 : 1 }}>
            <CardsPokemon query={deferredQuery} />
        </div>
        </Suspense>        
        </div>
      </div>
    </>
        );
  }


