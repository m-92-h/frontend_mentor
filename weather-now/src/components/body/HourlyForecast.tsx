"use client";

import { useState } from "react";
import Image from "next/image";
import { Field, Label, Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { useWeather } from "@/context/WeatherContext";
import { weatherDesc } from "@/utils/weatherDescriptions";
import { formatTime } from "@/utils/dateFormatter";

export default function HourlyForecast() {
    const { weather } = useWeather();
    const [selectedDayIndex, setSelectedDayIndex] = useState<number>(0);

    if (!weather || !weather.hourly) return null;

    const startIndex = selectedDayIndex * 24;
    const endIndex = startIndex + 24;

    const dayHours = weather.hourly.times.slice(startIndex, endIndex);
    const dayTemps = weather.hourly.temperatures.slice(startIndex, endIndex);
    const dayCodes = weather.hourly.weatherCodes.slice(startIndex, endIndex);

    return (
        <aside className="bg-neutral-200 border md:border-2 border-neutral-300 rounded-lg p-6" data-aos="fade-left">
            <Field className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <Label className="text-2xl font-heading font-bold text-neutral-900">Hourly forecast</Label>
                <div className="relative">
                    <Listbox value={selectedDayIndex} onChange={setSelectedDayIndex}>
                        {({ open }) => (
                            <>
                                <ListboxButton
                                    className={clsx(
                                        "relative w-40 text-left rounded-lg border-2 border-neutral-700/50 bg-neutral-300 px-3 py-1.5 font-semibold text-neutral-900 cursor-pointer",
                                        "focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-neutral-300",
                                    )}
                                >
                                    <span className="block truncate">{new Date(weather.daily.days[selectedDayIndex]).toLocaleDateString("en-US", { weekday: "long" })}</span>
                                    <ChevronDownIcon
                                        aria-hidden="true"
                                        className={clsx(
                                            "pointer-events-none absolute top-2.5 right-2.5 size-4 md:size-5 lg:size-6 text-neutral-900 transition-transform duration-300",
                                            open ? "rotate-180" : "rotate-0",
                                        )}
                                    />
                                </ListboxButton>

                                <ListboxOptions anchor="bottom end" className="z-50 w-48 rounded-lg border border-neutral-400 bg-neutral-300 py-1 shadow-lg focus:outline-none mt-1">
                                    {weather.daily.days.map((day, index) => (
                                        <ListboxOption key={day} value={index} className="group flex cursor-pointer items-center gap-2 px-3 py-1.5 data-focus:bg-neutral-400/50">
                                            <span className="text-sm font-semibold text-neutral-900">{new Date(day).toLocaleDateString("en-US", { weekday: "long" })}</span>
                                        </ListboxOption>
                                    ))}
                                </ListboxOptions>
                            </>
                        )}
                    </Listbox>
                </div>
            </Field>

            <ol className="space-y-3 overflow-y-auto scrollbar-custom h-117">
                {dayHours.map((time, index) => {
                    const code = dayCodes[index];
                    const status = weatherDesc[code] || {
                        label: "Cloudy",
                        icon: "/images/icon-partly-cloudy.webp",
                    };

                    return (
                        <li key={time}>
                            <article className="flex items-center justify-between gap-4 border border-neutral-700/50 rounded-lg bg-neutral-300 px-3 py-2 mr-2 hover:bg-neutral-400/50 transition-colors">
                                <section className="flex items-center gap-3 flex-1">
                                    <Image src={status.icon} alt={status.label} width={40} height={40} className="object-contain" />
                                    <time className="font-semibold text-neutral-900 w-16">{formatTime(time)}</time>
                                </section>
                                <span className="text-lg font-bold text-neutral-900">{Math.round(dayTemps[index])}°</span>
                            </article>
                        </li>
                    );
                })}
            </ol>
        </aside>
    );
}
