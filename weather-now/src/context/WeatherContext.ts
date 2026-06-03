import { createContext, useContext } from "react";
import type { WeatherContextType } from "@/types/weather.types";

export const WeatherContext = createContext<WeatherContextType | null>(null);

export const useWeather = (): WeatherContextType => {
    const context = useContext(WeatherContext);
    if (!context) {
        throw new Error("useWeather must be used within WeatherProvider");
    }
    return context;
};
