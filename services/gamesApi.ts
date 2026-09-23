//Importamos el tipo Game para indicar la estructura
import { Game } from "../types/game";

//Función encargada de obtener lalista de juegos desde la API de RAWG
//Los parámetros son opcionales porque se puede usar esta función para diferentes consultas
export async function getGames(search?: string, genre?: number): Promise<Game[]>{
    //Obtenemos la Api Key desde las variables de entorno
    const apiKey = process.env.EXPO_PUBLIC_GAME_API_KEY
    //Se construye la url base
    let url = `https://api.rawg.io/api/games?key=${apiKey}`;

    //Si se recibe un término de bísqueda, lo añadimos como parámetro a la url
    if(search){
        url += `&search=${search}`;
    }

    //Si recibimos un género, lo añadimos como parámetro a la url
    if (genre) {
        url += `&genres=${genre}`
    }

    //Usamos fetch() para hacer la petición a la API
    const result = await fetch(url)
    //Convertimos la respuesta de la API de JSON a objeto JavaScript
    const data = await result.json()

    //Retornamos la lista
    return data.results;
    }

    //Función encargada de obtener un juego en específico
export async function getGameById(id: string): Promise<Game> {
    //Obtenemos la API key desde las variables de entorno
    const apiKey = process.env.EXPO_PUBLIC_GAME_API_KEY;
    //Construímos la url usando el ID del juego
    const url = `https://api.rawg.io/api/games/${id}?key=${apiKey}`;

    //Hacemos la petición a la API
    const result = await fetch(url);
    //Convertimos la  respuesta JSON en objeto JavaScript
    const data = await result.json();
    //Retornamos la información completa del juego
    return data;
}
    
    
    
