export interface VehicleResponse {
    count: number
    next?: string
    previous?: string
    results: Vehicle[]
  }
  
  export interface Vehicle {
    name: string;
    model: number;
    vehicle_class: string;
    manufacturer: string;
    length: string;
    cost_in_credits: string;
    crew: string;
    passengers: string;
    max_atmosphering_speed: string;
    cargo_capacity: string;
    consumables: string;
    films: string[];
    pilots: string[];
    url: string;
    created: string;
    edited: string;
  }