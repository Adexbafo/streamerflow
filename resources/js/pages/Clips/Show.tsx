import AppLayout from '@/layouts/AppLayout';

interface Clip {
    id: number;

    title: string;

    clip_path: string;

    thumbnail_path: string;

    likes?: any[];

    comments?: {
        id: number;

        body: string;

        user: {
            username: string;
        };
    }[];

    views_count: number;

    created_at: string;

    user: {
        id: number;

        name: string;

        username: string;

        followers?: any[];

        following?: any[];
    };
}

interface Props {
    clip: Clip;

    isLiked: boolean;

    isFollowing: boolean;

    comments: Comment[];
}

export default function Show({
    clip,
    isLiked,
    isFollowing,
    comments,
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

                    <div className="mt-2 text-sm text-gray-500">

                        <span>
                            {clip.user.followers?.length || 0}
                            {' '}
                            followers
                        </span>

                        <span className="mx-3">
                            •
                        </span>

                        <span>
                            {clip.user.following?.length || 0}
                            {' '}
                            following
                        </span>

                    </div>

                    <div className="mt-4">

                        <form
                            method="POST"
                            action={`/users/${clip.user.id}/follow`}
                        >

                            <button
                                type="submit"
                                className="
                bg-blue-500
                text-white
                px-4
                py-2
                rounded-xl
            "
                            >
                                {isFollowing ? 'Following' : 'Follow Creator'}
                            </button>

                        </form>

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

                <div className="mt-10">

                    <h2 className="text-2xl font-bold mb-6">
                        Comments
                    </h2>

                    <form
                        method="POST"
                        action={`/clips/${clip.id}/comments`}
                        className="mb-8"
                    >

                        <textarea
                            name="body"
                            placeholder="Write a comment..."
                            className="
                border
                p-3
                w-full
                rounded-lg
                text-black
            "
                            rows={4}
                        />

                        <button
                            type="submit"
                            className="
                                bg-black
                                text-white
                                px-5
                                py-2
                                rounded
                                mt-3
                            "
                        >
                            Post Comment
                        </button>

                    </form>

                    {clip.comments?.length === 0 && (
                        <p className="text-gray-500 mt-4">
                            No comments yet.
                        </p>
                    )}

                    <div className="space-y-6">

                        {clip.comments?.map((comment) => (

                            <div
                                key={comment.id}
                                className="
                    border-b
                    pb-4
                "
                            >

                                <h3 className="font-bold">
                                    @{comment.user.username}
                                </h3>

                                <p className="mt-2">
                                    {comment.body}
                                </p>

                            </div>

                        ))}

                    </div>

                </div>

            </div>

        </AppLayout>

    );

}