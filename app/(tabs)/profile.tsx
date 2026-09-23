//Componentes visuales de React Native
import { View, Text, StyleSheet, Pressable  } from "react-native";
//Hook para obtener la session y la función para cerrar sesión
import { useAuth } from "../../hooks/useAuth";
//Iconos para la interfaz
import { Ionicons } from "@expo/vector-icons";

export default function Profile(){
    //Obtenemos la session actual y la función para cerrar sesión
    const {session, logout} = useAuth()
    //Obtenemos información del usuario desde la session
    //?. evita un error si aún no existe una session
    const name = session?.user.user_metadata.name;
    const email = session?.user.email;
    const createdAt = session?.user.created_at;

    return(
        <View style={styles.container}>
            <Text style={styles.title}>Perfil</Text>
                {/* Información principal del usuario */}
                <View style={styles.profileHeader}>
                    {/* Avatar utilizando un icono */}
                    <View style={styles.avatar}>
                        <Ionicons name="person-outline" size={35} color="#FFFFFF"/>
                    </View>
                {/* Nombre y correo del usuario */}
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.email}>{email}</Text>
            </View>
            <Text style={styles.sectionTitle}>
                Información de la cuenta
            </Text>

            <View style={styles.infoSection}>

                <View style={styles.infoRow}>
                    {/* Nombre */}
                    <Text style={styles.infoLabel}>Nombre</Text>
                    <Text style={styles.infoValue}>{name}</Text>
                </View>

                <View style={styles.infoRow}>
                    {/* Correo electrónico */}
                    <Text style={styles.infoLabel}>Correo electrónico</Text>
                    <Text style={styles.infoValue}>{email}</Text>
                </View>

                <View style={styles.infoRow}>
                    {/* Fecha en la que se creó la cuenta */}
                    <Text style={styles.infoLabel}>Fecha de creación</Text>
                    <Text style={styles.infoValue}>{createdAt}</Text>
                </View>
    </View>


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
        paddingTop: 50,
    },
    title: {
        color: "#EAF4FF",
        fontSize: 28,
        fontWeight: "800",
        alignSelf: "center",
        marginTop: 30,
    },
    profileHeader: {
        alignItems: "center",
        marginBottom: 35,
    },  
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: "#3FA7D6",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 15,
    },
    name: {
        color: "#FFFFFF",
        fontSize: 22,
        fontWeight: "700",
    },
    email: {
        color: "#B8C7D9",
        fontSize: 14,
        marginTop: 5,
    },
    sectionTitle: {
        color: "#EAF4FF",
        fontSize: 18,
        fontWeight: "700",
        marginBottom: 12,
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
    infoSection: {
    backgroundColor: "#1E4976",
    borderRadius: 14,
    paddingHorizontal: 16,
    },
    infoRow: {
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderBottomColor: "#3A6B8C",
    },
    infoLabel: {
        color: "#8FA8BD",
        fontSize: 13,
        marginBottom: 5,
    },
    infoValue: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "600",
    },
})

