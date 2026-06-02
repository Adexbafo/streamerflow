import AppLayout from '@/layouts/AppLayout';

interface Clip {
    id: number;

    title: string;

    clip_path: string;

    thumbnail_path: string;

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