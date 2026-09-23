//Importamos el tipo Game para la estrucura
import { Game } from "../types/game";
//Hook de expo router para la navegación
import { useRouter } from "expo-router";
//Iconos para la interfaz
import { Ionicons } from "@expo/vector-icons";
//Componentes visuales de React Native
import { View, Text, Image, StyleSheet, Pressable } from "react-native";


export default function GameCard({game, onFavorite}: {game: Game; onFavorite:(id: number)=> void }) {
    // Obtenemos el router para poder navegar desde esta tarjeta hacia la pantalla de detalles.
    const router = useRouter()
    // Se ejecuta cuando el usuario presiona la parte principal de la tarjeta.
    function handleGamePress(){
        // game.id viene del objeto game recibido por props. Por ejemplo: /games/3498
        router.push(`/games/${game.id}`)
    }

    
    return(
        
            <View style={styles.card}>
                {/* Zona principal de la tarjeta. Al presionarla, abrimos los detalles del juego. */}
                <Pressable onPress={handleGamePress}>
                    <Image
                    style={styles.gameImage}
                    // background_image contiene la URL de la imagen proporcionada por RAWG.
                    source={{uri: game.background_image}}/>
                    {/* numberOfLines limita el nombre a una sola línea */}
                    <Text style={styles.title} numberOfLines={1}>{game.name}</Text>
                    {/* Mostramos la calificación del juego */}
                    <Text style={styles.rating}>⭐{ game.rating}</Text>
                </Pressable>

                {/* Contenedor inferior: fecha de lanzamiento + botón de favoritos */}
                <View style={styles.favContainer}>
                    <Text style={styles.release}>{game.released}</Text>
                    {/* Botón para favoritos */}
                    <Pressable onPress={()=>onFavorite(game.id)}>
                        <Ionicons 
                        name="heart-outline"
                        size={22}
                        color="#B8C7D9"/>
                    </Pressable>
                </View>
            </View>

            
)}

const styles = StyleSheet.create({
    gameImage: {
        width: "100%",
        height: 180,
        borderRadius: 8,
    },
    card: {
        width: 170,
        marginHorizontal: 8,
        marginVertical: 10,
        padding: 10,
        borderRadius: 12,
        backgroundColor: "#1E4976"
    },
    title: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "bold",
        marginTop: 10,
    },
    rating: {
        color: "#FFD700",
        fontSize: 14,
        marginTop: 6,
    },
    release: {
        color: "#AAAAAA",
        fontSize: 12,
    },
    favContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 4,
    },
})