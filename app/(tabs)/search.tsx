//Componentes visuales de React Native
import { View, Text, StyleSheet, Pressable, TextInput, Alert, FlatList  } from "react-native";
//Hook de React para manejar estados
import { useState } from "react";
//Función para obtener los juegos desde la API
import { getGames } from "../../services/gamesApi";
//Tipo que define la estructura de un juego
import { Game } from "../../types/game";
//Componente reutilizable para mostrar cada juego
import GameCard from "../../components/GameCard";
//Iconos para la interfaz
import { Ionicons } from "@expo/vector-icons";
//Hook personalizado para obtener la session del usuario
import { useAuth } from "../../hooks/useAuth";
//Función para guardar un juego en favoritos
import handleOnFavorite from "../../services/favorites";

export default function Search(){
    //Estado para el texto que escribe el usuario en el buscador 
    const [search, setSearch] = useState("");
    //Lista de juegos obtenidos como resultado de la búsqueda
    const [games, setGames] = useState<Game[]>([]);
    //Indica si actualmente se está realizando una búsqueda
    const [loading, setLoading] = useState(false);
    //Obtenemos la session actual del usuario
    const {session} = useAuth();

    //Se ejecuta cuando el usuario presiona el botón de "Buscar"
    async function handleSearch(){
        if(search.trim()=== ""){
            Alert.alert("Error", "Introduce una busqueda válida")
            return;
        }
        try{
        //Se activa el estado de carga antes de consultar la API
        setLoading(true);
        //Realizamos la petición a la API de RAWG
        const data = await getGames(search.trim())
        //Guardamos los resultados en el estado
        setGames(data)
        }catch(error){
            //Si la petición falla, mostramos un mensaje al usuario
            Alert.alert("Error", "Error al cargar los datos")
        }finally{
            //Dejamos de mostrar el estado de carga al terminar la petición
            setLoading(false)
        }
    }
    
    return(
    <View style={styles.container}>

        <Text style={styles.title}>
            Buscar juegos
        </Text>

        <Text style={styles.subtitle}>
            Encuentra tu próximo juego
        </Text>

        {/* Contenedor del icono y campo de búsqueda */}
        <View style={styles.searchContainer}>
            <Ionicons
                name="search-outline"
                size={20}
                color="#8FA8BD"
            />

            <TextInput
                style={styles.input}
                value={search}
                //Text contiene el valor escrito por el usuario en el TextInput
                onChangeText={(text) => setSearch(text)}
                placeholder="Buscar..."
                placeholderTextColor="#8FA8BD"
            />

        </View>

        {/* Ejecuta handleSearch al presionarse */}
        <Pressable 
            style={styles.searchButton}
            onPress={handleSearch}
            disabled={loading}
        >
            <Text style={styles.searchButtonText}>
                {loading ? "Buscando" : "Buscar"}
            </Text>
        </Pressable>

        {/* Solo mostramos el título cuando existen resultados */}
        {games.length > 0 && (
            <Text style={styles.resultsTitle}>
                Resultados
            </Text>
        )}

        {/* Muestra los juegos obtenidos de la búsqueda */}
        <FlatList
            data={games}
            renderItem={({item}) => (
                <GameCard
                    game={item}
                    // gameId es el id del juego seleccionado. Si existe sesión, lo guardamos en favoritos.
                    onFavorite={(gameId)=>{
                        if (session){
                            handleOnFavorite(session.user.id, gameId)
                        }
                    }}
                />
            )}
            // React utiliza esta clave para identificar de forma única cada elemento de la lista.
            keyExtractor={(item) => item.id.toString()}
            //Mostramos 2 tarjetas por fila
            numColumns={2}
        />

    </View>
)
}
const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#13293D",
        paddingTop: 40,
    },

    title: {
        color: "#EAF4FF",
        fontSize: 28,
        fontWeight: "800",
        marginLeft: 20,
    },

    subtitle: {
        color: "#B8C7D9",
        fontSize: 14,
        marginTop: 6,
        marginLeft: 20,
        marginBottom: 20,
    },

    searchContainer: {
        width: "90%",
        height: 50,
        alignSelf: "center",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: "#3A6B8C",
        borderRadius: 12,
        backgroundColor: "#1A3852",
    },

    input: {
        flex: 1,
        height: "100%",
        marginLeft: 10,
        color: "#FFFFFF",
        fontSize: 16,
    },

    searchButton: {
        width: "90%",
        height: 46,
        borderRadius: 12,
        alignSelf: "center",
        marginTop: 12,
        backgroundColor: "#3FA7D6",
        justifyContent: "center",
        alignItems: "center",
    },

    searchButtonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "700",
    },

    resultsTitle: {
        color: "#EAF4FF",
        fontSize: 20,
        fontWeight: "700",
        marginLeft: 20,
        marginTop: 25,
        marginBottom: 5,
    },

})