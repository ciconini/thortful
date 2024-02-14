export interface PlanetResponse {
    count: number;
    next?: string;
    previous?: string;
    results: Planet[];
  }
  
  export interface Planet {
    climate: string
    created: string
    diameter: string
    edited: string
    films: string[]
    gravity: string
    id: number;
    name: string
    orbital_period: string
    population: string
    residents: string[]
    rotation_period: string
    surface_water: string
    terrain: string
    url: string
  }