//Permite que React Native pueda trabajar correctamente con las funciiones de URL que utiliza supabase
import 'react-native-url-polyfill/auto';
// Instala un almacenamiento compatible con React Native para que Supabase pueda guardar información localmente.
import 'expo-sqlite/localStorage/install';
// Importamos la función que crea nuestro cliente de Supabase.
import { createClient } from '@supabase/supabase-js';

// Obtenemos la URL de nuestro proyecto de Supabase desde las variables de entorno.
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
// Obtenemos la clave pública de Supabase desde las variables de entorno.
const supabasePublishableKey = process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;

//Creamos nuestro cliente de supabase
//A partir de este objeto podemos acceder a: Autenticación, bases de datos, sesiones, etc.
export const supabase = createClient(
    supabaseUrl, supabasePublishableKey, {
        auth: {
        //Indicamos donde se almacenará la session del usuario en el dispositivo
        storage: localStorage,
        // Renueva automáticamente el token cuando sea necesario.
        autoRefreshToken: true,
        // Mantiene la sesión guardada para que el usuario no tenga que iniciar sesión cada vez que abre la aplicación
        persistSession: true,
        // No necesitamos detectar sesiones mediante una URL, ya que estamos trabajando con una aplicación móvil.
        detectSessionInUrl: false,
    }}
    
);