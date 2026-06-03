import lightIcon from "./assets/icon-search-light.svg";
import darkIcon from "./assets/icon-search-dark.svg";
import "./style.css";

// Interfaces
interface Currency {
    code: string;
    name: string;
    symbol: string;
}

interface Language {
    iso639_1: string;
    iso639_2: string;
    name: string;
    nativeName: string;
}

interface Country {
    name: string;
    nativeName: string;
    flag: string;
    region: string;
    subregion: string;
    capital: string;
    population: number;
    alpha3Code: string;
    topLevelDomain: string[];
    currencies: Currency[];
    languages: Language[];
    borders?: string[];
}

// Global State
let allCountriesData: Country[] = [];

// Display Country Detail Page
function displayDetail(country: Country): void {
    const existingDetail = document.querySelector(".detail-view");
    if (existingDetail) {
        existingDetail.remove();
    }

    const main = document.querySelector("main") as HTMLElement;
    const contentPage = document.querySelector(".content-page") as HTMLElement;
    contentPage.style.display = "none";

    // Handle border countries
    let borderCountriesHTML = "<span>No Border Countries</span>";
    const borderCodes = country.borders;

    if (borderCodes && borderCodes.length > 0) {
        const borderNames = borderCodes
            .map((code: string) => {
                const borderCountry = allCountriesData.find((c) => c.alpha3Code === code);
                const name = borderCountry ? borderCountry.name : code;
                return `<button class="border-country-btn" data-country-name="${name}">${name}</button>`;
            })
            .join(" ");
        borderCountriesHTML = borderNames;
    }

    // Format country detail fields
    const currencies = country.currencies ? country.currencies.map((c) => c.name).join(", ") : "N/A";
    const languages = country.languages ? country.languages.map((l) => l.name).join(", ") : "N/A";
    const tld = country.topLevelDomain ? country.topLevelDomain.join(", ") : "N/A";
    const populationFormatted = country.population ? country.population.toLocaleString("en-US") : "N/A";

    // Create detail view container
    const container = document.createElement("div");
    container.classList.add("detail-view");

    container.innerHTML = `
        <div class="btn">
            <button>Back</button>
        </div>
        <div class="content">
            <div class="image-flag">
                <img src="${country.flag}" alt="Flag of ${country.nativeName}">
            </div>
            <div class="info-flag">
                <h1>${country.name}</h1>
                <div class="info">
                    <div class="part-left">
                        <p><b>Native Name: </b> ${country.nativeName || "N/A"}</p>
                        <p><b>Population: </b> ${populationFormatted}</p>
                        <p><b>Region: </b> ${country.region || "N/A"}</p>
                        <p><b>Subregion: </b> ${country.subregion || "N/A"}</p>
                        <p><b>Capital: </b> ${country.capital || "N/A"}</p>
                    </div>
                    <div class="part-right">
                        <p><b>Top Level Domain: </b> ${tld}</p>
                        <p><b>Currencies: </b> ${currencies}</p>
                        <p><b>Languages: </b> ${languages}</p>
                    </div>
                </div>
                <div class="border-countries-section">
                    <h4>Border Countries: </h4>
                    <div class="border-countries-list">
                        ${borderCountriesHTML}
                    </div>
                </div>
            </div>
        </div>`;

    main.appendChild(container);

    // Back button handler
    const btnBack = container.querySelector(".btn button") as HTMLButtonElement;
    btnBack.addEventListener("click", () => {
        container.remove();
        contentPage.style.display = "";
    });

    // Border country buttons — navigate to clicked country
    const borderCountryBtns = container.querySelectorAll(".border-country-btn");
    borderCountryBtns.forEach((btn) => {
        btn.addEventListener("click", (e: Event) => {
            const clickedCountryName = (e.currentTarget as HTMLButtonElement).dataset.countryName;
            const nextCountryData = allCountriesData.find((c) => c.name === clickedCountryName);

            if (nextCountryData) {
                displayDetail(nextCountryData);
            }
        });
    });
}

// Populate Region Filter Dropdown
function populateRegionFilter(): void {
    // Extract unique regions from data
    const regions = new Set(allCountriesData.map((country) => country.region).filter(Boolean));
    const selectElement = document.querySelector(".settings-select select") as HTMLSelectElement;

    const allOption = document.createElement("option");
    allOption.value = "All";
    allOption.textContent = "All Regions";
    selectElement.appendChild(allOption);

    regions.forEach((region) => {
        const option = document.createElement("option");
        option.value = region;
        option.textContent = region;
        selectElement.appendChild(option);
    });
}

// Live Search and Region Filter
function performLiveSearch(): void {
    const searchTerm = (document.getElementById("searchInput") as HTMLInputElement).value.toLowerCase();
    const selectedRegion = (document.querySelector(".settings-select select") as HTMLSelectElement).value;
    const allCards = document.querySelectorAll<HTMLElement>(".container .card");

    allCards.forEach((card) => {
        const countryName = (card.querySelector("h4") as HTMLHeadingElement).textContent?.toLowerCase() ?? "";
        const cardRegion = card.dataset.region;

        const matchesSearch = countryName.includes(searchTerm);
        const matchesRegion = selectedRegion === "" || selectedRegion === "All" || cardRegion === selectedRegion;

        card.style.display = matchesSearch && matchesRegion ? "" : "none";
    });
}

// Fetch and Render All Country Cards
async function getData(): Promise<void> {
    try {
        const res = await fetch("/data.json"); // data.json must be inside the public/ folder
        const data: Country[] = await res.json();

        allCountriesData = data;

        const div = document.querySelector(".container") as HTMLElement;

        for (let i = 0; i < data.length; i++) {
            const card = document.createElement("div");
            card.classList.add("card");

            const country = data[i];
            card.dataset.region = country.region;

            card.innerHTML = `
                <div class="card-image">
                    <img src="${country.flag}" alt="Flag of ${country.nativeName}">
                </div>
                <div class="card-content">
                    <h4>${country.nativeName}</h4>
                    <p><b>Population:</b> ${country.population.toLocaleString("en-US") || "N/A"}</p>
                    <p><b>Region:</b> ${country.region || "N/A"}</p>
                    <p><b>Capital:</b> ${country.capital || "N/A"}</p>
                </div>`;

            div.appendChild(card);

            card.addEventListener("click", () => {
                displayDetail(country);
            });
        }

        populateRegionFilter();
    } catch (err) {
        console.error("Failed to fetch country data:", err);
    }
}

getData();

// Theme Toggle and Event Listeners
const body = document.querySelector("body") as HTMLBodyElement;
const swichMode = document.querySelector(".swich-mode") as HTMLElement;
const textSwichMode = document.querySelector(".swich-mode h3") as HTMLHeadingElement;
const iconSearch = document.querySelector(".search img") as HTMLImageElement;
const searchInput = document.getElementById("searchInput") as HTMLInputElement;
const regionFilter = document.querySelector(".settings-select select") as HTMLSelectElement;

function toggleTheme(): void {
    body.classList.toggle("dark-mode");

    if (body.classList.contains("dark-mode")) {
        // Switched to dark mode
        textSwichMode.innerText = "Light Mode";
        iconSearch.src = lightIcon;
        localStorage.setItem("theme", "dark");
    } else {
        // Switched to light mode
        textSwichMode.innerText = "Dark Mode";
        iconSearch.src = darkIcon;
        localStorage.setItem("theme", "light");
    }
}

// Apply saved theme on load
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
    body.classList.add("dark-mode");
    textSwichMode.innerText = "Light Mode";
    iconSearch.src = lightIcon;
} else {
    textSwichMode.innerText = "Dark Mode";
    iconSearch.src = darkIcon;
}

swichMode.addEventListener("click", toggleTheme);
searchInput.addEventListener("input", performLiveSearch);
regionFilter.addEventListener("change", performLiveSearch);
