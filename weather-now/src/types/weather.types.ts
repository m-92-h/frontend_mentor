export interface CurrentWeather {
    time: string;
    temperature: number;
    feelsLike: number;
    humidity: number;
    windSpeed: number;
    precipitation: number;
    weatherCode: number;
}

export interface HourlyWeather {
    times: string[];
    temperatures: number[];
    weatherCodes: number[];
}

export interface DailyWeather {
    days: string[];
    weatherCodes: number[];
    tempMax: number[];
    tempMin: number[];
}

export interface WeatherData {
    cityName: string;
    countryName: string;
    current: CurrentWeather;
    hourly: HourlyWeather;
    daily: DailyWeather;
}

export interface Suggestion {
    id: number;
    name: string;
    country: string;
    latitude: number;
    longitude: number;
    admin1?: string;
}

export interface WeatherContextType {
    query: string;
    setQuery: (query: string) => void;
    currentCity: string;
    weather: WeatherData | null;
    loading: boolean;
    error: string;
    unitTemp: string;
    setUnitTemp: (unit: string) => void;
    unitWind: string;
    setUnitWind: (unit: string) => void;
    unitPrecip: string;
    setUnitPrecip: (unit: string) => void;
    handleSearch: (e: React.FormEvent | null, searchCity?: string | null) => Promise<void>;
    suggestions: Suggestion[];
    showSuggestions: boolean;
    setShowSuggestions: (show: boolean) => void;
    fetchSuggestions: (searchTerm: string) => Promise<void>;
}
