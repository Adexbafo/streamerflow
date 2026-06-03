import AppLayout from '@/layouts/AppLayout';
import { useEffect } from 'react';

interface Clip {
    id: number;

    title: string;

    clip_path: string;

    thumbnail_path: string;

    views_count: number;

    likes: any[];

    user: {
        username: string;
    };
}

interface Props {
    clips: {
        data: Clip[];
    };
}

export default function Feed({
    clips,
}: Props) {

    useEffect(() => {

        const params = new URLSearchParams(
            window.location.search
        );

        const clipId = params.get('clip');

        if (clipId) {

            const element = document.getElementById(
                `clip-${clipId}`
            );

            if (element) {

                element.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                });

            }

        }

    }, []);

    return (

        <AppLayout>

            <div
                className="
                    h-screen
                    overflow-y-scroll
                    snap-y
                    snap-mandatory
                "
            >

                {clips.data.map((clip) => (

                    <div
                        id={`clip-${clip.id}`}
                        key={clip.id}
                        className="
                            h-screen
                            flex
                            items-center
                            justify-center
                            snap-start
                            bg-black
                            relative
                        "
                    >

                        <video
                            controls
                            controlsList="nodownload"
                            autoPlay
                            loop
                            className="
                                h-full
                                w-full
                                object-cover
                            "
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

                        <div
                            className="
                                absolute
                                bottom-24
                                left-6
                                text-white
                                z-10
                                    "
                        >

                            <h2 className="text-2xl font-bold">
                                {clip.title}
                            </h2>

                            <p className="text-sm mt-2">
                                @{clip.user.username}
                            </p>

                            <div
                                className="
        absolute
        right-3 md:right-6
        bottom-40 md:bottom-64
        flex
        flex-col
        items-center
        gap-6
        text-white
        z-20
    "
                            >

                                <button
                                    className="
            flex
            flex-col
            items-center
            text-2xl
        "
                                >
                                    ❤️

                                    <span className="text-sm">
                                        {clip.likes?.length || 0}
                                    </span>
                                </button>

                                <div
                                    className="
            flex
            flex-col
            items-center
            text-2xl
        "
                                >
                                    👁️

                                    <span className="text-sm">
                                        {clip.views_count || 0}
                                    </span>
                                </div>

                                <button
                                    onClick={() => {

                                        navigator.clipboard.writeText(
                                            window.location.href
                                        );

                                        alert('Link copied!');

                                    }}
                                    className="
        bg-white/20
        text-white
        px-4
        py-2
        rounded-xl
    "
                                >

                                    🔗 Share

                                </button>

                            </div>

                        </div>

                    </div>

                ))}

            </div>

        </AppLayout>

    );

}