interface Props {
    title: string;
    subtitle?: string;
}

export default function SectionTitle({
    title,
    subtitle,
}: Props) {

    return (
        <div className="mb-8">

            <h1 className="text-4xl font-bold tracking-tight">
                {title}
            </h1>

            {subtitle && (
                <p className="text-gray-500 mt-2">
                    {subtitle}
                </p>
            )}

        </div>
    );
}