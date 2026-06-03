import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "Weather Now",
        short_name: "Weather",
        description: "Weather forecast application",
        start_url: "/",
        display: "standalone",
        background_color: "#12104a",
        theme_color: "#12104a",
        icons: [
            {
                src: "/favicon.ico",
                sizes: "any",
                type: "image/x-icon",
            },
        ],
    };
}
