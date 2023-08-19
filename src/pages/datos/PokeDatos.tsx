import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetOnePokemon } from '../../hooks/useFetch';

function PokeDatos() {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [nID, setNID] = useState<number>();
  const [transition, setTransition] = useState<Boolean>(true);
  const { nombre } = useParams();
  const { pokemon } = useGetOnePokemon(nombre);
  const navigate = useNavigate();

  const selectAudio = new Audio("/media/selector-sound.mp3");

  useEffect(() => setTransition(false), [])

  useEffect(() => {
    setImageLoaded(false);
    setNID(Math.floor(Math.random() * (99999 - 10000) + 10000));

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "e" || e.key === "Escape") {
        setTransition(true);
        selectAudio.play();
        setTimeout(() => {
          navigate("/");
        }, 400);
      } else if ((e.key === "a" || e.key === "ArrowLeft") && pokemon) {
        if (pokemon?.id > 1){
          fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.id - 1}`)
            .then(response => response.json())
            .then(data => navigate(`/datos/${data.name}`))
            .catch(error => console.log(error))
        }
        selectAudio.play();
      } else if ((e.key === "d" || e.key === "ArrowRight") && pokemon) {
        if (pokemon?.id < 151){
          fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.id + 1}`)
            .then(response => response.json())
            .then(data => navigate(`/datos/${data.name}`))
            .catch(error => console.log(error))
        }
        selectAudio.play();
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [pokemon])
  

  return (
    <>
      <div className="info-pokemon-wrapper">
        <div className="info-pokemon-background"/>
        <div className="pokemon-name-wrapper">
          <h1 className="pokemon-name">
            {pokemon?.name?.toUpperCase()}
          </h1>
        </div>
        <div className="pokemon-sprite">
          <img
            src={pokemon?.sprites.versions?.['generation-iii']['firered-leafgreen'].front_default}
            alt={pokemon?.name}
            style={imageLoaded ? {display: "block"} : {display: "none"}}
            onLoad={() => setImageLoaded(true)}
          />
        </div>
        <div className="pokemon-data-wrapper">
          <div className="pokemon-id data-row">
            <span>{pokemon?.id}</span>
          </div>
          <div className="pokemon-nombre data-row">
            <span>{pokemon?.name.toUpperCase()}</span>
          </div>
          <div className="pokemon-tipo data-row">
            { pokemon?.types.map(type => {
              return(
                <img
                  src={`/images/tipos/${type.type.name}.webp`}
                  alt={type.type.name}
                  key={type.type.name}
                />
              )})
            }
          </div>
          <div className="pokemon-eo data-row">
            <span>Rojo</span>
          </div>
          <div className="pokemon-number-id data-row">
            <span>{nID}</span>
          </div>
          <div className="pokemon-objeto data-row">
            <span>NO TIENE</span>
          </div>
        </div>
        <div className="pokemon-notas">
          { pokemon?.stats.slice(0, 3).map(stat => {
            return(
              <div className={`pokemon-${stat.stat.name} pokemon-stats`} key={stat.stat.name}>
                {`${stat.stat.name.toUpperCase()}: ${stat.base_stat}`}
              </div>
            )})
          }
        </div>
      </div>
      <div className="transition-shadow" style={transition ? {opacity: "1", visibility: "visible"} : {}}/>
    </>
  )
}

export default PokeDatos