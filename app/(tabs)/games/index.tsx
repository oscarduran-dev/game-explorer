//Componentes visuales de React Native
import { View, Text,  FlatList, ActivityIndicator, StyleSheet } from "react-native";
//Hooks de React
import { useEffect, useState } from "react";
//Función para obtener los juegos desde la API de RAWG
import { getGames } from "../../../services/gamesApi";
//Tipo que definde la estructura de un juego
import { Game } from "../../../types/game";
//Componente reutilizable para mostrar cada juego
import GameCard from "../../../components/GameCard";
//Hook para obtener la session del usuario
import { useAuth } from "../../../hooks/useAuth";
//Función que guarda un juego en favoritos
import handleOnFavorite from "../../../services/favorites";



export default function Games() {
  //Guarda las diferentes categorias y los juegos pertenecientes a cada una
  const [categories, setCategories] = useState<{ title: string; games: Game[] }[]>([]);

  //Obtenemos la session del usuario para saber quién está agregando a favoritos
  const {session} = useAuth()

  //Controla el indicador de carga
  const [loading, setLoading] = useState(false);
  //Guarda un mensaje de error en caso de que falle la petición
  const [error, setError] = useState("");


  //IDs de los géneros que utilizamos para crear las diferentes categorias
  const genreCategories = [
    {title: "Acción",genre: 4,},
  {title: "Aventura",genre: 3,},
  {title: "RPG",genre: 5,},
  {title: "Estrategia",genre: 10,},
  {title: "Shooter",genre: 2,},
  {title: "Deportes",genre: 15,},
  {title: "Carreras",genre: 1,},
  {title: "Indie",genre: 51,},
  {title: "Arcade",genre: 7,},
  ];

  
  //Obtiene los juegos populares y los juegos de cada género
  async function loadGames() {
    try {
      setLoading(true);
      //Primera petición: Juegos populares
      const data = await getGames();
      //Creamos una petición para cada género
      //Map recorre genreCategories y devuelve una promesa de getGames() para cada género
      const genreRequests = genreCategories.map((item) => {
        return getGames(undefined, item.genre);
      });

      //Esperamos a que terminen las peticiones antes de continuar
      const genreResults = await Promise.all(genreRequests);

      //Combinamos el nombre de cada categoría con los juegos que devolvió su petición correspondiente
      const genreRows = genreCategories.map((item, index) => {
        return {
          title: item.title,
          games: genreResults[index]
        }
      })
      //Creamos la estructura que utilizará la FlatList.
      //La primera categoría contiene los juegos populares y después agregamos todas las categorías por género
      setCategories([
        {title: "Juegos más populares", games: data},
        ...genreRows
      ])


    } catch (error) {
      //Si alguna petición falla, mostramos un mensaje de error
      setError("No se pudieron cargar los juegos");
    } finally {
      //Dejamos de mostrar el indicador de carga en todos los casos posibles
      setLoading(false);
    }
  }

  //Ejecutamos loadGames() una sola vez cuando la pantalla se monta
  useEffect(() => {
    loadGames();
  }, []);




 return (
  <View style= {styles.container}>
    {/* Mostramos el mensaje de error solamente si existe */}
    {error && <Text>{error}</Text>}

    {loading ? (
      // Mientras cargan los juegos mostramos un indicador
      <ActivityIndicator size="large" color="#3FA7D6" />
    ) : (
      <View>
        {/* Lista principal de categorías */}
        <FlatList 
        data={categories}
        renderItem={({item}) => (
            <View>
                <Text style={styles.categoryTitle}>{item.title}</Text>
                {/*Lista horizontal con los juegos pertenecientes a esa caegoría */}
                <FlatList 
                data={item.games}
                renderItem={({item})=>(
                                          //Cuando se pulsa el corazón obtenemos el ID del juego
                    <GameCard game={item} onFavorite={(gameId)=> {
                      //Solo permite guardar favoritos si existe una session
                      if (session){
                        handleOnFavorite(session.user.id, gameId);
                      }
                    }}/>
                )}
                horizontal
                />
            </View>
        )}
        />
      </View>
    )}
  </View>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#13293d"
  },
  categoryTitle: {
    color: "#EAF4FF",
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 14,
    marginTop: 22,
    marginBottom: 10,
    borderLeftWidth: 4,
    letterSpacing: 0.5,
    borderLeftColor: "#3FA7D6",
    paddingLeft: 10
},
})