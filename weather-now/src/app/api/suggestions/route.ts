import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const name = searchParams.get("name");

    if (!name || name.length < 2) {
        return NextResponse.json({ results: [] });
    }

    const res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${name}&count=10&language=en&format=json`, {
        next: { revalidate: 3600 },
    });

    const data = await res.json();
    return NextResponse.json(data);
}
