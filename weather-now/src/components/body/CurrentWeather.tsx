"use client";

import { useWeather } from "@/context/WeatherContext";
import { getWeatherDetailsCards } from "@/utils/weatherDetailsData";
import { stateMessages } from "@/utils/stateMessagesData";
import { formatCurrentDate } from "@/utils/dateFormatter";
import StateMessage from "./StateMessage";
import CurrentWeatherHeader from "./CurrentWeatherHeader";

export default function CurrentWeather() {
    const { weather, error, unitWind, unitPrecip } = useWeather();

    if (error) return <StateMessage message={stateMessages.error.message} />;
    if (!weather) return <StateMessage message={stateMessages.empty.message} />;

    return (
        <section className="current-weather flex-1">
            <CurrentWeatherHeader weather={weather} formattedDate={formatCurrentDate(weather.current.time)} />
            <section className="weather-details grid grid-cols-2 md:grid-cols-4 gap-4 px-4 md:px-6 mt-6">
                {getWeatherDetailsCards(weather, unitWind, unitPrecip).map((card) => (
                    <article
                        key={card.id}
                        className="bg-neutral-200 flex flex-col p-4 border-2 border-neutral-300 rounded-lg hover:bg-neutral-700/50 transition-colors"
                        data-aos="flip-up"
                        data-aos-delay={card.delay}
                    >
                        <h3 className="text-sm md:text-base font-semibold text-neutral-800 mb-2">{card.label}</h3>
                        <p className="text-lg md:text-2xl font-bold text-neutral-900">
                            {card.value}
                            {card.unit}
                        </p>
                    </article>
                ))}
            </section>
        </section>
    );
}
