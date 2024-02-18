export interface CharacterResponse {
    count: number
    next?: string
    previous?: string
    results: Character[]
  }
  
  export interface Character {
    name: string;
    birth_year: number;
    eye_color: string;
    hair_color: string;
    skin_color: string;
    gender: string;
    height: string;
    mass: string;
    homeworld: string;
    films: string[];
    species: string[];
    starships: string[];
    vehicles: string[];
    url: string;
    created: string;
    edited: string;
  }