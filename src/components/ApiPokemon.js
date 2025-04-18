export default function PokemonApi() {
    return (
      <>
        <div className='rounded-2xl w-[80%] min-h-screen bg-white/10 text-white p-10 text-center'>
          <h1 className='font-bold text-3xl'>HOLA</h1>
          <p className='mt-4'>Este es el contenido de la API Pokemon.</p>
          <div id="pokemon" className='flex flex-col rounded-2xl text-white p-10 text-center'>
          </div>
        </div>
       
      </>
 
    );
  }

    async function obtenerDatos() {
      try {
        const res = await fetch('https://pokeapi.co/api/v2/pokemon')
        const data = await res.json()
        console.log(data);
    
      } catch (error) {
        console.error(error);
      }
    }
    obtenerDatos();
    