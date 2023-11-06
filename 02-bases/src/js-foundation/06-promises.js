const getPokemonByIdPromise = (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${ id }`;

    return fetch(url)
        .then((response) => response.json())
        // .then(() => { throw new Error("Pokemon not found") })
        .then((pokemon) => pokemon.name)
        .catch((err) => console.log("Por favor intente de nuevo"))
        .finally(() => console.log("Finalmente"));
}

const getPokemonById = async(id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${ id }`;

    const resp = await fetch(url);
    const pokemon = await resp.json();

    return pokemon.name;
}

module.exports = getPokemonById;