import React,{useState, useEffect} from "react";
import { useNavigate }  from "react-router-dom";

function Tableta(){
    const [pokemons, setPokemons]= useState([]);
    const [loading, setLoading]= useState(true);
    const [error, setError]= useState(null);
    const navigate = useNavigate();

    useEffect(()=>{
        const fetchPokemons = async()=>{
            try{
                const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=100");
                if(!response.ok) throw new Error("Error al cargar los pokémon");

                const data = await response.json();
                setPokemons(data.results);
                } catch(err) {
                    setError(err.message);
                } finally {
                    setLoading(false);
                }
            };

            fetchPokemons();
        }, []);

        const handleViewPokemon = (pokemonName, pokemonUrl) => {
            navigate(`/pokemon/${pokemonName}`, {
                state:{
                    name:pokemonName,
                    url:pokemonUrl,
                },
            });
        };
        if(loading) return <div>Cargando Pokemón...</div>;
        if(error) return <div>Error: {error}</div>;

        return(
            <div style={{padding:"20px"}}>
                <h1>Lista de Pokemón ({pokemons.length})</h1>
                <ul style={{listStyleType:"none", padding:0}}>
                    {pokemons.map((pokemon, index)=>(
                        <li key={index} style={{
                            marginBottom:"10px 0",
                            padding:"10px",
                            border:"1px solid #ccc",
                            borderRadius:"5px",
                            display:"flex",
                            justifyContent:"space-between",
                            alignItems:"center",
                        }}>
                            <span style={{textTransform:"capitalize", fontSize:"18px"}}>
                                {pokemon.name}
                                </span>
                                <button
                                onClick={() => handleViewPokemon(pokemon.name, pokemon.url)}
                                style={{
                                    padding:"5px 15px",
                                    backgroundColor:"#007bff",
                                    color:"white",
                                    border:"none",
                                    borderRadius:"3px",
                                    cursor:"pointer",
                                }}
                                onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
                                onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
                                >
                                    Ver
                                </button>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
    export default Tableta;