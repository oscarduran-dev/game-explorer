//Redirect permite enviar al usuario automáticamente a otra ruta
import { Redirect } from 'expo-router';
//Hook que proporciona la session y el estado de autenticación
import { useAuth } from '../hooks/useAuth';


export default function Index() {
  //Obtenemos la session actual
  const {session, loading} = useAuth();

  //Mientras se comprueba la session no mostramos ninguna pantalla
  if (loading){
    return null;
  }

  //Si existe una session activa, enviamos al usuario a Home
  if (session){
    return <Redirect href="/home"/>
  }
  //Si no existe una session activa, enviamos al usuario a Login
  return <Redirect href="/login"/>

}