import AppLayout from '@/layouts/AppLayout';

interface Clip {
    id: number;

    title: string;

    clip_path: string;

    thumbnail_path: string;

    likes?: any[];

    views_count: number;

    created_at: string;

    user: {
        name: string;
        username: string;
    };
}

interface Props {
    clip: Clip;
}

export default function Show({
    clip,
}: Props) {

    return (

        <AppLayout>

            <div className="max-w-5xl mx-auto p-6">

                <div className="mb-6">

                    <h1 className="text-4xl font-bold">

                        {clip.title}

                    </h1>

                    <div className="text-gray-500 mt-2">

                        Clipped by {clip.user.name}

                    </div>

                </div>

                <div
                    className="
                        rounded-2xl
                        overflow-hidden
                        bg-black
                        shadow-xl
                    "
                >

                    <video
                        controls
                        className="w-full"
                        poster={
                            `/storage/${clip.thumbnail_path}`
                        }
                    >

                        <source
                            src={
                                `/storage/${clip.clip_path}`
                            }
                            type="video/mp4"
                        />

                    </video>

                </div>

                <div className="mt-4 flex items-center gap-4">

                    <form
                        method="POST"
                        action={`/clips/${clip.id}/like`}
                    >

                        <button
                            type="submit"
                            className="
                bg-red-500
                text-white
                px-4
                py-2
                rounded-xl
            "
                        >
                            ❤️ {clip.likes?.length || 0} Likes
                        </button>

                    </form>

                    <button
                        onClick={() => {
                            navigator.clipboard.writeText(
                                window.location.href
                            );

                            alert('Clip link copied!');
                        }}
                        className="
                            bg-blue-500
                            text-white
                            px-4
                            py-2
                            rounded-xl
                        "
                    >
                        🔗 Share
                    </button>

                </div>

                <div className="mt-4 text-gray-500">

                    👁️ {clip.views_count} views

                </div>

                <div className="mt-6 text-sm text-gray-500">

                    Created at:

                    {' '}

                    {new Date(
                        clip.created_at
                    ).toLocaleString()}

                </div>

            </div>

        </AppLayout>

    );

}