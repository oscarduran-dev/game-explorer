// Componente Tabs de Expo Router para crear la navegación inferior
import { Tabs } from "expo-router";
//Iconos de la aplicación
import { Ionicons} from "@expo/vector-icons"

export default function TabsLayout(){
    return( 
        //Tabs crea la barra de navegación inferior. 
        //Cada Tabs.Screen representa una pantalla/ruta de la carpeta (tabs).
            <Tabs
            /* screenOptions={{
            tabBarActiveTintColor: "blue",
            tabBarInactiveTintColor: "gray",
            }} */
                screenOptions={{
                    //Ocultamos el header superior de las pantallas
                    headerShown: false
                }}
            >
                {/*Pantalla de Inicio*/}
                <Tabs.Screen name="home"
                options={{
                    title: "Inicio",
                    tabBarIcon: ({color, size}) => (
                        <Ionicons name="home" size={size} color={color}/>
                    )      
                }}/>
                {/*Pantalla de Juegos*/}
                <Tabs.Screen name="games"
                options={{
                    title: "Juegos",
                    tabBarIcon: ({color, size}) => (
                        <Ionicons name="game-controller" size={size} color={color}/>
                    )
                }}/>
                {/*Pantalla de Búsqueda*/}
                <Tabs.Screen name="search"
                options={{
                    title: "Buscar",
                    tabBarIcon: ({size, color}) => (
                        <Ionicons name="search" size={size} color={color}/>
                    )
                }}/>
                {/*Pantalla de Favoritos*/}
                <Tabs.Screen name="favorites"
                options={{
                    title: "Favoritos",
                    tabBarIcon: ({size, color}) => (
                        <Ionicons name="heart" size={size} color={color}/>
                    )
                }}/>
                {/*Pantalla de Perfil*/}
                <Tabs.Screen name="profile"
                options={{
                    title: "Perfil",
                    tabBarIcon: ({size, color}) => (
                        <Ionicons name="person" size={size} color={color}/>
                    )
                }}/>
                {/*Pantalla de Detalle*/}
                <Tabs.Screen 
                name="games/[id]"
                options={{
                    //La ocultamos de nuestra barra inferior para que no aparezca como una pestaña
                    href: null,
                }}
                />
            </Tabs>
       
    );
}