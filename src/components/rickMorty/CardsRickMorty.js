import { useEffect, useState } from "react";
import { useDeferredValue } from "react";
import Image from 'next/image';
import '../../styles/rickMorty.css'; 

export default function CardsRickMorty({query }) {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPorPagina = 16;

    const deferredQuery = useDeferredValue(query);

    useEffect(() => {
        async function obtenerDatos() {

        try {
            const res = await fetch(`https://rickandmortyapi.com/api/character`);
            
            const datos = await res.json();
            const detallesPersonaje = await Promise.all(
                datos.results.map(async (personaje) => {
                    return {
                        name: personaje.name,
                        image: personaje.image,
                        species: personaje.species,
                        id: personaje.id
                    };
                })
            );
            setData(detallesPersonaje);
            setFilteredData(detallesPersonaje);
        } catch (error) {
            console.error('Error al obtener los datos:', error);
        } 
    }
        obtenerDatos();

    },[]);

    useEffect(() => {
        if (deferredQuery) {
            setFilteredData(
                data.filter((personaje) =>
                    personaje.name.toLowerCase().includes(deferredQuery.toLowerCase())
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

      
      return (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {paginatedData.map((personaje) => (
            <div
              key={personaje.name}
              className="bg-white/10 p-4 rounded-lg hover:bg-white/20 transition text-center sizeCards"
            >
              <div className="flex justify-center mb-2">
                <Image 
                  src={personaje.image} 
                  alt={personaje.name}
                  width={96}
                  height={96}
                  className="rounded-full shadowImg"
                />
              </div>
              <h2 className="nameCards text-white font-bold text-2xl">{personaje.name}</h2>
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

