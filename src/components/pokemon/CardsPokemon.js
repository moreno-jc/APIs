import { useEffect, useState, useDeferredValue, startTransition} from "react";
import Image from 'next/image';
import '../../styles/pokemon.css';

export default function CardsPokemon({ query }) {
    const [fullData, setFullData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const itemsPorPagina = 16;

    const deferredQuery = useDeferredValue(query);

       // Función auxiliar para transformar datos de pokémon
       const transformPokemonData = (pokemonData) => ({
        name: pokemonData.name,
        image: pokemonData.sprites?.other?.home?.front_default || 
               pokemonData.sprites?.other?.dream_world?.front_default,
        types: pokemonData.types.map(t => t.type.name),
        id: pokemonData.id
      });

          // Función auxiliar para fetch
        const fetchPokemonDetails = async (url, signal) => {
          const response = await fetch(url, { signal });
          if (!response.ok) throw new Error(`Error fetching ${url}`);
          return await response.json();
        };

    useEffect(() => {
      const abortController = new AbortController();

      async function obtenerDatos() {
        setIsLoading(true);
        setError(null);

        try {
            // Fetch rápido inicial
            const quickData = await fetchPokemonDetails(
              'https://pokeapi.co/api/v2/pokemon?limit=20',
              abortController.signal
            );
          const quickDetails = await Promise.all(
            quickData.results.map(async (pokemon) => {
              const FirstResponse = await fetch(pokemon.url, { signal: abortController.signal});
              const FirstDataset = await FirstResponse.json();
              return transformPokemonData(FirstDataset);
            })
          );

          setFilteredData(quickDetails);
          setIsLoading(false);



        startTransition (() => {
            // Fetch rápido inicial
            fetchPokemonDetails(
              'https://pokeapi.co/api/v2/pokemon?limit=1000',
              abortController.signal
            )
            .then( async (fullDataset) => {
              const detallesPokemon = await Promise.all(
                fullDataset.results.map(async (pokemon) => {
                  const resDetalle = await fetch(pokemon.url, {
                    signal: abortController.signal
                  });
                  if (!resDetalle.ok) throw new Error(`Error fetching ${pokemon.name}`);
                  const fullData = await resDetalle.json();
                  return transformPokemonData(fullData);
                })
              );
              
              setFullData(detallesPokemon);
              setFilteredData(detallesPokemon);
            });
          });

        } catch (error) {
            if (error.name === 'AbortError') {
              console.log('Fetch aborted');
              return;
            }
            setError(error.message);
            setIsLoading(false);
            
          }
        }
      obtenerDatos();

      return () => {
        abortController.abort();
        setFullData([]);
        setFilteredData([]);
        setCurrentPage(0);
      };
    }, []);

    useEffect(() => {
      if (deferredQuery) {
        setFilteredData(
          fullData.filter((pokemon) =>
            pokemon.name.toLowerCase().includes(deferredQuery.toLowerCase())
          )
        );
        setCurrentPage(0); // Reset to the first page when filtering
      } else {
        setFilteredData(fullData);
      }
    }, [deferredQuery, fullData]);

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