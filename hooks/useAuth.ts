// Hook de React para manejar estado y efectos secundarios.
import { useEffect, useState } from "react";
//Obtenemos la session actual 
import { Session } from "@supabase/supabase-js";
// Cliente de Supabase para acceder a la autenticación.
import { supabase } from "../services/supabase";

export function useAuth() {
  //Guarda la session actual del usuario. Si no existe una session será null
  const [session, setSession] = useState<Session | null>(null);
  //Indica si todavía estamos comprobando si existe una session
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  //Al iniciar la app, obtenemos la session que supabase haya guardado previamente
    async function checkSession() {
      const { data } = await supabase.auth.getSession();
      // Guardamos la sesión encontrada en nuestro estado.
      setSession(data.session);
      //Terminamos el estado de carga
      setLoading(false);
    }

    // Ejecutamos la comprobación inicial de la sesión.
    checkSession();

    //Escuchamos cambios en el estado de autenticacion
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        //Cada vez que cambia la sesión, actualizamos nuestra session
        setSession(session);
      }
    );

    //Función de limpieza del useEffect. Cuanod el componente deja de utilizar el Hook cancelamos la suscripción para evitar listeners innecesarios
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  //Función para cerrar la sesión del usuario
  async function logout() {
    await supabase.auth.signOut();
  }

  //El hook devuelve estos valores para que cualquier componente pueda utilizarlos
  return {
    session,
    loading,
    logout,
  };
}