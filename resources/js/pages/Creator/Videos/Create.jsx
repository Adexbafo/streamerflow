import { useForm } from '@inertiajs/react';

export default function Create({ categories }) {

    const { data, setData, post, processing, errors } = useForm({

        title: '',
        description: '',
        category_id: '',
        video: null,

    });

    function submit(e) {

        e.preventDefault();

        post('/creator/videos');

    }

    return (
        <div className="p-6">

            <h1 className="text-2xl font-bold mb-6">
                Upload Video
            </h1>

            <form onSubmit={submit}>

                <div className="mb-4">

                    <input
                        type="text"
                        placeholder="Video title"
                        className="border p-2 w-full"
                        value={data.title}
                        onChange={(e) =>
                            setData('title', e.target.value)
                        }
                    />

                    {errors.title && (
                        <div className="text-red-500 text-sm mt-1">
                            {errors.title}
                        </div>
                    )}

                </div>

                <div className="mb-4">

                    <textarea
                        placeholder="Video description"
                        className="border p-2 w-full"
                        value={data.description}
                        onChange={(e) =>
                            setData('description', e.target.value)
                        }
                    />

                </div>

                <div className="mb-4">

                    <select
                        className="border p-2 w-full"
                        value={data.category_id}
                        onChange={(e) =>
                            setData('category_id', e.target.value)
                        }
                    >

                        <option value="">
                            Select Category
                        </option>

                        {categories.map((category) => (

                            <option
                                key={category.id}
                                value={category.id}
                            >
                                {category.name}
                            </option>

                        ))}

                    </select>

                </div>

                <div className="mb-4">

                    <input
                        type="file"
                        onChange={(e) =>
                            setData('video', e.target.files[0])
                        }
                    />

                    {errors.video && (
                        <div className="text-red-500 text-sm mt-1">
                            {errors.video}
                        </div>
                    )}

                </div>

                <button
                    type="submit"
                    disabled={processing}
                    className="bg-black text-white px-4 py-2 rounded"
                >

                    {processing
                        ? 'Uploading...'
                        : 'Upload Video'}

                </button>

            </form>

        </div>
    );
}