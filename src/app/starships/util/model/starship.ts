export interface StarshipResponse {
    count: number
    next?: string
    previous?: string
    results: Starship[]
  }
  
  export interface Starship {
    name: string;
    model: number;
    starship_class: string;
    manufacturer: string;
    cost_in_credits: string;
    length: string;
    crew: string;
    passengers: string;
    max_atmosphering_speed: string;
    hyperdrive_rating: string;
    MGLT: string;
    cargo_capacity: string;
    consumables: string;
    films: string[];
    pilots: string[];
    url: string;
    created: string;
    edited: string;
  }