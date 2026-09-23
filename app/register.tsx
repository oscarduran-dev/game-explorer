//Hook de React oara manejar estados locales
import { useState } from "react";
//Componentes visuales de React Native
import { View, Text, StyleSheet, Pressable, TextInput, Alert  } from "react-native";
//Cliente de supabase para registrar usuarios
import { supabase } from "../services/supabase";
//Hook para la navegación entre pantallas
import {  useRouter } from "expo-router";

export default function Register(){
    // Estado para almacenar el email del usuario.
    const [email, setEmail] = useState("")
    // Estado para almacenar la contraseña del usuario.
    const [password, setPassword] = useState("")
    // Estado para confirmar que ambas contraseñas coincidan.
    const [confirmPassword, setConfirmPassword] = useState("")
    //Indica si actualmente se está creando una cuenta
    const [loading, setLoading] = useState(false);
    // Estado para almacenar el nombre del usuario.
    const [name, setName] = useState("");
    // Obtenemos el router para navegar después del registro.
    const router = useRouter()

    //Se ejecuta cuando el usuario presiona "Crear Cuenta"
    async function handleRegister(){
        //Verifica que todos los campos se hayan llenado
        if (!name || !email || !password || !confirmPassword ){
            Alert.alert("Error", "Completa todos los campos")
            return;
        }
        //Comprobamos que las 2 contraseñas sean iguales
        if (password !== confirmPassword){
            Alert.alert("Error", "Las contraseñas no coinciden");
            return;
        }
        //Activamos el estado de carga mientras supabase procesa el registro
        setLoading(true);

        //Enviamos los datos a supabase Auth
        const result = await supabase.auth.signUp({
            email,
            password,
            //options permite enviar información adicional
            options: {
                data: {
                    name,
                }
            }

        })
        //Desactivamos el estado de carga al terminar la petición
        setLoading(false)
        //Si supabase devuelve un error, mostramos un mensaje y detenemos la ejecución
        if (result.error){
            Alert.alert("Error", "Ocurrio un error. Intente de nuevo")
            return;
        }
        //Si el registro fué exitoso, enviamos al usuario a Home, usamos replace para evitar que vuelva hacia atras
        router.replace("/home");
    }

    return(
        <View style={styles.container}>

        <Text style={styles.title}>Crear cuenta</Text>
        <Text style={styles.subtitle}>Únete a Game Explorer</Text>

            {/* Campo para introducir el nombre */}
            <TextInput
            style={styles.input}
            value={name}
            onChangeText={(text)=>setName(text)}
            placeholder="Escribe tu nombre..."
            placeholderTextColor={"#8FA8BD"}/>

            {/* Campo para introducir el email */}
            <TextInput 
            style={styles.input}
            value={email}
            // text contiene el nuevo valor escrito.
            onChangeText={(text)=>setEmail(text)} placeholder="Escribe tu email..."
            placeholderTextColor={"#8FA8BD"}
            // Evita mayúsculas automáticas en el correo.
            autoCapitalize="none"/>

            <Text style={styles.exampleText}>Ej. example@gmail.com</Text>

            {/* Campo para introducir la contraseña */}
            <TextInput
            style={styles.input}
            value={password}
            onChangeText={(text)=>setPassword(text)}
            placeholder="Ingresa una contraseña"
            placeholderTextColor={"#8FA8BD"}
            // Oculta los caracteres introducidos.
            secureTextEntry/>

            {/* Campo para confirmar la contraseña */}
            <TextInput
            style={styles.input}
            value={confirmPassword}
            onChangeText={(text)=>setConfirmPassword(text)}
            placeholder="Confirmar contraseña"
            placeholderTextColor={"#8FA8BD"}
            // También ocultamos los caracteres.
            secureTextEntry/>

            {/* Botón para crear la cuenta */}
            <Pressable 
            onPress={handleRegister} 
            // Evita presionar nuevamente mientras se está procesando el registro.
            disabled={loading}
            style={styles.registerButton}> 
                <Text style={styles.registerButtonText}>
                    {/* Cambiamos el texto mientras se procesa */}
                    {loading ?   "Creando cuenta" : "Crear cuenta"}
                </Text>
                </Pressable>

            {/* Enlace para regresar al Login */}
            <View style={styles.loginContainer}>
                <Text style={styles.loginText}>¿Ya tienes cuenta?</Text>

                <Pressable onPress={()=>router.back()}>
                    <Text style={styles.loginLink}>Iniciar sesión</Text>
                </Pressable>
                </View>
            </View>
    )
}

const styles = StyleSheet.create({
    exampleText: {
        width: "90%",
        color: "#8FA8BD",
        fontSize: 12,
        marginTop: -4,
        marginBottom: 4,
        paddingLeft: 4,
},
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
        marginBottom: 6,
    },
    subtitle: {
        color: "#B8C7D9",
        fontSize: 16,
        marginBottom: 25,
    },
    registerButton: {
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
    registerButtonText: {
        color: "#FFFFFF",
        fontSize: 17,
        fontWeight: "700",
    },
    loginContainer: {
        flexDirection: "row",
        marginTop: 25,
        alignItems: "center",
        gap: 5,
    },
    loginText: {
        color: "#B8C7D9",
        fontSize: 14,
    },
    loginLink: {
        color: "#3FA7D6",
        fontSize: 14,
        fontWeight: "700"
    }
})
    