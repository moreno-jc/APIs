'use client';

import { useDeferredValue, useState } from 'react';
import CardsRickMorty from './CardsRickMorty';
import Image from 'next/image';
import '../../styles/rickMorty.css';


export default function RickMortyApi() {

    const [query, setQuery] = useState();
    
   const deferredQuery = useDeferredValue(query);
    const isStale = query !== deferredQuery;
    return (

      <>
      <div className="rounded-2xl w-[80%] min-h-screen bg-[#0b2d9a61]  text-white p-10 text-center justify-center mx-auto">
          <div id="rickMorty" className="flex flex-col rounded-2xl text-white p-10 text-center">
            <Image 
              src="/logo_rickMorty.webp" 
              alt="Logo de Rick y Morty" 
              width={250} 
              height={100}  
              className="mx-auto mb-6"
            />
            <div className="flex items-center justify-center gap-1 mb-6">
              <Image 
                src="/portal.webp" 
                alt="Portal de Rick y Morty" 
                width={50} 
                height={50} 
                className="inline-block"
              />
              <input 
                className="border-red-100 bg-white/10 rounded-2xl p-2 w-[50%] ms-0" 
                placeholder="Buscar Personaje"
                value={query} onChange={e => setQuery(e.target.value)} 
              />
            </div>
          </div>
          <div className="flex flex-col rounded-2xl text-white p-10 text-center">
            <div>
              <CardsRickMorty query={deferredQuery}/>
            </div>
            </div>
      </div>

      </>
    );
  }
  