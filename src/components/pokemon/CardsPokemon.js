import { useEffect, useState } from "react";
import { useDeferredValue } from "react";
import Image from 'next/image';
import '../../styles/pokemon.css';

export default function CardsPokemon({ query }) {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const itemsPorPagina = 16;

    const deferredQuery = useDeferredValue(query);

    useEffect(() => {
      const abortController = new AbortController();
      let retryCount = 0;
      const maxRetries = 3;

      async function obtenerDatos() {
        setIsLoading(true);
        setError(null);

        const fetchWithRetry = async () => {
          try {
            const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1000', {
              signal: abortController.signal
            });
            
            if (!res.ok) throw new Error('Network response was not ok');
            const datos = await res.json();

            const detallesPokemon = await Promise.all(
              datos.results.map(async (pokemon) => {
                const resDetalle = await fetch(pokemon.url, {
                  signal: abortController.signal
                });
                if (!resDetalle.ok) throw new Error(`Error fetching ${pokemon.name}`);
                const detalle = await resDetalle.json();
                return {
                  name: detalle.name,
                  image: detalle.sprites?.other?.home?.front_default || 
                         detalle.sprites?.other?.dream_world?.front_default,
                  types: detalle.types.map(t => t.type.name),
                  id: detalle.id
                };
              })
            );

            setData(detallesPokemon);
            setFilteredData(detallesPokemon);
            setIsLoading(false);

          } catch (error) {
            if (error.name === 'AbortError') {
              console.log('Fetch aborted');
              return;
            }
            
            if (retryCount < maxRetries) {
              retryCount++;
              console.log(`Retry attempt ${retryCount}`);
              await new Promise(resolve => setTimeout(resolve, 1000 * retryCount));
              return fetchWithRetry();
            }
            
            setError(error.message);
            setIsLoading(false);
          }
        };

        fetchWithRetry();
      }

      obtenerDatos();

      return () => {
        abortController.abort();
        setData([]);
        setFilteredData([]);
        setCurrentPage(0);
      };
    }, []);

    useEffect(() => {
      if (deferredQuery) {
        setFilteredData(
          data.filter((pokemon) =>
            pokemon.name.toLowerCase().includes(deferredQuery.toLowerCase())
          )
        );
        setCurrentPage(0); // Reset to the first page when filtering
      } else {
        setFilteredData(data);
      }
    }, [deferredQuery, data]);

    const paginatedData = filteredData.slice(
      currentPage * itemsPorPagina,
      (currentPage + 1) * itemsPorPagina
    );

    if (error) return <div className="text-red-500 text-center mt-4">Error: {error}</div>;
    if (isLoading) return <div className="text-white text-center mt-4">Cargando Pokémon...</div>;

    return (
      <>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {paginatedData.map((pokemon) => (
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

        <div className="flex justify-center gap-4 mt-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
            className="bg-white/10 px-4 py-2 rounded hover:bg-white/20"
            disabled={currentPage === 0}
          >
            ← Anterior
          </button>
          <button
            onClick={() => setCurrentPage((prev) => (prev + 1) * itemsPorPagina < filteredData.length ? prev + 1 : prev)}
            className="bg-white/10 px-4 py-2 rounded hover:bg-white/20"
          >
            Siguiente →
          </button>
        </div>
      </>
    );
}