import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { CordsTemplate, PokemonTemplate } from '../../types';
import { useGetAllPokemons, useGetOnePokemon } from '../../hooks/useFetch';
import { SoundtrackContext } from '../../context/SoundtrackContext';

function PC() {
  const [selected, setSelected] = useState<PokemonTemplate>({
    name: "bulbasaur",
    url: "https://pokeapi.co/api/v2/pokemon/1/",
    id: 1
  });
  const [boxActive, setBoxActive] = useState<number>(1);
  const [cords, setCords] = useState<CordsTemplate>({});
  const [imageLoaded, setImageLoaded] = useState<Boolean>(false);
  const [transition, setTransition] = useState<Boolean>(true);
  const { pokemons } = useGetAllPokemons();
  const { pokemon } = useGetOnePokemon(selected.name);
  const soundtrack = useContext(SoundtrackContext);

  const navigate = useNavigate();

  const selectAudio = new Audio("/media/selector-sound.mp3");

  useEffect(() => {
    soundtrack?.playSoundtrack();
    setTransition(false);
  }, [])

  useEffect(()=>{
    const pokemonSelected = document.querySelector(`[data-image="${selected.id}"]`);
    const cordsSelected = pokemonSelected?.getBoundingClientRect();
    setCords({
      width: `${cordsSelected?.width}px`,
      height: `${cordsSelected?.height}px`,
      top: `${cordsSelected?.top}px`,
      left: `${cordsSelected?.left}px`
    });

    const findSelection = (operation: string, number: number) => {
      if (operation === "prev") {
        const nextSelection = pokemons.find(pokemon => pokemon.id === selected.id - number);
        nextSelection && setSelected(nextSelection);
      } else if (operation === "next"){
        const nextSelection = pokemons.find(pokemon => pokemon.id === selected.id + number);
        nextSelection && setSelected(nextSelection);
      }
      setImageLoaded(false);
      selectAudio.play();
    } 

    const changeSelected = (e: KeyboardEvent) => {
      if ((e.key === "ArrowUp" || e.key === "w") && ( selected.id > 30 * (boxActive - 1) && selected.id <= 6 + (30 * (boxActive - 1)) )){
        setSelected({
          name: "",
          url: "",
          id: 0
        })
        setImageLoaded(false);
        selectAudio.play();
      } else if ((e.key === "ArrowLeft" || e.key === "a") && selected.id === 0){
        boxActive > 1 && setBoxActive(prev => prev - 1);
        setImageLoaded(false);
        selectAudio.play();
      } else if ((e.key === "ArrowDown" || e.key === "s") && selected.id === 0){
        setSelected({
          name: pokemons[30 * (boxActive - 1)].name,
          url: pokemons[30 * (boxActive - 1)].url,
          id: pokemons[30 * (boxActive - 1)].id
        })
        selectAudio.play();
        setImageLoaded(false);
      } else if ((e.key === "ArrowRight" || e.key === "d") && selected.id === 0){
        boxActive < 6 && setBoxActive(prev => prev + 1);
        selectAudio.play();
        setImageLoaded(false);
      } else if ((e.key === "ArrowUp" || e.key === "w") && ( selected.id > 6 + (30 * (boxActive - 1)) && selected.id <= 30 + 30 * (boxActive - 1) )){
        findSelection("prev", 6);
      } else if ((e.key === "ArrowLeft" || e.key === "a") && ( selected.id > 1 + (30 * (boxActive - 1)) && selected.id <= 30 + 30 * (boxActive - 1) )){
        findSelection("prev", 1);
      } else if ((e.key === "ArrowDown" || e.key === "s") && ( selected.id > 0 + (30 * (boxActive - 1)) && selected.id < 25 + 30 * (boxActive - 1) )){
        findSelection("next", 6);
      } else if ((e.key === "ArrowRight" || e.key === "d") && ( selected.id > 0 + (30 * (boxActive - 1)) && selected.id < 30 + 30 * (boxActive - 1) )){
        findSelection("next", 1);
      } else if (e.key === "Enter"){
        setTransition(true);
        setImageLoaded(false);
        selectAudio.play();
        setTimeout(() => {
          navigate(`/datos/${selected.name}`);
        }, 400);
      }
    }

    document.addEventListener("keydown", changeSelected);
    return () => document.removeEventListener("keydown", changeSelected);
  }, [pokemons, selected, boxActive])

  return (
    <>
      <div className="pc-wrapper">
        <div className="pc-background"/>
        <div className="info-pkmn-wrapper">
          <div className="pokemon-sprite">
            { selected.name &&
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/firered-leafgreen/${selected.id}.png`}
                alt={pokemon?.name}
                style={imageLoaded ? {display: "block"} : {display: "none"}}
                onLoad={() => setImageLoaded(true)}
              />
            }
          </div>
          <div className="pokemon-data">
            { selected.name &&
              <h2 className="pokemon-name">
                {`${selected.name?.charAt(0).toUpperCase()}${selected?.name.slice(1)}`}<br/>
                /{`${selected.name?.charAt(0).toUpperCase()}${selected?.name.slice(1)}`}
              </h2>
            }
          </div>
        </div>
        <div className="all-boxes-wrapper">
          <div className="all-boxes" style={{transform: `translateX(calc(-${100 * (boxActive - 1)}% - ${10 * (boxActive - 1)}vw))`}}>
            {[1,2,3,4,5,6].map((boxNumber, index) => {
              return(
                <div className={`box-wrapper box-${boxNumber}`} style={{backgroundImage: `url(/images/box-${boxNumber}.webp)`}} key={boxNumber}>
                  <div className="pokemons-in-box-wrapper">
                    { pokemons.length > 0 &&
                        pokemons.slice(30 * index, 30 * boxNumber).map(pokemon => {
                          return(
                            <div className="pokemon-in-box" data-image={pokemon.id} key={pokemon.name}>
                              <img src={`/images/pokemons/Pokemon_N°${pokemon.id}.webp`} alt={pokemon.name}/>
                            </div>
                          )
                        })
                    }
                  </div>
                  <div className="arrows-wrapper">
                    <img className="arrow-left arrow" src="/images/arrow-left.webp" />
                    <img className="arrow-right arrow" src="/images/arrow-right.webp" />
                  </div>
                  <div className="box-name">
                    <h1>{`CAJA ${boxNumber}`}</h1>
                  </div>
                </div>
              )})
            }
          </div>
          <div className="box-template" data-image="0"/>
        </div>
        { pokemons &&
          <div style={cords} className="hand-selector">
            <img src="/images/selector.webp" alt="Hand selector"/>
          </div>
        }
      </div>
      <div className="transition-shadow" style={transition ? {background: "rgb(0 0 0 / 100%)"} : {}}/>
    </>
  )
}

export default PC