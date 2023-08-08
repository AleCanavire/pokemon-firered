import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetOnePokemon } from '../../hooks/useFetch';

function PokeDatos() {
  const { nombre } = useParams();
  const { pokemon } = useGetOnePokemon(nombre);
  const navigate = useNavigate();

  useEffect(() => {
    const pressKey = (e: KeyboardEvent) => {
      if (e.key === "e") {
        navigate("/");
      }
    }
    document.addEventListener("keydown", pressKey);
    return () => document.removeEventListener("keydown", pressKey);
  }, [])
  

  return (
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
                src={`/images/tipos/${type.type.name}.png`}
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
          <span>{Math.floor(Math.random() * (99999 - 10000) + 10000)}</span>
        </div>
        <div className="pokemon-objeto data-row">
          <span>NO TIENE</span>
        </div>
      </div>
      <div className="pokemon-notas">
        { pokemon?.stats.slice(0, 3).map(stat => {
          return(
            <div className={`pokemon-${stat.stat.name} pokemon-stats`}>
              {`${stat.stat.name.toUpperCase()}: ${stat.base_stat}`}
            </div>
          )})
        }
      </div>
    </div>
  )
}

export default PokeDatos