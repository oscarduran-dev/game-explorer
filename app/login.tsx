//Hook de React para manejar estados
import { useState } from "react";
//Componentes visuales de React Native
import { View, Text, StyleSheet, Pressable, TextInput, Alert  } from "react-native";
//Cliente de supabase para realizar la autenticación
import { supabase } from "../services/supabase";
//Hook para realizar la navegación entre pantallas
import {  useRouter } from "expo-router";


export default function Login(){
    //Estado para almacenar el correo escrito por el usuario
    const [email, setEmail] = useState("")
    //Estado para almacenar la contraseña
    const [password, setPassword] = useState("")
    //Indica si actualmente se está realizando un inicio de sesión
    const [loading, setLoading] = useState(false);
    //Creamos el router para la navegación
    const router = useRouter()

    //Se ejecuta cuand el usuario presiona el botón de Iniciar Sesión
    async function handleLogin(){
        //Muestra un error si no se llenan todos los campos
        if (!email || !password ){
            Alert.alert("Error", "Completa todos los campos")
            return;
        }
        //Activamos el estado de carga mientras se realiza la petición
        setLoading(true);
        //Enviamos las credenciales a supabase
        //SignInWithPassword comprueba si el usuario puede iniciar sesión con ese correo y contraseña
        const result = await supabase.auth.signInWithPassword({
            email,
            password,
        })
        //Desactivamos el estado de carga al terminar la petición
        setLoading(false)
        
        //Si supabase devuelve un error, mostramos un mensaje y detenemos la ejecución
        if (result.error){
            Alert.alert("Error", "Usuario o contraseña incorrectos")
            return;
        }
        //Si el Login fué exitoso, navegamos a Home con replace, para evitar volver a la pantalla anterior
        router.replace("/home");
    }
    return(
        <View style={styles.container}>
            <Text style={styles.title}>Game Explorer</Text>
            <Text style={styles.subtitle}>Bienvenido de nuevo</Text>
            <Text style={styles.description}>Inicia sesión para continuar</Text>

            {/* Campo para introducir el correo */}
            <TextInput 
            style={styles.input}
            //Representa el valor actual del estado de email
            value={email}
            //Text contiene el nuevo texto escrito por el usuario
            onChangeText={(text)=>setEmail(text)} 
            placeholder="Escribe tu email..."
            placeholderTextColor={"#8FA8BD"}/>

            {/* Campo para introducir la contraseña */}
            <TextInput
            style={styles.input}
            //Representa el valor actual del estado de password
            value={password}
            //Text contine el nuevo texto escrito por el usuario
            onChangeText={(text)=>setPassword(text)}
            placeholder="Ingresa tu contraseña"
            placeholderTextColor={"#8FA8BD"}
            //Oculta los caracteres de la contraseña
            secureTextEntry/>

            {/* Botón para iniciar sesión */}
            <Pressable 
            onPress={handleLogin} 
            //Mientras loading sea true, el botón queda deshabilitado
            disabled={loading}
            style={styles.loginButton}> 
                <Text style={styles.loginButtonText}>
                    {/* Cambiamos el texto mientras se procesa el login*/}
                    {loading ?   "Iniciando sesión" : "Iniciar sesión"}
                </Text>
            </Pressable>

            {/* Enlace para ir al registro */}
            <View style={styles.registerContainer}>
                <Text style={styles.registerText}>¿No tienes una cuenta?</Text>
                <Pressable onPress={()=>router.push("/register")}> 
                    <Text style={styles.registerLink}>Registrarse</Text>
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 22,
        backgroundColor: "#13293D"
    },
    title: {
        color: "#EAF4FF",
        fontSize: 30,
        fontWeight: "800",
        marginBottom: 5,
    },
    subtitle: {
        color: "#EAF4FF",
        fontSize: 20,
        fontWeight: "600",
        marginBottom: 50,
    },
    description: {
        color: "#B8C7D9",
        fontSize: 14,
        marginBottom: 10,
    },
    loginButton: {
        width: "90%",
        height: 48,
        borderRadius: 12,
        marginTop: 18,
        backgroundColor: '#3FA7D6',
        justifyContent: "center",
        alignItems: "center",
    },
    input: {
        width: "90%",
        height: 50,
        borderWidth: 1,
        borderColor: "#3A6B8C",
        borderRadius: 12,
        marginVertical: 8,
        paddingHorizontal: 15,
        backgroundColor: "#1A3852",
        color: "#FFFFFF",
        fontSize: 16,
    },
    registerContainer: {
        flexDirection: "row",
        marginTop: 25,
        alignItems: "center",
        gap: 5,
    },
    loginButtonText: {
        color: "#FFFFFF",
        fontSize: 17,
        fontWeight: "700",
    },
    registerText: {
        color: "#B8C7D9",
        fontSize: 14,
    },
    registerLink: {
        color: "#3FA7D6",
        fontSize: 14,
        fontWeight: "700"
    },
})