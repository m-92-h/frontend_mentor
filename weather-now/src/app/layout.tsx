import type { Metadata } from "next";
import { DM_Sans, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import { WeatherProvider } from "@/context/WeatherProvider";
import AOSInit from "@/components/AOSInit";

const dmSans = DM_Sans({
    subsets: ["latin"],
    variable: "--font-sans",
    display: "swap",
});

const bricolage = Bricolage_Grotesque({
    subsets: ["latin"],
    variable: "--font-heading",
    weight: ["700"],
    display: "swap",
});

export const metadata: Metadata = {
    title: "Weather Now",
    description: "Get real-time weather forecasts for any city worldwide",
    metadataBase: new URL("https://weather-now-wn.vercel.app/"),
    openGraph: {
        title: "Weather Now",
        description: "Get real-time weather forecasts for any city worldwide",
        url: "https://weather-now-wn.vercel.app/",
        siteName: "Weather Now",
        locale: "en_US",
        type: "website",
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className={`${dmSans.variable} ${bricolage.variable}`}>
            <body>
                <WeatherProvider>
                    <AOSInit />
                    {children}
                </WeatherProvider>
            </body>
        </html>
    );
}
