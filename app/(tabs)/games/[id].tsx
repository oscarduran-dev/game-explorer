//Obtiene el parámetro ID de la URL y permite regresar a la pantalla anterior
import { useLocalSearchParams, useRouter } from "expo-router";
//Componentes visuales de react native
import { Text, View, ActivityIndicator, Image, ScrollView, StyleSheet, Pressable } from "react-native";
//Hooks de React
import { useState, useEffect } from "react";
//Obtiene la función para consultar la API de RAWG con id
import { getGameById } from "../../../services/gamesApi";
//Importamos el tipo que define la estructura de un juego
import { Game } from "../../../types/game";
//Iconos de expo
import { Ionicons } from "@expo/vector-icons";

export default function Details(){
    //Guarda la información del juego que obtenemos de la API
    //Comienza como null porque aún no hemos cargado ningún juego
    const [game, setGame] = useState<Game | null>(null);
    //Obtiene el "id" que viene en la ruta
    const {id} = useLocalSearchParams()
    //Eliminamos las etiquetas HTML de la descrición del juego
    const cleanDescription = game?.description.replace(/<br\s*\/?>/gi, "\n").replace(/<[^>]*>/g, "")
    //Creamos nuestro router para realizar la navegación
    const router = useRouter();
    

    //Se ejecuta cuando cambia el ID del juego, su función es obtener los datos del juego desde la API
    useEffect(()=>{
        async function loadGame(){    
            //Consulta RAWG utilizando el id recibido en la ruta
            const data = await getGameById(id as string)
            //Guarda los datos obtenidos en el estado
            setGame(data)
        }
        loadGame();
            }, [id]);
        
    return (
    <ScrollView style={styles.container}>
        {game ? (
            <View style={styles.content}>

                {/*Botón para regresar a la pantalla anterior */}
                <Pressable
                    style={styles.backButton}
                    onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
                </Pressable>

                {/*Imagen principal del juego */}
                <Image
                    source={{ uri: game.background_image }}
                    style={styles.gameImage}
                />
                {/*Información principal */}
                <Text style={styles.title}>{game.name}</Text>
                <Text style={styles.rating}>{game.rating}</Text>
                <Text style={styles.release}>{game.released}</Text>
                {/*Descripción sin etiquetas HTML */}
                <Text style={styles.description}>{cleanDescription}</Text>
                {/*Recorremos los generos del juego */}
                <View style={styles.genresContainer}>
                    {game.genres.map((genre) => (
                        <View key={genre.id} style={styles.genre}>
                            <Text style={styles.genreText}>{genre.name}</Text>
                        </View>
                    ))}
                </View>
                {/*Recorremos las plataformas del juego */}
                <View style={styles.platformsContainer}>
                    {game.platforms.map((platform) => (
                        <View key={platform.platform.id} style={styles.platform}>
                            <Text style={styles.platformText}>{platform.platform.name}</Text>
                        </View>
                    ))}
                </View>

            </View>
        ) : (
            <ActivityIndicator
                size="large"
                color="#3FA7D6"
            />
        )}
    </ScrollView>
);
    
}

const styles = StyleSheet.create({
    gameImage: {
        width: "100%",
        height: 250,
        borderRadius: 14,
    },
    container: {
        flex: 1, 
        backgroundColor: "#13293d"
    },
    content: {
        padding: 16
    },
    title: {
        color: "#FFFFFF",
        fontSize: 28,
        fontWeight: "bold",
        marginTop: 16,
    },
    rating: {
        color: "#FFD700",
        fontSize: 18,
        marginTop: 8,
    },

    release: {
        color: "#B8C7D9",
        fontSize: 14,
        marginTop: 6,
    },
    description: {
        color: "#B8C7D9",
        fontSize: 15,
        lineHeight: 22,
        marginTop: 16,
    },
    backButton: {
        width: 42,
        height: 42,
        borderRadius: 21,
        backgroundColor: "#1E4976",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 12,
},
    platformsContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 8,
        marginTop: 20,
    },

    platform: {
        backgroundColor: "#1E4976",
        paddingHorizontal: 12,
        paddingVertical: 7,
        borderRadius: 20,
    },

    platformText: {
        color: "#EAF4FF",
        fontSize: 13,
        fontWeight: "600",
    },
    genresContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 6,
        marginTop: 12,
    },

    genre: {
        backgroundColor: "#294F70",
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: "#3A6B8C"
    },

    genreText: {
        color: "#B8C7D9",
        fontSize: 12,
        fontWeight: "500",
},
})