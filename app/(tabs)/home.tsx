//Componentes visuales de React
import { Pressable, Text, View, StyleSheet } from "react-native";
//Hook personalizado que nos proporciona la session
import { useAuth } from "../../hooks/useAuth";
//Permiten ocntrolar la navegación
import { Redirect, useRouter } from "expo-router";
//Iconos utilizados para la interfaz
import { Ionicons } from "@expo/vector-icons";


export default function Home(){
    //Obtenemos la session del usuario, el estado de carga y la función para cerrar sesión
    const {session, loading, logout} = useAuth();
    //Mientras se comprueba si existe session, no mostramos nada
    if (loading){
        return null;
    }
    //Si no existe una session activa, enviamos al usuario al Login
    if (!session){
        return <Redirect href="/login"/>
    }
    //Obtenemos el nombre del usuario que guardamos en los metadatos
    //Si no existe, mostramos "usuario" por defecto
    const name = session.user.user_metadata.name || "usuario";
    //Creamos el router para nuestra navegación
    const router = useRouter()
    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Game Explorer</Text>
                <Text style={styles.welcome}>Bienvenido, {name}</Text>
                
            </View>

            {/* Botón para ir a la sección de Juegos */}
            <Pressable style={styles.card} onPress={()=>router.navigate("/games")}>
                <View style={styles.iconContainer}>
                    <Ionicons name="game-controller-outline" size={24} color="#FFFFFF"/>
                </View>
                <View>
                    <Text style={styles.cardTitle}>Explorar Juegos</Text>
                    <Text style={styles.cardDescription}>Descubre nuevos juegos</Text>
                </View>
            </Pressable>

            {/* Botón para ir a la sección de Favoritos */}
            <Pressable style={styles.card} onPress={()=>router.navigate("/favorites")}>
                <View style={styles.iconContainer}>
                    <Ionicons name="heart-outline" size={24} color="#FFFFFF"/>
                </View>
                <View>
                    <Text style={styles.cardTitle}>Mis favoritos</Text>
                    <Text style={styles.cardDescription}>Tus juegos guardados</Text>
                </View>
            </Pressable>
            <Text style={styles.navigationText}>También puedes explorar la app usando los iconos de la barra inferior.</Text>

            {/* Botón para cerrar la sesión */}
            <Pressable style={styles.logoutButton} onPress={logout}>
                <Ionicons name="log-out-outline" size={20} color="#B8C7D9"/>
                <Text style={styles.logoutText}>Cerrar sesión</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#13293D",
        paddingHorizontal: 20,
        paddingTop: 60,
    },
    header: {
        marginBottom: 35,
    },
    title: {
        color: "#EAF4FF",
        fontSize: 28,
        fontWeight: "800",
        alignSelf: "center",
    },
    welcome: {
        color: "#FFFFFF",
        fontSize: 18,
        fontWeight: "600",
        alignSelf: "center",
        marginTop: 12,
    },
    card: {
        backgroundColor: "#1E4976",
        borderRadius: 16,
        padding: 18,
        marginBottom: 15,
        flexDirection: "row",
        alignItems: "center",
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 12,
        backgroundColor: "#3FA7D6",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 15,
    },
    cardTitle: {
        color: "#FFFFFF",
        fontSize: 17,
        fontWeight: "700",
    },

    cardDescription: {
        color: "#B8C7D9",
        fontSize: 13,
        marginTop: 4,
    },
    logoutButton: {
        marginTop: 30,
        height: 46,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#3A6B8C",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
    },
    logoutText: {
        color: "#B8C7D9",
        fontSize: 15,
        fontWeight: "600",
        marginLeft: 8,
    },   
    navigationText: {
        color: "#8FA8BD",
        fontSize: 12,
        textAlign: "center",
        marginTop: 20,
        lineHeight: 18,
        paddingHorizontal: 20,
    } 
})