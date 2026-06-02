interface Clip {
    id: number;
    title: string;
    thumbnail_path: string;
    created_at: string;

    user: {
        username: string;
    };
}

export default function ClipsIndex({
    clips,
}: any) {

    return (

        <div className="max-w-7xl mx-auto p-8">

            <h1 className="text-4xl font-bold mb-8">
                Trending Clips
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {clips.data.map((clip: Clip) => (

                    <a
                        key={clip.id}
                        href={`/clips/${clip.id}`}
                        className="
                            bg-white
                            rounded-2xl
                            overflow-hidden
                            shadow
                        "
                    >

                        <img
                            src={`/storage/${clip.thumbnail_path}`}
                            className="
                                w-full
                                h-56
                                object-cover
                            "
                        />

                        <div className="p-4">

                            <div className="font-bold text-lg">
                                {clip.title}
                            </div>

                            <div className="text-sm text-gray-500">
                                @{clip.user.username}
                            </div>

                        </div>

                    </a>

                ))}

            </div>

        </div>

    );

}