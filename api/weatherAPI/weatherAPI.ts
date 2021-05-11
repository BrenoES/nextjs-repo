import { get } from "../baseAPI";

export function getWeather<T>(city: string) {
    
    return get<T>('weather', {
        q: city,
        units: 'metric',
        lang: 'pt_br'
    })
}