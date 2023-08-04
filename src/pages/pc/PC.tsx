import { useEffect, useState } from 'react'

interface DataResponse {
  count: number;
  next: string;
  previous: null | string;
  results: PokemonTemplate[];
}

interface PokemonTemplate {
  name: string
  url:  string
  id: number
}

interface CordsTemplate {
  width?: string
  height?: string
  top?: string
  left?: string
}


function PC() {
  const [pokemons, setPokemons] = useState<PokemonTemplate[]>([]);
  const [selected, setSelected] = useState<number>(1);
  const [cords, setCords] = useState<CordsTemplate>({});

  useEffect(() => {
    const getPokemons = async() => {
      const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
      const data = await response.json() as DataResponse;
      const allPokemons = data.results.map((pokemon, index) => ({
          ...pokemon,
          id: index + 1
      }));
      setPokemons(allPokemons)
    }
    getPokemons();
  }, [])

  useEffect(()=>{
    const pokemonSelected = document.querySelector(`[data-image="${selected}"]`);
    const cordsSelected = pokemonSelected?.getBoundingClientRect();
    setCords({
      width: `${cordsSelected?.width}px`,
      height: `${cordsSelected?.height}px`,
      top: `${cordsSelected?.top}px`,
      left: `${cordsSelected?.left}px`
    })

    const changeSelected = (e: any) => {
      if (e.key === "ArrowUp" || e.key === "w"){
        setSelected(prevSelected => prevSelected - 6);
      } else if (e.key === "ArrowLeft" || e.key === "a"){
        setSelected(prevSelected => prevSelected - 1);
      } else if (e.key === "ArrowRight" || e.key === "s"){
        setSelected(prevSelected => prevSelected + 1);
      } else if (e.key === "ArrowDown" || e.key === "d"){
        setSelected(prevSelected => prevSelected + 6);
      } 
    }
    document.addEventListener("keydown", changeSelected)
    return () => document.removeEventListener("keydown", changeSelected);
  }, [selected])



  return (
    <div className="pc-wrapper">
      <div className="pc-background"/>
      <div className="pkmn-data-wrapper">

      </div>
      <div className="all-boxes-wrapper">
        <div className="all-boxes">
          <div className="box-wrapper box-1">
            <div className="pokemons-in-box-wrapper">
              { pokemons.length > 0
                ? pokemons.slice(0, 30).map(pokemon => {
                  return(
                    <div className="pokemon-in-box" data-image={pokemon.id} key={pokemon.name}>
                      <img src={`/images/pokemons/Pokemon_N°${pokemon.id}.png`}/>
                    </div>
                  )})
                : <div className="pokemon-in-box" data-image="1"/>
              }
            </div>
            <div className="arrows-wrapper">
              <img className="arrow-left arrow" src="/images/arrow-left.png" />
              <img className="arrow-right arrow" src="/images/arrow-right.png" />
            </div>
          </div>
        </div>
      </div>
      <div style={cords} className="hand-selector">
        <img src="/images/selector.png" alt="Hand selector"/>
      </div>
    </div>
  )
}

export default PC