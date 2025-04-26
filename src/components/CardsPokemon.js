import { useEffect, useState } from "react";
import { useDeferredValue } from "react";
import Image from 'next/image';
import '../styles/pokemon.css';

export default function CardsPokemon({ query }) {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

    const deferredQuery = useDeferredValue(query);

    useEffect(() => {
      async function obtenerDatos() {
        try {
          const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=1000`);
          const datos = await res.json();

          const detallesPokemon = await Promise.all(
            datos.results.map(async (pokemon) => {
              const resDetalle = await fetch(pokemon.url);
              const detalle = await resDetalle.json();
              return {
                name: detalle.name,
                image: detalle.sprites?.other?.home?.front_default || detalle.sprites?.other?.dream_world?.front_default,
                types: detalle.types.map(t => t.type.name),
                id: detalle.id
              };
            })
          );

          setData(detallesPokemon);
          setFilteredData(detallesPokemon);

        } catch (error) {
          console.error('Error al obtener los datos:', error);
        } 
      }
      obtenerDatos();
    }, []);

    useEffect(() => {
      if (deferredQuery) {
        setFilteredData(
          data.filter((pokemon) =>
            pokemon.name.toLowerCase().includes(deferredQuery.toLowerCase())
          )
        );
      } else {
        setFilteredData(data);
      }
    }, [deferredQuery, data]);

    return (
      <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
  {filteredData.map((pokemon) => (
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
</>
    );
  }