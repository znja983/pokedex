import React, {useState, useEffect}  from "react";
import { useLocation, useNavigate } from "react-router-dom";

function PokemonDetail() {
    const location = useLocation();
    const navigate = useNavigate();
    const [pokemonData, setPokemonData] = useState (null);
    const [loading, setLoading] = useState (true);
    
    const {name, url} = location.state || {};
    useEffect(() =>{
        if (url) {
            const fetchPokemonDetails = async () => {
                try {
                    const response = await fetch (url);
                    const data = await response.json();
                    setPokemonData(data);
                } catch (error) {
                    console.error("Error fetching Pokémon details", error);
                } finally {
                    setLoading(false);
                }
            };
            fetchPokemonDetails();
        }
    }, [url]);

    if (!name) {
        return <div> No se encontró el Pokémon</div>;
    }
    if (loading) return <div>Cargando detalles de {name}...</div>;

     return(
        <div style={{padding: "20px", textAlign:"center"}}>
            <button
            onClick={() => navigate("/")}
                style={{marginBottom: "20px", padding: "10px 20px"}}
                >
                Volver
                </button>
                <h1 style ={{textTransform:"capitalize"}}>{name}</h1>
                {pokemonData && (
                    <div>
                        <img
                        src={pokemonData.sprites.front_default}
                        alt={name}
                        style={{width:"200px"}}
                    />
                <div>
                    <h3> Estadisticas:</h3>
                    <ul style={{listStyle: "none", padding: 0}}>
                        {pokemonData.stats.map((stat, index) => (
                            <li key={index}>
                                {stat.stat.name}: {stat.base_stat}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
                )}
        </div>
            );
        }
            export default PokemonDetail;
