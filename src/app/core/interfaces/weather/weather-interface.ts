import { CurrentInterface } from "./current-interface";
import { LocationInterface } from "./location-interface"

export interface WeatherInterface {
  location: LocationInterface;
  current: CurrentInterface;
}