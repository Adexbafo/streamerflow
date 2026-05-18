import AppLayout from '@/layouts/AppLayout';

interface SavedVideo {
    id: number;

    video: {
        id: number;
        title: string;
        thumbnail_path: string;
        slug: string;

        user: {
            name: string;
        };
    };
}

interface Props {
    savedVideos: {
        data: SavedVideo[];
    };
}

export default function Index({
    savedVideos,
}: Props) {

    return (
    <AppLayout>
        <div className="max-w-6xl mx-auto p-6">

            <h1 className="text-4xl font-bold mb-10">
                Saved Videos
            </h1>

            {savedVideos.data.length === 0 ? (

                <div className="border rounded-lg p-6 text-gray-500">

                    No saved videos yet.

                </div>

            ) : (

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    {savedVideos.data.map((saved) => (

                        <a
                            key={saved.id}
                            href={`/videos/${saved.video.slug}`}
                            className="border rounded-lg overflow-hidden"
                        >

                            <img
                                src={`/storage/${saved.video.thumbnail_path}`}
                                alt={saved.video.title}
                                className="w-full h-72 object-cover"
                            />

                            <div className="p-4">

                                <h2 className="font-bold text-lg">
                                    {saved.video.title}
                                </h2>

                                <p className="text-gray-500 text-sm mt-2">
                                    {saved.video.user.name}
                                </p>

                            </div>

                        </a>

                    ))}

                </div>

            )}

        </div>
        </AppLayout>
);
}