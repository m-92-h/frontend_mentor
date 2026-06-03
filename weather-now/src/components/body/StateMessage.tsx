interface StateMessageProps {
    message: string;
}

export default function StateMessage({ message }: StateMessageProps) {
    return (
        <section className="current-weather flex-1">
            <article className="flex items-center justify-center mx-4 md:mx-6 text-center">
                <p className="text-2xl font-bold text-neutral-900" data-aos="zoom-out" data-aos-easing="linear" data-aos-duration="1500">
                    {message}
                </p>
            </article>
        </section>
    );
}
