"use client";

import { useState } from "react";
import { WeatherContext } from "./WeatherContext";
import type { WeatherData, Suggestion } from "@/types/weather.types";

export const WeatherProvider = ({ children }: { children: React.ReactNode }) => {
    const [query, setQuery] = useState<string>("");
    const [currentCity, setCurrentCity] = useState<string>("");
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const [unitTemp, setUnitTemp] = useState<string>("celsius");
    const [unitWind, setUnitWind] = useState<string>("kmh");
    const [unitPrecip, setUnitPrecip] = useState<string>("mm");
    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
    const [showSuggestions, setShowSuggestions] = useState<boolean>(false);

    const fetchSuggestions = async (searchTerm: string): Promise<void> => {
        if (!searchTerm.trim() || searchTerm.length < 2) {
            setSuggestions([]);
            setShowSuggestions(false);
            return;
        }

        try {
            const res = await fetch(`/api/suggestions?name=${searchTerm}`);
            const data = await res.json();

            if (data.results) {
                setSuggestions(data.results);
                setShowSuggestions(true);
            } else {
                setSuggestions([]);
            }
        } catch (err) {
            console.error("Error fetching suggestions:", err);
            setSuggestions([]);
        }
    };

    const handleSearch = async (e: React.FormEvent | null, searchCity: string | null = null): Promise<void> => {
        if (e && e.preventDefault) e.preventDefault();

        const cityToSearch = searchCity || query;
        if (!cityToSearch.trim()) return;

        setLoading(true);
        setError("");

        try {
            const res = await fetch(`/api/weather?city=${encodeURIComponent(cityToSearch)}&unitTemp=${unitTemp}&unitWind=${unitWind}&unitPrecip=${unitPrecip}`);
            const data = await res.json();

            if (!res.ok) {
                setError(data.error || "An error occurred");
                setWeather(null);
                return;
            }

            setWeather(data);
            setCurrentCity(data.cityName);
            setQuery("");
            setSuggestions([]);
            setShowSuggestions(false);
        } catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    const value = {
        query,
        setQuery,
        currentCity,
        weather,
        loading,
        error,
        unitTemp,
        setUnitTemp,
        unitWind,
        setUnitWind,
        unitPrecip,
        setUnitPrecip,
        handleSearch,
        suggestions,
        showSuggestions,
        setShowSuggestions,
        fetchSuggestions,
    };

    return <WeatherContext.Provider value={value}>{children}</WeatherContext.Provider>;
};
