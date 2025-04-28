"use client";

export default function Navbar({ navigate, currentPage }) {
  return (
    <nav className="fixed top-4 left-4 right-4 px-6 py-3 
                    backdrop-blur-mdshadow-lg z-50">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-white 
                       hover:text-transparent hover:bg-clip-text
                       hover:bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400
                       transition-all duration-500 animate-pulse">
          API Connection
        </h1>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/pokemon')}
            className={`px-4 py-2 rounded-xl transition-all duration-300
                       hover:text-cyan-400 hover:shadow-[0_0_2rem_-0.5rem_#22d3ee]
                       hover:border-cyan-400 border-2 border-transparent
                       ${currentPage === '/pokemon' ? 'text-cyan-400 border-cyan-400' : 'text-white'}`}
          >
            Pokemon
          </button>
          <button 
            onClick={() => navigate('/rick-and-morty')}
            className={`px-4 py-2 rounded-xl transition-all duration-300
                       hover:text-purple-400 hover:shadow-[0_0_2rem_-0.5rem_#c084fc]
                       hover:border-purple-400 border-2 border-transparent
                       ${currentPage === '/rick-and-morty' ? 'text-purple-400 border-purple-400' : 'text-white'}`}
          >
            Rick & Morty
          </button>
          <button 
            onClick={() => navigate('/peliculas')}
            className={`px-4 py-2 rounded-xl transition-all duration-300
                       hover:text-pink-400 hover:shadow-[0_0_2rem_-0.5rem_#f472b6]
                       hover:border-pink-400 border-2 border-transparent
                       ${currentPage === '/peliculas' ? 'text-pink-400 border-pink-400' : 'text-white'}`}
          >
            Películas
          </button>
        </div>
      </div>
    </nav>
  );
}
