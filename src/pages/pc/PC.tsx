import { useEffect, useState } from 'react'
import { useGetAllPokemons, useGetOnePokemon } from '../../hooks/useFetch';
import { PokemonTemplate } from '../../types';

interface CordsTemplate {
  width?: string
  height?: string
  top?: string
  left?: string
}

function PC() {
  const [selected, setSelected] = useState<PokemonTemplate>({
    name: "bulbasaur",
    url: "https://pokeapi.co/api/v2/pokemon/1/",
    id: 1
  });
  const [cords, setCords] = useState<CordsTemplate>({});
  const [imageLoaded, setImageLoaded] = useState<Boolean>(false);
  const { pokemons } = useGetAllPokemons();
  const { pokemon } = useGetOnePokemon(selected);


  useEffect(()=>{
    const pokemonSelected = document.querySelector(`[data-image="${selected.id}"]`);
    const cordsSelected = pokemonSelected?.getBoundingClientRect();
    setCords({
      width: `${cordsSelected?.width}px`,
      height: `${cordsSelected?.height}px`,
      top: `${cordsSelected?.top}px`,
      left: `${cordsSelected?.left}px`
    })

    const changeSelected = (e: KeyboardEvent) => {
      if ((e.key === "ArrowUp" || e.key === "w") && selected.id > 6){
        const nextSelection = pokemons.find(pokemon => pokemon.id === selected.id - 6);
        nextSelection && setSelected(nextSelection);
      } else if ((e.key === "ArrowLeft" || e.key === "a") && selected.id > 1){
        const nextSelection = pokemons.find(pokemon => pokemon.id === selected.id - 1);
        nextSelection && setSelected(nextSelection);
      } else if ((e.key === "ArrowDown" || e.key === "s") && selected.id < 25){
        const nextSelection = pokemons.find(pokemon => pokemon.id === selected.id + 6);
        nextSelection && setSelected(nextSelection);
      } else if ((e.key === "ArrowRight" || e.key === "d") && selected.id < 30){
        const nextSelection = pokemons.find(pokemon => pokemon.id === selected.id + 1);
        nextSelection && setSelected(nextSelection);
      } 
    }

    document.addEventListener("keydown", changeSelected);
    return () => document.removeEventListener("keydown", changeSelected);
  }, [pokemons, selected])

  useEffect(() => {
    setImageLoaded(false);
  }, [pokemon])

  return (
    <div className="pc-wrapper">
      <div className="pc-background"/>
      <div className="info-pkmn-wrapper">
        <div className="pokemon-sprite">
          <img
            src={pokemon?.sprites.versions?.['generation-iii']['firered-leafgreen'].front_default}
            alt={pokemon?.name}
            style={imageLoaded ? {} : {display: "none"}}
            onLoad={() => setImageLoaded(true)}
          />
        </div>
        <div className="pokemon-data">
          <h2 className="pokemon-name">
            {`${pokemon?.name?.charAt(0).toUpperCase()}${pokemon?.name.slice(1)}`}<br/>
            /{`${pokemon?.name?.charAt(0).toUpperCase()}${pokemon?.name.slice(1)}`}
          </h2>
        </div>
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