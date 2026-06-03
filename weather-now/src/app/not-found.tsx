import Link from "next/link";

export default function NotFound() {
    return (
        <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
            <div className="relative flex flex-col items-center">
                <span className="text-[clamp(120px,30vw,280px)] font-heading font-bold leading-none select-none pointer-events-none" style={{ color: "var(--neutral-300)" }}>
                    404
                </span>

                <div className="absolute top-1/2 -translate-y-1/2 flex flex-col items-center gap-4">
                    <span className="text-[clamp(48px,10vw,80px)]">🌫️</span>
                    <h1 className="text-2xl md:text-3xl font-heading font-bold text-neutral-900">Page lost in the clouds</h1>
                    <p className="text-neutral-800 max-w-sm text-base md:text-lg">The page you&apos;re looking for has drifted away — it doesn&apos;t exist or has been moved.</p>
                </div>
            </div>

            <Link
                href="/"
                className="mt-12 inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-700 text-white font-semibold rounded-lg px-8 py-3 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-700"
            >
                ← Back to Home
            </Link>
        </main>
    );
}
