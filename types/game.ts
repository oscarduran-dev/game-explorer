//Representa la estructura principal de un juego que recibimos desde la API de RAWG
export interface Game  {
    id: number;
    name: string;
    background_image: string;
    rating: number;
    released: string;
    description: string;
    // Un juego puede tener varios géneros. Por eso utilizamos un array de Genre.
    genres: Genre[];
    // Un juego puede estar disponible en varias plataformas. Por eso utilizamos un array de PlatformItem.
    platforms: PlatformItem[];
}

// Representa un género de un juego.
export interface Genre {
    id: number;
    name: string;
}
// Representa una plataforma.
export interface Platform {
    id: number;
    name: string;
}
// Representa la estructura que RAWG utiliza para guardar una plataforma dentro de un juego
export interface PlatformItem {
  platform: Platform;
}