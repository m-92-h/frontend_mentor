"use client";

import { useEffect } from "react";
import Link from "next/link";

interface ErrorProps {
    error: Error & { digest?: string };
    reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
            <div className="relative flex flex-col items-center">
                <span className="text-[clamp(120px,30vw,280px)] font-heading font-bold leading-none select-none pointer-events-none" style={{ color: "var(--neutral-300)" }}>
                    ⚡
                </span>

                <div className="absolute top-1/2 -translate-y-1/2 flex flex-col items-center gap-4">
                    <span className="text-[clamp(48px,10vw,80px)]">⛈️</span>
                    <h1 className="text-2xl md:text-3xl font-heading font-bold text-neutral-900">Something went wrong</h1>
                    <p className="text-neutral-800 max-w-sm text-base md:text-lg">A storm hit our servers. Don&apos;t worry — you can try again.</p>

                    {error?.message && (
                        <code className="text-sm px-4 py-2 rounded-lg border border-neutral-700/50 text-neutral-800 max-w-sm truncate" style={{ background: "var(--neutral-300)" }}>
                            {error.message}
                        </code>
                    )}
                </div>
            </div>

            <div className="mt-12 flex flex-col sm:flex-row items-center gap-4">
                <button
                    onClick={reset}
                    className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-700 text-white font-semibold rounded-lg px-8 py-3 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-700 cursor-pointer"
                >
                    ↻ Try Again
                </button>
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 border-2 border-neutral-700/50 text-neutral-900 hover:bg-neutral-200 font-semibold rounded-lg px-8 py-3 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    ← Back to Home
                </Link>
            </div>
        </main>
    );
}
