"use client";

import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon, CheckIcon } from "@heroicons/react/20/solid";
import { MdOutlineSettings } from "react-icons/md";
import { useWeather } from "@/context/WeatherContext";

export default function NavDropdown() {
    const { setUnitTemp, setUnitWind, setUnitPrecip, handleSearch, weather, currentCity, unitTemp, unitWind, unitPrecip } = useWeather();

    const updateUnit = (type: "temp" | "wind" | "precip", value: string): void => {
        if (type === "temp") setUnitTemp(value);
        if (type === "wind") setUnitWind(value);
        if (type === "precip") setUnitPrecip(value);

        if (weather && currentCity) {
            handleSearch(null, currentCity);
        }
    };

    return (
        <Menu as="div" className="relative inline-block md:p-4">
            {({ open }) => (
                <>
                    <MenuButton className="cursor-pointer inline-flex items-center w-full text-[clamp(12px,3vw,18px)] justify-center gap-x-1.5 rounded-lg bg-neutral-200 px-1.5 py-1 md:px-3 md:py-2 font-semibold text-neutral-900 border md:border-2 border-neutral-300 hover:bg-neutral-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200">
                        <MdOutlineSettings className="size-4 md:size-5 text-neutral-900" />
                        <span>Units</span>
                        <ChevronDownIcon aria-hidden="true" className={`-mr-1 size-4 md:size-5 lg:size-6 text-neutral-900 transition-transform duration-300 ${open ? "rotate-180" : "rotate-0"}`} />
                    </MenuButton>

                    <MenuItems
                        transition
                        className="absolute right-0 z-10 mt-2 w-48 md:w-56 origin-top-right divide-y divide-neutral-300 rounded-lg bg-neutral-200 border md:border-2 border-neutral-300 shadow-lg transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                    >
                        {/* Temperature */}
                        <div className="py-1 md:py-2">
                            <MenuItem>
                                <div className="p-2 text-[clamp(12px,5vw,16px)]">
                                    <h4 className="font-bold text-neutral-900 mb-2">Switch to Imperial</h4>
                                    <h5 className="text-sm font-semibold text-neutral-800">Temperature</h5>
                                </div>
                            </MenuItem>
                            {(["celsius", "fahrenheit"] as const).map((unit) => (
                                <MenuItem key={unit}>
                                    <button
                                        onClick={() => updateUnit("temp", unit)}
                                        className="w-full text-left px-4 py-2 text-sm text-neutral-900 hover:bg-neutral-300 focus:bg-neutral-300 focus:outline-none cursor-pointer transition-colors flex items-center justify-between"
                                    >
                                        <span>{unit === "celsius" ? "Celsius (°C)" : "Fahrenheit (°F)"}</span>
                                        {unitTemp === unit && <CheckIcon className="w-5 h-5 text-neutral-900" />}
                                    </button>
                                </MenuItem>
                            ))}
                        </div>

                        {/* Wind Speed */}
                        <div className="py-2">
                            <MenuItem>
                                <h5 className="px-4 py-2 text-sm font-semibold text-neutral-800">Wind Speed</h5>
                            </MenuItem>
                            {(["kmh", "mph"] as const).map((unit) => (
                                <MenuItem key={unit}>
                                    <button
                                        onClick={() => updateUnit("wind", unit)}
                                        className="w-full text-left px-4 py-2 text-sm text-neutral-900 hover:bg-neutral-300 focus:bg-neutral-300 focus:outline-none cursor-pointer transition-colors flex items-center justify-between"
                                    >
                                        <span>{unit}</span>
                                        {unitWind === unit && <CheckIcon className="w-5 h-5 text-neutral-900" />}
                                    </button>
                                </MenuItem>
                            ))}
                        </div>

                        {/* Precipitation */}
                        <div className="py-2">
                            <MenuItem>
                                <h5 className="px-4 py-2 text-sm font-semibold text-neutral-800">Precipitation</h5>
                            </MenuItem>
                            {(["mm", "inch"] as const).map((unit) => (
                                <MenuItem key={unit}>
                                    <button
                                        onClick={() => updateUnit("precip", unit)}
                                        className="w-full text-left px-4 py-2 text-sm text-neutral-900 hover:bg-neutral-300 focus:bg-neutral-300 focus:outline-none cursor-pointer transition-colors flex items-center justify-between"
                                    >
                                        <span>{unit === "mm" ? "Millimeters (mm)" : "Inches (in)"}</span>
                                        {unitPrecip === unit && <CheckIcon className="w-5 h-5 text-neutral-900" />}
                                    </button>
                                </MenuItem>
                            ))}
                        </div>
                    </MenuItems>
                </>
            )}
        </Menu>
    );
}
