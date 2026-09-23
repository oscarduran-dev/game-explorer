//cliente de supabase para acceder a la base de datos
import { supabase } from "./supabase";

//Función para guardar un juego en favoritos
async function handleOnFavorite(
    //ID del usuario que está guardando el juego
    userId: string,
    //ID del juego que se quiere guardar
    gameId: number
) {
    //Realizamos un insert en la tabla "favorites". "user_id" y "game_id" corresponden a las columnas de nuestra tabla
    const { error } = await supabase
        .from("favorites")
        .insert({
            user_id: userId,
            game_id: gameId,
        });

    //Si supabase devuelve un error, lo mostramos en consola y detenemos la ejecución
    if (error) {
        console.log(error);
        return;
    }

    //Si no hubo error, confirmamos que fue agregado correctamente
    console.log("Juego agregado a favoritos");
}

export default handleOnFavorite;