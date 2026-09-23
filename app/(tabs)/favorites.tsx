//Componentes visuales de React Native
import { View, Text, FlatList, ActivityIndicator, StyleSheet  } from "react-native";
//Hooks de React
import { useState,  useCallback} from "react";
//Tipo que define la estructura de un juego
import { Game } from "../../types/game";
//Componente reutilizable para mostrar cada juego
import  GameCard  from "../../components/GameCard";
//Hook para obtener la sesasion del usuario
import { useAuth } from "../../hooks/useAuth";
//Cliente de supabase para consultar la tabla de favoritos
import { supabase } from "../../services/supabase";
//Función que obtiene los datos de un juego desde RAWG
import { getGameById } from "../../services/gamesApi";
//Ejecuta una función cada vez que la pantalla vuelve a estar enfocada
import { useFocusEffect } from "expo-router";


export default function Favorites(){
    //Guarda los juegos favoritos mostrados en la pantalla
    const [favorites, setFavorites] = useState<Game[]>([]);
    //Controla el indicador de carga
    const [loading, setLoading] = useState(true)
    //Guarda un mensaje si hay un error al cargar los favoritos
    const [error, setError] = useState(true)
    //Obtiene la session del usuario
    const {session} = useAuth()
    //Obtenemos el id del usuario. El ?. evita un error si todavía no hay una session
    const id = session?.user.id

    //Carga los favoritos del usuario desde supabase
    const loadFavorites = useCallback(async () => {
    try {
        setLoading(true);
        setError(false);
        //Consultamos la tabla "favorites"
        //Solo necesitamos el game_id de cada juego favorito
        const { data, error } = await supabase
            .from("favorites")
            .select("game_id")
            .eq("user_id", id);

        //Si supabase devuelve error, mostramos el estado y detenemos la función
        if (error) {
            setError(true);
            return;
        }
        //Recorremos los favoritos obtenidos.
        // por cada game_id hacemos una petición a RAWG para obtener la información completa del juego
        const games = data.map((item) => {
            return getGameById(item.game_id);
        });

        //Esperamos a que terminen las peticiones antes de guardar los juegos
        const gamesResult = await Promise.all(games);
        //Eliminamos posibles resultados que no tengan id 
        const validGames = gamesResult.filter(
            (game) => game.id !== undefined
        );
        //Guardamos los juegos válidos en el estado
        setFavorites(validGames);

    } finally {
        //Dejamos de mostrar el indicador de carga cuando termine la operación.
        setLoading(false);
    }
}, [id]);

    //Funcion que elimina el juego de la tabla de favoritos
    async function removeFavorite(gameId: number) {
        const {error} = await supabase
        .from("favorites")
        .delete()
        .eq("user_id", id)
        .eq("game_id", gameId)

        //Si ocurre un error, mostramos la información en consola y detenemos la función
        if (error) {
            console.log(error);
            return;
        }
        //Actualizamos la lista que vemos en pantalla, filter crea una nueva lista sin el juego eliminado
        setFavorites((prev) => 
        prev.filter((game)=> game.id !== gameId));
    }
   
    //Ejecuta loadFavorites() cuando la pantalla vuelve a estar enfocada
    //useCallback evita que se cree una nueva función en cada renderizado
    useFocusEffect(
        useCallback(()=>{
        //Si no existe una session, detenemos la función
        if (!session){
            return;
        }
            loadFavorites();
            }, [session, loadFavorites])
        );
        

    return(
        <View style={styles.container}>

            <Text style={styles.title}>
                Favoritos
            </Text>

           <FlatList
           // key permite mantener la lista en dos columnas
            key="favorites-2-columns"
            // Los elementos que se mostrarán
            data={favorites}
            // Cada favorito se muestra utilizando GameCard
            renderItem={({ item }) => (
                // Cuando se pulsa el corazón, se ejecuta removeFavorite con el id del juego.
                <GameCard game={item} onFavorite={removeFavorite}/>
            )}
            // React Native utiliza este valor para identificar cada elemento de forma única
            keyExtractor={(item) => item.id.toString()}
            //Mostramos 2 juegos por fila
            numColumns={2}
            ListEmptyComponent={
                loading ? (
                    //Mientras se cargan los favoritos
                <ActivityIndicator size="large" color="#3FA7D6" />
                ): error ? (
                    //Si ocurrió un error
                    <Text style={styles.message}>Ocurrió un error al cargar tus favoritos.</Text>
                ): (
                    //Si terminó de cargar y no existen favoritos
                    <Text style={styles.message}>No tienes juegos favoritos todavía.</Text>
                )
            }
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#13293D",
    },
    title: {
        color: "#EAF4FF",
        fontSize: 20,
        fontWeight: "bold",
        marginLeft: 14,
        marginTop: 22,
        marginBottom: 10,
        borderLeftWidth: 4,
        letterSpacing: 0.5,
        borderLeftColor: "#3FA7D6",
        paddingLeft: 10
    },
    message: {
        color: "#B8C7D9",
        fontSize: 16,
        textAlign: "center",
        marginTop: 40,
    }
})