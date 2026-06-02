import AppLayout from '@/layouts/AppLayout';

interface Clip {
    id: number;

    title: string;

    clip_path: string;

    thumbnail_path: string;

    views_count: number;

    likes_count: number;

    user: {
        name: string;
    };
}

interface Props {
    clips: {
        data: Clip[];
    };
}

export default function Index({
    clips,
}: Props) {

    return (

        <AppLayout>

            <div className="max-w-7xl mx-auto p-6">

                <h1 className="text-4xl font-bold mb-10">
                    Trending Clips
                </h1>

                <div
                    className="
                        grid
                        grid-cols-1
                        md:grid-cols-3
                        gap-8
                    "
                >

                    {clips.data.map((clip) => (

                        <a
                            key={clip.id}
                            href={`/clips/${clip.id}`}
                            className="
                                border
                                rounded-2xl
                                overflow-hidden
                                shadow-sm
                            "
                        >

                            <img
                                src={`/storage/${clip.thumbnail_path}`}
                                alt={clip.title}
                                className="
                                    w-full
                                    h-96
                                    object-cover
                                "
                            />

                            <div className="p-4">

                                <h2 className="font-bold text-lg">

                                    {clip.title}

                                </h2>

                                <div
                                    className="
                                        mt-3
                                        text-sm
                                        text-gray-500
                                        flex
                                        items-center
                                        justify-between
                                    "
                                >

                                    <span>
                                        👁️ {clip.views_count}
                                    </span>

                                    <span>
                                        ❤️ {clip.likes_count}
                                    </span>

                                </div>

                                <div
                                    className="
                                        mt-2
                                        text-sm
                                        text-gray-400
                                    "
                                >

                                    {clip.user.name}

                                </div>

                            </div>

                        </a>

                    ))}

                </div>

            </div>

        </AppLayout>

    );

}