"use client";

import { useWeather } from "@/context/WeatherContext";
import { IoSearchOutline } from "react-icons/io5";
import type { Suggestion } from "@/types/weather.types";

export default function Search() {
    const { query, setQuery, handleSearch, suggestions, showSuggestions, setShowSuggestions, fetchSuggestions, loading } = useWeather();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const value = e.target.value;
        setQuery(value);
        fetchSuggestions(value);
    };

    const handleSelectSuggestion = (city: Suggestion): void => {
        setQuery(city.name);
        setShowSuggestions(false);
        handleSearch(null, city.name);
    };

    return (
        <section className="flex flex-col gap-8 pt-8 pb-12" data-aos="fade-up">
            <h1 className="text-4xl md:text-5xl text-center px-4 font-heading font-bold text-neutral-900" data-aos="zoom-in" data-aos-delay="100">
                {`How's the sky looking today?`}
            </h1>

            <div className="w-full" data-aos="fade-up" data-aos-delay="200">
                <form onSubmit={handleSearch} role="search" className="flex flex-col md:flex-row items-center gap-4 mx-4 md:mx-6 relative">
                    <div className="flex-1 w-full md:w-auto relative">
                        <IoSearchOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 pointer-events-none text-neutral-900" />
                        <input
                            type="search"
                            value={query}
                            onChange={handleInputChange}
                            onFocus={() => query && showSuggestions && setShowSuggestions(true)}
                            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                            className="flex-1 border border-neutral-700 rounded-lg p-3 pl-10 w-full bg-neutral-200/50 text-neutral-900 placeholder:text-neutral-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            placeholder="Search for a place..."
                        />

                        {showSuggestions && suggestions.length > 0 && (
                            <div className="absolute top-full left-0 right-0 bg-neutral-200/50 border border-neutral-700 rounded-lg mt-1 shadow-lg z-50 h-32 md:w-full overflow-y-auto scrollbar-custom">
                                {suggestions.map((city, index) => (
                                    <button
                                        key={index}
                                        type="button"
                                        onClick={() => handleSelectSuggestion(city)}
                                        className="w-full text-left px-4 py-2 hover:bg-blue-500 transition-colors border-b border-neutral-200 last:border-b-0 text-neutral-900 text-md"
                                    >
                                        {city.name}
                                        {city.admin1 ? `, ${city.admin1}` : ""}
                                        {city.country ? `, ${city.country}` : ""}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <button
                        type="submit"
                        data-aos="flip-left"
                        data-aos-duration="800"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-semibold rounded-lg px-6 py-3 md:px-8 w-full md:w-auto transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2 cursor-pointer"
                    >
                        Search
                    </button>
                </form>

                {loading && (
                    <div className="flex items-center gap-3 mt-4 mx-4 md:mx-6 flex-1 border border-neutral-700 rounded-lg p-3 pl-10 bg-neutral-200/50 text-neutral-900 transition-all">
                        <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                        <span className="text-neutral-800 font-medium">Search in progress...</span>
                    </div>
                )}
            </div>
        </section>
    );
}
