'use client';

import { useEffect, useState } from "react";
import Image from 'next/image';
import '../styles/pokemon.css';

export default function PokemonApi() {
    return (
      <>
        <div className='rounded-2xl w-[80%] min-h-screen bg-white/10 text-white p-10 text-center justify-center'>
          <Image src="/logo_pokeAPI.webp" alt="Logo de PokeAPI" width={250} height={100}  className="mx-auto"/>
          <p className='mt-4'>Aqui va ir el buscador</p>
          <div id="pokemon" className='flex flex-col rounded-2xl text-white p-10 text-center'>
          <CardsPokemon />
          </div>
        </div>
       
      </>
 
    );
  }

  function CardsPokemon () {
    const [data, setData] = useState (null);

    useEffect(() => {
      async function obtenerDatos() {
        try {
          const res = await fetch('https://pokeapi.co/api/v2/pokemon');
          const datos = await res.json();

          const detallesPokemon = await Promise.all(
            datos.results.map(async (pokemon) => {
              const resDetalle = await fetch(pokemon.url);
              const detalle = await resDetalle.json();
              return {
                name: pokemon.name,
                image: detalle.sprites?.other?.home?.front_default || detalle.sprites?.other?.dream_world?.front_default,
              };
            })
          );
  
          setData(detallesPokemon);
  
        } catch (error) {
          console.error('Error al obtener los datos:', error);
        } 
    }
      obtenerDatos();
    }, []);

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
  {data?.map((pokemon) => (
    <div
      key={pokemon.name}
      className="bg-white/10 p-4 rounded-lg hover:bg-white/20 transition text-center sizeCards"
    >
      <div className="flex justify-center mb-2">
        <Image 
          src={pokemon.image} 
          alt={pokemon.name}
          width={96}
          height={96}
          className="rounded-full shadowImg"
        />
      </div>
      <h2 className="nameCards text-white font-bold text-2xl">{pokemon.name}</h2>
    </div>
  ))}
</div>

    );
  }
  