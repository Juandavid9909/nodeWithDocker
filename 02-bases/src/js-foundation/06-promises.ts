import { httpClient } from "../plugins";

const getPokemonByIdPromise = (id: number | string): Promise<string> => {
    const url = `https://pokeapi.co/api/v2/pokemon/${ id }`;

    return fetch(url)
        .then((response) => response.json())
        // .then(() => { throw new Error("Pokemon not found") })
        .then((pokemon) => pokemon.name)
        .catch((err) => console.log("Por favor intente de nuevo"))
        .finally(() => console.log("Finalmente"));
}

export const getPokemonById = async(id: number | string): Promise<string> => {
    const url = `https://pokeapi.co/api/v2/pokemon/${ id }`;

    const pokemon = await httpClient.get(url);

    return pokemon.name;
}